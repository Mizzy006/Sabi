#!/usr/bin/env python3
"""Day One Targeted Defence Engine.

Manages a 3-question defence session where a student explains their
spreadsheet work to a skeptical CFO persona (Mrs. Bello).

Architecture ("code decides, the LLM narrates"):
  - The Claim Checker is 100% deterministic Python: it walks the openpyxl
    formula AST to verify whether a claimed cell dependency actually exists.
  - The LLM is used ONLY for:
      1. Generating Mrs. Bello's spoken question (rephrasing autopsy findings).
      2. Extracting verifiable claims from student free-text answers.
      3. Classifying each response into one of 4 closed labels.
  - Temperature is always 0.  Output is always structured JSON.

Usage:
  python dayone_defence.py                          # demo with mock LLM
  python dayone_defence.py --provider groq           # use Groq API
  python dayone_defence.py --provider groq --interactive  # interactive session
"""
from __future__ import annotations

import argparse
import json
import os
import re
import time
from enum import Enum
from typing import Any, Optional

from openpyxl import load_workbook
from openpyxl.formula import Tokenizer
from openpyxl.formula.tokenizer import Token
from openpyxl.utils.cell import get_column_letter, range_boundaries
from pydantic import BaseModel, Field

# ---------------------------------------------------------------------------
# Pydantic data models
# ---------------------------------------------------------------------------

class DefenceQuestion(BaseModel):
    """One of up to 3 questions posed during the defence session."""
    index: int = Field(..., ge=1, le=3, description="Question number (1, 2, or 3)")
    finding_code: str = Field(..., description="Autopsy finding code, e.g. TYPED_NUMBER")
    cell_or_location: str = Field(..., description="Cell or location the question targets")
    question_text: str = Field(..., description="The raw question from the autopsy engine")
    persona_question: str = Field(
        default="",
        description="The question re-voiced as Mrs. Bello (set by LLM)"
    )


class DefenceResponse(BaseModel):
    """The engine's assessment of one student response."""
    question_index: int = Field(..., ge=1, le=3)
    student_answer: str
    claims_detected: list[str] = Field(
        default_factory=list,
        description='e.g. ["N6 depends on B4", "I included freight"]'
    )
    claims_verified: list[dict] = Field(
        default_factory=list,
        description="Each: {claim, verified: bool, evidence: str}"
    )
    classification: str = Field(
        ...,
        description="One of: acknowledged_and_fixed, defended_with_valid_reasoning, "
                    "rationalised, could_not_explain"
    )


class DefenceSession(BaseModel):
    """Top-level record for a complete 3-question defence."""
    student_id: str
    scenario_seed: int
    workbook_path: str
    questions: list[DefenceQuestion] = Field(default_factory=list)
    responses: list[DefenceResponse] = Field(default_factory=list)
    overall_outcome: str = Field(
        default="pending",
        description='"passed" | "partial" | "failed"'
    )
    understanding_gate_passed: bool = Field(default=False)
    recommended_level: str = Field(
        default="Emerging",
        description='"Emerging" | "Working" | "Strong" (capped at Working for auto)'
    )


# ---------------------------------------------------------------------------
# Formula-graph claim checker (100 % deterministic)
# ---------------------------------------------------------------------------

def _resolve_named_ranges(wb) -> dict[str, set[str]]:
    """Return a mapping of UPPER-CASED defined name -> set of absolute cell addresses.

    Each address is normalised to 'Sheet!COLrow' with no dollar signs.
    """
    result: dict[str, set[str]] = {}
    for name, dn in wb.defined_names.items():
        ref = dn.attr_text or ""
        if "!" not in ref:
            continue
        sheet, rng = ref.rsplit("!", 1)
        sheet = sheet.strip("'")
        rng = rng.replace("$", "")
        try:
            min_col, min_row, max_col, max_row = range_boundaries(rng)
        except Exception:
            continue
        cells: set[str] = set()
        for c in range(min_col, max_col + 1):
            for r in range(min_row, max_row + 1):
                cells.add(f"{sheet}!{get_column_letter(c)}{r}")
        result[name.upper()] = cells
    return result


def _tokenize_formula_refs(formula: str, sheet: str, named_ranges: dict[str, set[str]]) -> set[str]:
    """Extract the *direct* cell references from a single Excel formula.

    Returns a set of normalised 'Sheet!COLrow' strings.
    """
    refs: set[str] = set()
    try:
        tokens = Tokenizer(formula).items
    except Exception:
        return refs

    for tok in tokens:
        if tok.type != Token.OPERAND:
            continue
        if tok.subtype == Token.RANGE:
            val = tok.value.replace("$", "")
            upper = val.upper()
            # Is it a defined name?
            if upper in named_ranges:
                refs |= named_ranges[upper]
                continue
            # Qualified reference (Sheet!Range or Sheet!Cell)
            if "!" in val:
                ref_sheet, rng = val.rsplit("!", 1)
                ref_sheet = ref_sheet.strip("'")
            else:
                ref_sheet = sheet
                rng = val
            # Expand range (e.g. B6:B17 -> individual cells)
            try:
                min_col, min_row, max_col, max_row = range_boundaries(rng)
                for c in range(min_col, max_col + 1):
                    for r in range(min_row, max_row + 1):
                        refs.add(f"{ref_sheet}!{get_column_letter(c)}{r}")
            except Exception:
                refs.add(f"{ref_sheet}!{rng}")
    return refs


def get_cell_dependencies(workbook_path: str, cell_ref: str, _max_depth: int = 50) -> dict:
    """Return the full transitive dependency tree for a cell.

    Parameters
    ----------
    workbook_path : str
        Path to the .xlsx workbook.
    cell_ref : str
        Cell reference, optionally sheet-qualified (e.g. "Model!N6" or "N6").
        When unqualified, defaults to the first non-data sheet.

    Returns
    -------
    dict with keys:
        - cell: the normalised cell reference
        - formula: the formula string (or None if a value cell)
        - direct_deps: list of direct dependency cell references
        - all_deps: set of all transitive dependencies (the full closure)
        - tree: nested dict representing the dependency tree
        - named_ranges_used: set of defined names encountered
    """
    wb = load_workbook(workbook_path)
    named_ranges = _resolve_named_ranges(wb)

    # Normalise the cell_ref
    if "!" in cell_ref:
        sheet_name, addr = cell_ref.rsplit("!", 1)
        sheet_name = sheet_name.strip("'")
    else:
        # Default to a calculation sheet
        calc_sheets = [s for s in wb.sheetnames
                       if s not in {"Brief", "Inputs", "Supplier_Prices", "Order_Plan"}]
        sheet_name = calc_sheets[0] if calc_sheets else wb.sheetnames[0]
        addr = cell_ref
    addr = addr.replace("$", "")
    root_key = f"{sheet_name}!{addr}"

    all_deps: set[str] = set()
    named_used: set[str] = set()

    def _build_tree(key: str, depth: int) -> dict:
        """Recursively build the dependency tree."""
        if depth > _max_depth or key in all_deps:
            return {"cell": key, "formula": None, "deps": {}}
        all_deps.add(key)

        s, a = key.rsplit("!", 1) if "!" in key else (sheet_name, key)
        s = s.strip("'")
        try:
            ws = wb[s]
        except KeyError:
            return {"cell": key, "formula": None, "deps": {}}

        cell_obj = ws[a]
        if cell_obj.data_type != "f":
            return {"cell": key, "formula": None, "deps": {}}

        formula = cell_obj.value
        direct = _tokenize_formula_refs(formula, s, named_ranges)

        # Track named ranges
        try:
            for tok in Tokenizer(formula).items:
                if tok.type == Token.OPERAND and tok.subtype == Token.RANGE:
                    upper = tok.value.replace("$", "").upper()
                    if upper in named_ranges:
                        named_used.add(tok.value.replace("$", ""))
        except Exception:
            pass

        subtrees = {}
        for dep in sorted(direct):
            if dep != key:  # avoid self-reference
                subtrees[dep] = _build_tree(dep, depth + 1)

        return {"cell": key, "formula": formula, "deps": subtrees}

    tree = _build_tree(root_key, 0)
    # Remove root from all_deps (it's the cell itself, not a dependency)
    all_deps.discard(root_key)

    # Direct dependencies of root
    s, a = root_key.rsplit("!", 1)
    try:
        ws = wb[s]
        root_formula = ws[a].value if ws[a].data_type == "f" else None
    except Exception:
        root_formula = None

    direct_deps = sorted(_tokenize_formula_refs(root_formula, s, named_ranges)) if root_formula else []

    return {
        "cell": root_key,
        "formula": root_formula,
        "direct_deps": direct_deps,
        "all_deps": all_deps,
        "tree": tree,
        "named_ranges_used": named_used,
    }


def check_claim(workbook_path: str, cell_ref: str, claimed_dependency: str) -> dict:
    """Verify whether a cell depends (transitively) on a claimed dependency.

    Parameters
    ----------
    workbook_path : str
        Path to the .xlsx workbook.
    cell_ref : str
        The cell whose dependency chain to inspect (e.g. "Model!N6").
    claimed_dependency : str
        A cell address ("Inputs!B4") or a named range ("FX_USD_NGN").

    Returns
    -------
    dict with keys:
        - claim: the original claim string
        - cell: the normalised cell reference
        - verified: bool — True iff the dependency exists in the transitive closure
        - evidence: str — human-readable explanation
        - dependency_type: "direct" | "transitive" | "named_range" | "not_found"
    """
    deps = get_cell_dependencies(workbook_path, cell_ref)
    all_deps = deps["all_deps"]
    direct = set(deps["direct_deps"])
    named_used = deps["named_ranges_used"]

    # Normalise the claimed dependency
    claim_upper = claimed_dependency.replace("$", "").upper()
    claim_clean = claimed_dependency.replace("$", "")

    # Load named ranges for resolution
    wb = load_workbook(workbook_path)
    named_ranges = _resolve_named_ranges(wb)

    # Case 1: claimed dependency is a named range
    if claim_upper in named_ranges:
        # Check if any cell of the named range is in the dependency set
        named_cells = named_ranges[claim_upper]
        found_cells = named_cells & all_deps
        # Also check direct references to the name in formulas
        name_referenced = any(claim_upper == n.upper() for n in named_used)

        if found_cells or name_referenced:
            return {
                "claim": claimed_dependency,
                "cell": deps["cell"],
                "verified": True,
                "evidence": (f"{deps['cell']} depends on named range {claimed_dependency} "
                             f"(resolves to {sorted(named_cells)[:3]}{'...' if len(named_cells) > 3 else ''})"),
                "dependency_type": "named_range",
            }
        return {
            "claim": claimed_dependency,
            "cell": deps["cell"],
            "verified": False,
            "evidence": (f"{deps['cell']} does NOT reference named range {claimed_dependency} "
                         f"in its formula chain"),
            "dependency_type": "not_found",
        }

    # Case 2: claimed dependency is a cell reference
    # Try to normalise: add sheet if missing
    if "!" not in claim_clean:
        # Try common sheets
        for try_sheet in ["Inputs", "Model", "Supplier_Prices", "Order_Plan", "Outputs"]:
            candidate = f"{try_sheet}!{claim_clean}"
            if candidate in all_deps or candidate in direct:
                claim_clean = candidate
                break
        else:
            # Fall back to same sheet as the target cell
            cell_sheet = deps["cell"].rsplit("!", 1)[0] if "!" in deps["cell"] else "Model"
            claim_clean = f"{cell_sheet}!{claim_clean}"

    if claim_clean in direct:
        return {
            "claim": claimed_dependency,
            "cell": deps["cell"],
            "verified": True,
            "evidence": f"{deps['cell']} DIRECTLY references {claim_clean}",
            "dependency_type": "direct",
        }
    if claim_clean in all_deps:
        return {
            "claim": claimed_dependency,
            "cell": deps["cell"],
            "verified": True,
            "evidence": f"{deps['cell']} TRANSITIVELY depends on {claim_clean}",
            "dependency_type": "transitive",
        }

    return {
        "claim": claimed_dependency,
        "cell": deps["cell"],
        "verified": False,
        "evidence": f"{claim_clean} is NOT in the dependency chain of {deps['cell']}",
        "dependency_type": "not_found",
    }


# ---------------------------------------------------------------------------
# Response classification
# ---------------------------------------------------------------------------

VALID_LABELS = frozenset({
    "acknowledged_and_fixed",
    "defended_with_valid_reasoning",
    "rationalised",
    "could_not_explain",
})


# ---------------------------------------------------------------------------
# LLM provider abstraction
# ---------------------------------------------------------------------------

class LLMProvider:
    """Base class for LLM providers.  Subclasses implement `_call`."""

    def _call(self, messages: list[dict], response_schema: dict | None = None) -> dict:
        raise NotImplementedError

    def generate(self, messages: list[dict], response_schema: dict | None = None) -> dict:
        """Send a chat-completion request and return the parsed JSON response."""
        return self._call(messages, response_schema)


class GroqProvider(LLMProvider):
    """Groq cloud provider (Llama-3 / Mixtral)."""

    def __init__(self, model: str = "openai/gpt-oss-120b", api_key: str | None = None):
        from dotenv import load_dotenv
        load_dotenv()
        from groq import Groq
        self.client = Groq(
            api_key=api_key or os.environ.get("GROQ_API_KEY"),
            timeout=8.0,
            max_retries=0,
        )
        self.model = model

    def _call(self, messages: list[dict], response_schema: dict | None = None) -> dict:
        kwargs: dict[str, Any] = {
            "model": self.model,
            "messages": messages,
            "temperature": 0,
            "max_tokens": 2048,
        }
        if response_schema:
            kwargs["response_format"] = {"type": "json_object"}

        resp = self.client.chat.completions.create(**kwargs)
        text = resp.choices[0].message.content.strip()
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            # Try to extract JSON from markdown fences
            m = re.search(r"```(?:json)?\s*([\s\S]*?)```", text)
            if m:
                return json.loads(m.group(1).strip())
            return {"raw": text, "error": "could not parse JSON"}


class MockProvider(LLMProvider):
    """Offline mock provider for testing without API keys.

    Returns structured responses that follow the expected schemas.
    Deterministic and scores conservatively.
    """

    def _call(self, messages: list[dict], response_schema: dict | None = None) -> dict:
        # Inspect the system prompt to decide which kind of request this is
        system = next((m["content"] for m in messages if m["role"] == "system"), "")
        user = next((m["content"] for m in messages if m["role"] == "user"), "")

        if "persona" in system.lower() or "mrs. bello" in system.lower():
            if "classify" in user.lower() or "classification" in user.lower():
                return self._mock_classify(user)
            if "extract" in user.lower() or "claim" in user.lower():
                return self._mock_extract_claims(user)
            return self._mock_persona_question(user)

        if "classify" in system.lower():
            return self._mock_classify(user)
        if "claim" in system.lower() or "extract" in system.lower():
            return self._mock_extract_claims(user)

        return self._mock_persona_question(user)

    def _mock_persona_question(self, user: str) -> dict:
        """Generate a mock Mrs. Bello question."""
        # Keep only the source question. The rest of the prompt contains
        # implementation instructions that should never appear in the UI.
        match = re.search(
            r"Original question:\s*(.*?)(?=\n\s*Respond as JSON:|\Z)",
            user,
            re.IGNORECASE | re.DOTALL,
        )
        question = match.group(1).strip() if match else ""
        return {"persona_question": question or "Please explain how your workbook works."}

    def _mock_extract_claims(self, user: str) -> dict:
        """Extract mock claims from student text."""
        claims = []
        # Simple heuristic: look for cell references and dependency language
        cell_pattern = re.compile(r'\b([A-Z]{1,3}\d{1,4})\b')
        cells_mentioned = cell_pattern.findall(user)
        dep_words = ["depends", "references", "uses", "reads", "linked", "formula", "calculates"]
        has_dep_language = any(w in user.lower() for w in dep_words)

        if cells_mentioned and has_dep_language:
            for i in range(0, min(len(cells_mentioned) - 1, 3), 2):
                claims.append(f"{cells_mentioned[i]} depends on {cells_mentioned[i+1]}")
        if not claims and cells_mentioned:
            claims.append(f"cell {cells_mentioned[0]} is relevant")

        # Look for cost-component claims
        components = ["freight", "duty", "clearing", "haulage", "cif", "fob", "landed"]
        mentioned = [c for c in components if c in user.lower()]
        if mentioned:
            claims.append(f"I included {', '.join(mentioned)}")

        if not claims:
            claims = ["student provided a general explanation"]

        return {"claims": claims}

    def _mock_classify(self, user: str) -> dict:
        """Classify a student response conservatively."""
        lower = user.lower()

        if any(w in lower for w in ["i don't know", "not sure", "i can't explain",
                                     "no idea", "i don't understand"]):
            return {"classification": "could_not_explain",
                    "reasoning": "Student could not provide an explanation."}

        if any(w in lower for w in ["i fixed", "i corrected", "i updated", "i changed it",
                                     "acknowledged", "mistake"]):
            return {"classification": "acknowledged_and_fixed",
                    "reasoning": "Student acknowledged the issue and claims to have fixed it."}

        verified_claims = re.findall(r'"verified":\s*true', lower)
        if len(verified_claims) >= 1:
            return {"classification": "defended_with_valid_reasoning",
                    "reasoning": "Student's claims were verified against the formula graph."}

        return {"classification": "rationalised",
                "reasoning": "Student offered an explanation but claims could not be fully verified."}


def get_provider(name: str = "mock", **kwargs) -> LLMProvider:
    """Factory function to create an LLM provider.

    Parameters
    ----------
    name : str
        "groq" or "mock" (default).
    **kwargs
        Passed to the provider constructor (e.g. model, api_key).
    """
    providers = {
        "groq": GroqProvider,
        "mock": MockProvider,
    }
    cls = providers.get(name.lower())
    if cls is None:
        raise ValueError(f"Unknown provider {name!r}. Available: {sorted(providers)}")
    return cls(**kwargs)


# ---------------------------------------------------------------------------
# Prompt builders
# ---------------------------------------------------------------------------

CFO_SYSTEM_PROMPT = """\
You are Mrs. Bello, the Head of Buying at Olumide Stores, a Lagos-based retailer.
You are a skeptical, experienced CFO who has seen many interns make mistakes.
You are conducting a short viva-voce defence of a student's Excel workbook.

Your personality:
- Firm but fair. You push back on vague answers.
- You speak in clear, professional Nigerian English.
- You never penalise accent, grammar, pidgin, or spelling — only the REASONING.
- You want the student to show they UNDERSTAND the formulas, not just that they typed them.

Rules:
- Keep your questions short (2-3 sentences max).
- Reference specific cells, numbers, or formulas from the findings.
- If the student says something vague, ask them to be specific.
- Always respond in valid JSON.
"""

PERSONA_QUESTION_PROMPT = """\
Rephrase the following autopsy question in Mrs. Bello's voice.
Keep it short (2-3 sentences). Reference the specific cell or finding.

Finding code: {finding_code}
Location: {cell_or_location}
Original question: {question_text}

Respond as JSON: {{"persona_question": "..."}}
"""

EXTRACT_CLAIMS_PROMPT = """\
The student was asked about a finding in their Excel workbook.
Extract any VERIFIABLE claims about cell dependencies, formulas, or cost components.

A claim is verifiable if it asserts that:
- A cell depends on / references / uses another cell or named range
- A specific cost component (freight, duty, clearing, haulage, FOB, CIF) is included in a calculation
- A formula does something specific

Finding code: {finding_code}
Location: {cell_or_location}
Question asked: {question_text}
Student's answer: {student_answer}

Respond as JSON: {{"claims": ["claim 1", "claim 2", ...]}}
Only include genuinely verifiable claims. If the student gave no verifiable claims, return {{"claims": []}}.
"""

CLASSIFY_RESPONSE_PROMPT = """\
Classify the student's response into EXACTLY ONE of these labels:

1. "acknowledged_and_fixed" — Student admits the issue and says they fixed it or would fix it.
2. "defended_with_valid_reasoning" — Student explains their approach with reasoning that is
   supported by the verified claims below. At least one claim must be verified=true.
3. "rationalised" — Student offers an explanation, but claims are unverified or the reasoning
   is circular / hand-wavy.
4. "could_not_explain" — Student cannot explain, says "I don't know", or gives no relevant answer.

Finding code: {finding_code}
Location: {cell_or_location}
Question asked: {question_text}
Student's answer: {student_answer}

Verified claims:
{claims_json}

Respond as JSON: {{"classification": "one_of_the_four_labels", "reasoning": "brief explanation"}}

IMPORTANT: Score REASONING, never accent or grammar. Nigerian English and Pidgin are fine.
"""


# ---------------------------------------------------------------------------
# Defence session manager
# ---------------------------------------------------------------------------

class DefenceEngine:
    """Manages a 3-question defence session.

    This is the orchestrator that:
    1. Takes autopsy findings and generates questions (via autopsy engine).
    2. Voices each question through the Mrs. Bello persona (via LLM).
    3. Accepts student answers (text for now; voice transcription later).
    4. Extracts verifiable claims from answers (via LLM).
    5. Checks claims against the formula graph (deterministic).
    6. Classifies each response (via LLM with verified claims as context).
    7. Applies the understanding gate.
    """

    # Understanding gate: fraction of responses that must be
    # "acknowledged_and_fixed" or "defended_with_valid_reasoning"
    EXPLAIN_BACK_FLOOR = 0.5  # at least half must show understanding

    def __init__(self, provider: LLMProvider | None = None):
        self.provider = provider or MockProvider()
        self.fallback_used = False

    def _generate(self, messages: list[dict], response_schema: dict | None = None) -> dict:
        """Use the configured provider and fall back locally if it is unavailable."""
        try:
            return self.provider.generate(messages, response_schema)
        except Exception:
            if isinstance(self.provider, MockProvider):
                raise
            self.provider = MockProvider()
            self.fallback_used = True
            return self.provider.generate(messages, response_schema)

    def build_session(
        self,
        student_id: str,
        scenario_seed: int,
        workbook_path: str,
        autopsy_questions: list[dict],
    ) -> DefenceSession:
        """Create a new DefenceSession from autopsy defence_questions.

        Parameters
        ----------
        student_id : str
            Identifier for the student.
        scenario_seed : int
            The scenario seed used to generate the pack.
        workbook_path : str
            Path to the student's submitted .xlsx workbook.
        autopsy_questions : list[dict]
            Output of `dayone_autopsy.defence_questions()`, each with keys:
            finding, where, question.
        """
        questions = []
        for i, aq in enumerate(autopsy_questions[:3], start=1):
            q = DefenceQuestion(
                index=i,
                finding_code=aq["finding"],
                cell_or_location=aq["where"],
                question_text=aq["question"],
            )
            # Voice the question through Mrs. Bello
            q.persona_question = self._voice_question(q)
            questions.append(q)

        return DefenceSession(
            student_id=student_id,
            scenario_seed=scenario_seed,
            workbook_path=workbook_path,
            questions=questions,
        )

    def process_answer(
        self,
        session: DefenceSession,
        question_index: int,
        student_answer: str,
    ) -> DefenceResponse:
        """Process one student answer and return the assessed response.

        Parameters
        ----------
        session : DefenceSession
            The active session.
        question_index : int
            Which question (1, 2, or 3) is being answered.
        student_answer : str
            The student's free-text answer.

        Returns
        -------
        DefenceResponse with claims extracted, verified, and classified.
        """
        question = next((q for q in session.questions if q.index == question_index), None)
        if question is None:
            raise ValueError(f"Unknown defence question index: {question_index}")
        if question_index != len(session.responses) + 1:
            raise ValueError(f"Expected defence question {len(session.responses) + 1}")

        # Step 1: Extract verifiable claims from the answer (LLM)
        claims = self._extract_claims(question, student_answer)

        # Step 2: Verify each claim against the formula graph (deterministic)
        verified_claims = self._verify_claims(session.workbook_path, question, claims)

        # Step 3: Classify the response (LLM, with verified claims as context)
        classification = self._classify_response(question, student_answer, verified_claims)

        response = DefenceResponse(
            question_index=question_index,
            student_answer=student_answer,
            claims_detected=claims,
            claims_verified=verified_claims,
            classification=classification,
        )
        session.responses.append(response)

        # After all 3 questions, finalise
        if len(session.responses) == len(session.questions):
            self._finalise_session(session)

        return response

    def _voice_question(self, question: DefenceQuestion) -> str:
        """Use the LLM to rephrase a question in Mrs. Bello's voice."""
        prompt = PERSONA_QUESTION_PROMPT.format(
            finding_code=question.finding_code,
            cell_or_location=question.cell_or_location,
            question_text=question.question_text,
        )
        result = self._generate(
            messages=[
                {"role": "system", "content": CFO_SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ]
        )
        spoken_question = result.get("persona_question", question.question_text)
        if not isinstance(spoken_question, str):
            return question.question_text

        # Defensively remove leaked prompt-format instructions from model
        # output before it is returned to the candidate-facing UI.
        spoken_question = re.split(
            r"\n\s*Respond as JSON\s*:", spoken_question,
            maxsplit=1,
            flags=re.IGNORECASE,
        )[0].strip()
        if not spoken_question or re.search(
            r"\b(?:Original question|Finding code|persona_question)\s*:",
            spoken_question,
            re.IGNORECASE,
        ):
            return question.question_text
        return spoken_question

    def _extract_claims(self, question: DefenceQuestion, student_answer: str) -> list[str]:
        """Use the LLM to extract verifiable claims from the student's answer."""
        prompt = EXTRACT_CLAIMS_PROMPT.format(
            finding_code=question.finding_code,
            cell_or_location=question.cell_or_location,
            question_text=question.question_text,
            student_answer=student_answer,
        )
        result = self._generate(
            messages=[
                {"role": "system", "content": CFO_SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ]
        )
        claims = result.get("claims", [])
        return [str(c) for c in claims] if isinstance(claims, list) else []

    def _verify_claims(
        self,
        workbook_path: str,
        question: DefenceQuestion,
        claims: list[str],
    ) -> list[dict]:
        """Verify each claim against the formula graph.

        This is the deterministic step — no LLM involved.
        """
        verified = []
        for claim_text in claims:
            result = self._try_verify_single_claim(workbook_path, question, claim_text)
            verified.append(result)
        return verified

    def _try_verify_single_claim(
        self,
        workbook_path: str,
        question: DefenceQuestion,
        claim_text: str,
    ) -> dict:
        """Attempt to verify a single claim by parsing it for cell references.

        Tries to interpret claims like:
        - "N6 depends on B4"
        - "cell Model!N6 uses FX_USD_NGN"
        - "I included freight" (matched against known named ranges)
        """
        claim_lower = claim_text.lower()

        # Pattern 1: "X depends on Y" / "X references Y" / "X uses Y"
        dep_pattern = re.compile(
            r"(?:cell\s+)?([A-Za-z_!]+\d+)\s+"
            r"(?:depends?\s+on|references?|uses?|reads?|is\s+linked\s+to)\s+"
            r"([A-Za-z_!]+\d*|[A-Z_]+)",
            re.IGNORECASE,
        )
        match = dep_pattern.search(claim_text)
        if match:
            cell_ref = match.group(1)
            dep_ref = match.group(2)
            try:
                result = check_claim(workbook_path, cell_ref, dep_ref)
                return {
                    "claim": claim_text,
                    "verified": result["verified"],
                    "evidence": result["evidence"],
                }
            except Exception as e:
                return {
                    "claim": claim_text,
                    "verified": False,
                    "evidence": f"Could not verify: {e}",
                }

        # Pattern 2: claim mentions a known cost component and the question targets a cell
        component_map = {
            "freight": "FREIGHT_USD_PER_KG",
            "duty": "DUTY_TABLE",
            "clearing": "CLEARING_PCT",
            "haulage": "HAULAGE_NGN_PER_UNIT",
            "fx": "FX_USD_NGN",
            "exchange rate": "FX_USD_NGN",
            "target margin": "TARGET_MARGIN",
            "margin": "TARGET_MARGIN",
            "budget": "BUDGET_CAP_NGN",
        }
        cell_loc = question.cell_or_location
        for keyword, named_range in component_map.items():
            if keyword in claim_lower:
                try:
                    result = check_claim(workbook_path, cell_loc, named_range)
                    return {
                        "claim": claim_text,
                        "verified": result["verified"],
                        "evidence": result["evidence"],
                    }
                except Exception as e:
                    return {
                        "claim": claim_text,
                        "verified": False,
                        "evidence": f"Could not verify component claim: {e}",
                    }

        # Pattern 3: unverifiable claim (general explanation)
        return {
            "claim": claim_text,
            "verified": False,
            "evidence": "Claim is not in a verifiable form (no cell reference or known dependency).",
        }

    def _classify_response(
        self,
        question: DefenceQuestion,
        student_answer: str,
        verified_claims: list[dict],
    ) -> str:
        """Use the LLM (with deterministic claim-check results) to classify the response."""
        claims_json = json.dumps(verified_claims, indent=2, ensure_ascii=False)
        prompt = CLASSIFY_RESPONSE_PROMPT.format(
            finding_code=question.finding_code,
            cell_or_location=question.cell_or_location,
            question_text=question.question_text,
            student_answer=student_answer,
            claims_json=claims_json,
        )
        result = self._generate(
            messages=[
                {"role": "system", "content": CFO_SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ]
        )
        label = result.get("classification", "could_not_explain")
        # Validate against the closed label set
        if label not in VALID_LABELS:
            label = "could_not_explain"
        return label

    def _finalise_session(self, session: DefenceSession) -> None:
        """Apply the understanding gate and set the final outcome."""
        n = len(session.responses)
        if n == 0:
            session.overall_outcome = "failed"
            session.understanding_gate_passed = False
            session.recommended_level = "Emerging"
            return

        # Count responses showing understanding
        understanding_labels = {"acknowledged_and_fixed", "defended_with_valid_reasoning"}
        understood = sum(1 for r in session.responses if r.classification in understanding_labels)
        explain_back_score = understood / n

        session.understanding_gate_passed = explain_back_score >= self.EXPLAIN_BACK_FLOOR

        # Determine outcome
        if understood == n:
            session.overall_outcome = "passed"
        elif understood >= 1:
            session.overall_outcome = "partial"
        else:
            session.overall_outcome = "failed"

        # Determine recommended level (capped at Working for automated grading)
        if not session.understanding_gate_passed:
            # Gate failed: cap at Emerging regardless of other scores
            session.recommended_level = "Emerging"
        elif session.overall_outcome == "passed":
            session.recommended_level = "Working"  # capped at Working for auto
        elif session.overall_outcome == "partial":
            session.recommended_level = "Working"
        else:
            session.recommended_level = "Emerging"


# ---------------------------------------------------------------------------
# Demo / main
# ---------------------------------------------------------------------------

def run_demo_session(
    workbook_path: str,
    key_path: str,
    provider_name: str = "mock",
    interactive: bool = False,
    **provider_kwargs,
) -> DefenceSession:
    """Run a complete defence session (demo or interactive).

    Parameters
    ----------
    workbook_path : str
        Path to the student's (or reference) .xlsx workbook.
    key_path : str
        Path to the key.json file for this pack.
    provider_name : str
        "mock" or "groq".
    interactive : bool
        If True, prompt for student answers on stdin.
    """
    # Load key and generate autopsy questions
    key = json.load(open(key_path, encoding="utf-8"))

    # Import autopsy to generate findings and questions
    from dayone_autopsy import static_checks, collect_findings, defence_questions

    # For the demo, we'll construct minimal findings from the key
    # (since full autopsy requires LibreOffice recalculation).
    # Build some synthetic findings to generate defence questions.
    print("=" * 72)
    print("  SABI — Day One Targeted Defence Engine (demo)")
    print("=" * 72)
    print()

    # Try to run static checks on the workbook
    try:
        static_f, stats = static_checks(workbook_path)
        print(f"Static checks complete: {len(static_f)} findings")
    except Exception as e:
        print(f"Static checks skipped ({e}); using synthetic findings.")
        static_f = [
            {"code": "MAGIC_CONSTANT", "where": "Model!G6",
             "detail": str(key["inputs"]["FX_USD_NGN"])},
            {"code": "TYPED_NUMBER", "where": "Model!N6",
             "detail": 25000},
            {"code": "INPUT_UNUSED", "where": "Inputs!B7",
             "detail": "CLEARING_PCT"},
        ]

    # Generate defence questions from findings
    try:
        qs = defence_questions(static_f, key, limit=3)
    except Exception:
        qs = [
            {"finding": "MAGIC_CONSTANT", "where": "Model!G6",
             "question": f"The formula in Model!G6 contains the literal {key['inputs']['FX_USD_NGN']}. "
                         f"Where does it come from, and what happens when that value changes?"},
            {"finding": "TYPED_NUMBER", "where": "Model!N6",
             "question": "Model!N6 holds a typed number (25000). What does it represent, "
                         "and why is it not a formula?"},
            {"finding": "INPUT_UNUSED", "where": "Inputs!B7",
             "question": "The input 'CLEARING_PCT' feeds no formula. Is that deliberate?"},
        ]

    if not qs:
        print("No defence questions generated (the submission may be clean).")
        print("Creating synthetic questions for demo purposes.")
        qs = [
            {"finding": "DEMO", "where": "Model!N6",
             "question": "Walk me through how cell N6 computes the landed cost for the first SKU."},
        ]

    print(f"Defence questions generated: {len(qs)}")
    print()

    # Initialise the engine and session
    provider = get_provider(provider_name, **provider_kwargs)
    engine = DefenceEngine(provider)
    session = engine.build_session(
        student_id="demo_student",
        scenario_seed=key["seed"],
        workbook_path=workbook_path,
        autopsy_questions=qs,
    )

    # Pre-computed dependency info for the demo
    print("Checking formula dependencies...")
    for q in session.questions:
        try:
            deps = get_cell_dependencies(workbook_path, q.cell_or_location)
            n_deps = len(deps["all_deps"])
            print(f"  {q.cell_or_location}: {n_deps} transitive dependencies, "
                  f"formula = {deps['formula'] or '(value cell)'}")
        except Exception as e:
            print(f"  {q.cell_or_location}: could not read ({e})")
    print()

    # Demo student answers (or interactive)
    demo_answers = [
        ("The FX rate of 1660 is in the formula because I typed it directly. "
         "I know it should reference Inputs!B4 which has FX_USD_NGN. "
         "If FX changes, my formula won't update — I should fix that."),
        ("Cell N6 depends on I6 for CIF, K6 for duty, L6 for clearing, "
         "and M6 for haulage. The landed cost formula is I6+K6+L6+M6. "
         "I included all four cost components as the brief states."),
        ("I'm not sure why CLEARING_PCT isn't used. I think I might have "
         "forgotten to include it. I don't really know how clearing works."),
    ]

    for q in session.questions:
        print("-" * 60)
        print(f"Question {q.index} [{q.finding_code}] → {q.cell_or_location}")
        print()
        print(f"  Mrs. Bello: {q.persona_question}")
        print()

        if interactive:
            answer = input("  Your answer: ").strip()
            if not answer:
                answer = "I don't know."
        else:
            answer = demo_answers[q.index - 1] if q.index <= len(demo_answers) else "I don't know."
            print(f"  Student: {answer}")
        print()

        response = engine.process_answer(session, q.index, answer)

        print(f"  Claims detected: {response.claims_detected}")
        print(f"  Claims verified:")
        for cv in response.claims_verified:
            status = "✓" if cv["verified"] else "✗"
            print(f"    {status} {cv['claim']}")
            print(f"      Evidence: {cv['evidence']}")
        print(f"  Classification: {response.classification}")
        print()

    # Final summary
    print("=" * 60)
    print("  DEFENCE SESSION SUMMARY")
    print("=" * 60)
    print(f"  Overall outcome:          {session.overall_outcome}")
    print(f"  Understanding gate:       {'PASSED' if session.understanding_gate_passed else 'FAILED'}")
    print(f"  Recommended level:        {session.recommended_level}")
    print()
    print("  Responses:")
    for r in session.responses:
        q = next(q for q in session.questions if q.index == r.question_index)
        verified_count = sum(1 for c in r.claims_verified if c["verified"])
        total_claims = len(r.claims_verified)
        print(f"    Q{r.question_index} [{q.finding_code}]: {r.classification} "
              f"({verified_count}/{total_claims} claims verified)")

    return session


if __name__ == "__main__":
    ap = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    ap.add_argument(
        "--workbook",
        default=None,
        help="Path to student .xlsx workbook (default: seed 1 reference)",
    )
    ap.add_argument(
        "--key",
        default=None,
        help="Path to key.json (default: seed 1 key)",
    )
    ap.add_argument(
        "--provider",
        default="mock",
        choices=["mock", "groq"],
        help="LLM provider (default: mock)",
    )
    ap.add_argument(
        "--model",
        default="llama-3.3-70b-versatile",
        help="Model name for the LLM provider",
    )
    ap.add_argument(
        "--interactive",
        action="store_true",
        help="Run interactively (prompt for student answers)",
    )
    ap.add_argument(
        "--json",
        dest="json_out",
        help="Write session JSON to this file",
    )
    a = ap.parse_args()

    # Default paths for seed 1 pack
    base = os.path.dirname(os.path.abspath(__file__))
    wb_path = a.workbook or os.path.join(base, "dayone_landed_cost_reference_seed1.xlsx")
    key_path = a.key or os.path.join(base, "dayone_landed_cost_key_seed1.json")

    if not os.path.isfile(wb_path):
        print(f"Workbook not found: {wb_path}")
        print("Run `python dayone_generator.py --seed 1 --out .` first.")
        exit(1)
    if not os.path.isfile(key_path):
        print(f"Key not found: {key_path}")
        exit(1)

    provider_kwargs = {}
    if a.provider == "groq":
        provider_kwargs["model"] = a.model

    session = run_demo_session(
        workbook_path=wb_path,
        key_path=key_path,
        provider_name=a.provider,
        interactive=a.interactive,
        **provider_kwargs,
    )

    if a.json_out:
        with open(a.json_out, "w", encoding="utf-8") as fh:
            # Convert sets to lists for JSON serialisation
            json.dump(session.model_dump(), fh, indent=2, ensure_ascii=False, default=list)
        print(f"\nSession written to {a.json_out}")
