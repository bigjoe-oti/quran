import React from 'react';

/**
 * Footer component — mathematical constants + attribution
 */
const Footer = () => {
  const e   = Math.E;
  const phi = (1 + Math.sqrt(5)) / 2;
  const pi  = Math.PI;

  return (
    <footer
      className="relative z-10 border-t px-5 py-2.5 font-mono text-[10px]"
      style={{ background: 'rgba(21,32,56,0.8)', borderColor: '#2A4060', color: '#5A7A96' }}
      role="contentinfo"
    >
      <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-2">
        <span className="tracking-wider">
          All calculations deterministic · Rasm Uthmani · No approximations unmarked 
          <span className="opacity-50 mx-2">|</span> 
          Built By Yousef Ali | <a href="https://www.jservo.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">J. Servo LLC. www.jservo.com</a>
        </span>
        <div className="flex gap-4">
          <span>e = {e.toFixed(10)}</span>
          <span>phi = {phi.toFixed(10)}</span>
          <span>pi = {pi.toFixed(10)}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
