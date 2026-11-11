import React from 'react';

export default function TaskStudio() {
  return (
    <div className="react-studio-page">
      <section className="react-studio-hero">
        <div className="react-studio-copy"><span className="react-eyebrow">SHARE A BUSINESS TASK</span><h2>Give graduates a real problem to solve.</h2><p>Describe the work you need help with. Sabi helps turn it into a clear project and hide personal details before you publish it.</p><div className="react-studio-flow"><span><b>01</b> Describe it</span><i>→</i><span><b>02</b> Review the task</span><i>→</i><span><b>03</b> Share it</span></div></div>
        <div className="react-studio-visual" aria-hidden="true"><div className="studio-document"><span/><span/><span/><b>✓</b></div><div className="studio-shield">◆</div><div className="studio-spark">✳</div></div>
      </section>
      <div className="react-studio-section-head"><div><span className="react-eyebrow">DESCRIBE THE TASK</span><h3>Start with the problem you need solved.</h3></div><p>Record a voice note, upload audio, or type a description. Review the details before sharing the task.</p></div>
    </div>
  );
}
