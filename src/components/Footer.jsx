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
      className="relative z-10 mx-2 md:mx-6 xl:mx-10 border-t-0 px-5 py-2.5 font-mono text-[10px] rounded-t-[28px] shadow-[0_-12px_44px_-12px_rgba(12,22,40,0.5)]"
      style={{ background: 'rgba(21,32,56,0.85)', backdropFilter: 'blur(12px)', color: '#D4E4F7', fontWeight: 'bold' }}
      role="contentinfo"
    >
      <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-2">
        <span className="tracking-wider">
          All calculations deterministic · Rasm Uthmani · No approximations unmarked 
          <span className="opacity-50 mx-2 text-[#5A7A96]">|</span> 
          Built By Yousef Ali | <a href="https://www.jservo.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#22D3EE] transition-colors">J. Servo LLC. www.jservo.com</a>
        </span>
        <div className="flex gap-4 font-bold text-[#E8EEF6]">
          <span>e = {e.toFixed(10)}</span>
          <span>phi = {phi.toFixed(10)}</span>
          <span>pi = {pi.toFixed(10)}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
