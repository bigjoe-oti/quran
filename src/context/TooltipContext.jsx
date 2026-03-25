import React, { createContext, useContext, useState, useCallback } from 'react';

const TooltipContext = createContext();

export const useTooltip = () => useContext(TooltipContext);

export const TooltipProvider = ({ children }) => {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: null });

  const showTooltip = useCallback((content, e) => {
    setTooltip({ visible: true, x: e.clientX, y: e.clientY, content });
  }, []);

  const moveTooltip = useCallback((e) => {
    setTooltip(prev => prev.visible ? { ...prev, x: e.clientX, y: e.clientY } : prev);
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <TooltipContext.Provider value={{ showTooltip, moveTooltip, hideTooltip }}>
      {children}
      {tooltip.visible && tooltip.content && (
        <div
          id="global-tooltip"
          style={{
            position: 'fixed',
            left: tooltip.x + 15,
            top: tooltip.y + 15,
            background: 'rgba(21, 32, 56, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(224, 184, 74, 0.3)',
            borderRadius: '6px',
            padding: '8px 12px',
            color: '#E8EEF6',
            fontSize: '12px',
            fontWeight: '600',
            pointerEvents: 'none',
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            transition: 'opacity 0.1s ease-in-out',
            fontFamily: 'monospace'
          }}
        >
          {tooltip.content}
        </div>
      )}
    </TooltipContext.Provider>
  );
};
