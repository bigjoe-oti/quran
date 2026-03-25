import React from 'react';
import mainLogoPng from '../assets/mainlogo-main-banner.png';

/**
 * Header component — logo + title
 */
const Header = ({ tabs, activeTab, onTabChange }) => {
  return (
    <header
      className="relative z-20 border-b px-4 py-3 backdrop-blur-md"
      style={{ background: 'rgba(21,32,56,0.92)', borderColor: '#2A4060' }}
      role="banner"
    >
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Logo + title */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            src={mainLogoPng}
            alt="Quran Muqattaat logo"
            className="w-16 h-16"
            style={{ filter: 'drop-shadow(0 0 14px rgba(224,184,74,0.4))' }}
          />
          <div>
            <div className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: '#E8EEF6' }}>
              Mathematical Signatures · Al-Quran Al-Kareem
            </div>
            <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#B6CBE0' }}>
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
                  background: isActive ? 'rgba(34,211,238,0.12)' : 'rgba(28,45,72,0.8)',
                  border:    `1px solid ${isActive ? 'rgba(34,211,238,0.5)' : '#2A4060'}`,
                  boxShadow:  isActive ? '0 1px 0 #E0B84A, 0 2px 0 #C49A35, 0 3px 0 #A87E20, 0 4px 6px rgba(0,0,0,0.5)' : 'none',
                }}
              >
                <span className="mr-1 opacity-70" aria-hidden="true">{tab.icon}</span>
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
