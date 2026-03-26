import React from 'react';
import mainLogoPng from '../assets/mainlogo-main-banner.png';
import bannerBg from '../assets/hero-bg.png';

/**
 * Header component — logo + title
 */
const Header = ({ tabs, activeTab, onTabChange }) => {
  return (
    <header
      className="relative z-20 mx-2 md:mx-6 xl:mx-10 border-b border-t-0 px-4 py-3 bg-cover bg-center bg-no-repeat rounded-b-[28px]"
      style={{ 
        backgroundImage: `linear-gradient(rgba(12, 22, 40, 0.60), rgba(12, 22, 40, 0.80)), url(${bannerBg})`,
        borderColor: 'rgba(42, 64, 96, 0.6)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 12px 35px -10px rgba(224, 184, 74, 0.35), -8px 0 25px -15px rgba(224, 184, 74, 0.25), 8px 0 25px -15px rgba(224, 184, 74, 0.25)'
      }}
      role="banner"
    >
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Logo + title */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            src={mainLogoPng}
            alt="Quran Muqattaat logo"
            className="w-[76px] h-[76px]"
            style={{ filter: 'drop-shadow(0 0 14px rgba(224,184,74,0.4))' }}
          />
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold" style={{ color: '#FFFFFF' }}>
              Mathematical Signatures · Al-Quran Al-Kareem
            </div>
            <div className="font-mono text-[10px] tracking-widest uppercase font-semibold mt-1" style={{ color: '#E8EEF6' }}>
              الحروف المقطعة · Deterministic Analysis Engine
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <nav
          className="flex flex-wrap justify-center gap-1.5"
          role="tablist"
          aria-label="Analysis sections"
        >
          {tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            const panelCount = tab.type === 'master' ? null : tab.indices?.length;
            return (
              <button
                key={idx}
                id={`tab-${idx}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${idx}`}
                onClick={() => onTabChange(idx)}
                className="tab-btn relative px-3.5 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-250 overflow-hidden"
                style={{
                  color:      isActive ? '#22D3EE' : '#E8EEF6',
                  background: isActive ? 'rgba(34,211,238,0.36)' : 'rgba(28,45,72,0.60)',
                  border:    `2.3px solid ${isActive ? 'rgba(224,184,74,0.8)' : 'rgba(224,184,74,0.4)'}`,
                  boxShadow:  isActive ? '0 1px 0 #E0B84A, 0 2px 0 #C49A35, 0 3px 0 #A87E20, 0 4px 6px rgba(0,0,0,0.5)' : 'none',
                }}
              >
                <span 
                  className="mr-1.5 opacity-100 drop-shadow-md text-[14px]" 
                  style={{ textShadow: isActive ? '0 0 6px rgba(34,211,238,0.8)' : '0 0 4px rgba(232,238,246,0.5)' }} 
                  aria-hidden="true"
                >
                  {tab.icon}
                </span>
                {tab.label}
                {panelCount && (
                  <span
                    className="tab-count-badge absolute -top-1 -right-1 text-[8px] font-bold px-1 rounded-full"
                    style={{ background: '#E0B84A', color: '#0C1628' }}
                  >
                    {panelCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
