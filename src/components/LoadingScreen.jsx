import React, { useEffect, useRef } from 'react';
import logoSvg from '../assets/mainlogo-main-banner.png';

/**
 * LoadingScreen — 1.5s splash screen on first load
 * Fades in logo + text, gold progress bar, then fades out
 */
const LoadingScreen = ({ onComplete }) => {
  const barRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    // Skip on keypress
    const skipHandler = () => finish();
    document.addEventListener('keydown', skipHandler);

    const timer = setTimeout(finish, 1500);

    function finish() {
      document.removeEventListener('keydown', skipHandler);
      clearTimeout(timer);
      if (screenRef.current) {
        screenRef.current.style.animation = 'screenFadeOut 0.5s ease forwards';
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 480);
      }
    }

    return () => {
      document.removeEventListener('keydown', skipHandler);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      id="loading-screen"
      ref={screenRef}
      role="status"
      aria-label="Loading Quran Muqattaat Analysis"
    >
      {/* Logo */}
      <img
        src={logoSvg}
        alt="Quran Muqattaat logo"
        className="logo-glow"
        style={{ width: 120, height: 120 }}
      />

      {/* Arabic title */}
      <div
        className="loading-text-1 font-arabic text-3xl text-center"
        style={{ color: '#E0B84A', fontFamily: "'Amiri', serif", direction: 'rtl' }}
      >
        الحروف المقطعة
      </div>

      {/* Subtitle */}
      <div
        className="loading-text-2 text-center font-mono text-sm tracking-widest uppercase"
        style={{ color: '#94ADC8' }}
      >
        Mathematical Signatures of Divine Design
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 280,
          height: 4,
          background: 'rgba(42,64,96,0.8)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div id="loading-bar-fill" ref={barRef} />
      </div>

      {/* Skip hint */}
      <div style={{ color: '#3A5A80', fontSize: 11, fontFamily: 'monospace' }}>
        Press any key to skip
      </div>
    </div>
  );
};

export default LoadingScreen;
