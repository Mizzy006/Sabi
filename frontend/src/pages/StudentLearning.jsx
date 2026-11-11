import React from 'react';

export default function StudentLearning() {
  return (
    <div className="react-learning-page">
      <section className="react-learning-hero">
        <div className="react-learning-hero-copy">
          <span className="react-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h1>Turn what you know into proof.</h1>
          <p>Choose a career track, build a focused study plan, then test your skills against a realistic day one challenge.</p>
          <div className="react-learning-promise"><span>01</span> Choose a role <i>→</i><span>02</span> Practice the work <i>→</i><span>03</span> Prove your capability</div>
        </div>
        <div className="react-learning-hero-art" aria-hidden="true"><div className="react-learning-orbit orbit-one"/><div className="react-learning-orbit orbit-two"/><div className="react-learning-orbit orbit-three"/><div className="react-learning-core"><span>SKILL</span><strong>→</strong><span>PROOF</span></div><b className="learning-float float-one">✳</b><b className="learning-float float-two">✓</b></div>
      </section>
      <div className="react-learning-intro"><div><span className="react-eyebrow">LEARNING WORKSPACE</span><h2>Your role, your roadmap, your first challenge.</h2></div><p>Every activity is designed around practical work employers recognize. Set a realistic pace and start building evidence you can explain.</p></div>
    </div>
  );
}
