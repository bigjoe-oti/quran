import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { T } from './constants/data';
import { TABS, PANELS } from './constants/panels';
import { TAG_COLORS } from './constants/data';
import { MasterCanvas } from './components/MasterCanvas';
import './index.css';

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [particles, setParticles] = useState([]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      
      setScrollProgress(progress);
      setShowBackToTop(scrolled > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for tabs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLoading) return;
      if (e.key === 'ArrowRight') {
        setActiveTab((prev) => (prev + 1) % TABS.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveTab((prev) => (prev - 1 + TABS.length) % TABS.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoading]);

  // Generate particles
  useEffect(() => {
    const newParticles = Array.from({ length: 35 }, () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20,
    }));
    setParticles(newParticles);
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-serif selection:bg-teal-500/30 selection:text-teal-200">
      {/* Scroll progress bar */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Ambient particles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle animate-pulse"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: 0.15,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <Header tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="relative z-10 flex-grow p-4 md:p-8 max-w-[1600px] mx-auto w-full">
        <div 
          key={activeTab}
          className="tab-panel-active"
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          {TABS[activeTab].type === 'master' ? (
            <MasterCanvas />
          ) : (
            <div className="panel-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 items-start">
              {TABS[activeTab].indices.map((panelIdx) => {
                const P = PANELS[panelIdx];
                const ts = TAG_COLORS[P.tag] || TAG_COLORS.VERIFIED;
                return (
                  <article
                    key={P.id}
                    className="panel-card group rounded-2xl overflow-hidden flex flex-col"
                    style={{
                      background: T.panel,
                      border: `1px solid ${T.border}`,
                      boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                    }}
                    aria-labelledby={`pt-${P.id}`}
                  >
                    {/* Panel header */}
                    <header className="p-6 border-b relative overflow-hidden"
                      style={{
                        borderColor: T.border,
                        borderTop: `3px solid ${T.teal}`,
                        borderLeft: `1.5px solid ${T.blue}33`,
                        borderRight: `1.5px solid ${T.blue}33`,
                      }}>
                      <div className="panel-header-bg absolute inset-0 pointer-events-none" />
                      
                      <div className="flex justify-between items-start mb-3 relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="badge-pulse text-[10px] font-mono tracking-[0.2em] uppercase text-teal-400">
                            Finding {String(P.id).padStart(2, '0')}
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                                style={{ background: ts.bg, borderColor: ts.border, color: ts.text }}>
                            {P.tag}
                          </span>
                        </div>
                      </div>

                      <h2 id={`pt-${P.id}`} className="text-lg leading-tight mb-3 transition-colors"
                          style={{ color: T.gold, fontFamily: '"Righteous", display' }}>
                        {P.title}
                      </h2>
                      
                      <p className="text-sm leading-relaxed mb-3 line-clamp-3 group-hover:line-clamp-none transition-all duration-300"
                         style={{ color: 'rgba(219, 234, 254, 0.7)', fontFamily: '"Advent Pro", sans-serif', fontWeight: 400, fontStretch: '120%' }}>
                        {P.statement}
                      </p>

                      {/* Arabic Summary Section */}
                      {P.arabicSummary && (
                        <div className="arabic-summary-box" style={{ fontFamily: '"Reem Kufi", sans-serif' }}>
                          <div className="text-sm font-bold opacity-100">{P.arabicSummary}</div>
                          {P.arabicBody && (
                            <div className="text-[13.5px] opacity-90 leading-relaxed font-medium mt-1.5 pt-1.5 border-t border-amber-500/10">
                              {P.arabicBody}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        {P.surahRef}
                      </div>
                    </header>

                    {/* Visualization */}
                    <div className="relative overflow-hidden aspect-video" style={{ background: T.card }}>
                      <div className="absolute inset-0 opacity-40 pointer-events-none"
                           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='22' height='22' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 22 0 L 0 0 0 22' fill='none' stroke='%231E3450' stroke-width='0.5'/%3E%3C/svg%3E")` }} />
                      <div className="relative w-full h-full flex items-center justify-center z-10 p-4">
                        {P.visual}
                      </div>
                    </div>

                    {/* Quality identity */}
                    <footer className="p-5 border-t flex flex-col gap-3"
                            style={{ borderColor: T.border, background: 'rgba(21,32,56,0.6)' }}>
                      <div className="flex items-start gap-2.5">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-teal-400 shadow-[0_0_8px_#22D3EE]" />
                        <div className="text-[11px] font-mono leading-relaxed text-slate-300">{P.identity}</div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-rose-500 animate-pulse shadow-[0_0_8px_#F43F6E]" />
                        <div className="text-[11px] font-bold leading-relaxed text-rose-400">{P.annotation}</div>
                      </div>
                    </footer>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Utilities */}
      <button
        id="back-to-top"
        className={showBackToTop ? 'visible' : ''}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>

      <style>{`
        .text-gold-400 { color: ${T.gold}; }
        .text-gold-300 { color: ${T.goldLt}; }
      `}</style>
    </div>
  );
}
