import React from 'react';
import { useTooltip } from '../context/TooltipContext';
import { polar, toRad, C } from '../utils/math';
import { T } from '../constants/data';
import Defs from './Defs';

export const ExactPolygon = ({ sides, angleText, formula, highlightRatio }) => {
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip();

  const cx=146, cy=128, r=76;
  const pts = Array.from({length:sides}, (_,i) => polar(cx,cy,r,(360/sides)*i));
  const ptsStr = pts.map(p=>`${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
  return (
    <svg viewBox="0 0 292 242" className="w-full h-full"
         role="img" aria-label={`Regular ${sides}-gon. Interior angle ${angleText}. ${formula}`}>
      <Defs/>
      <circle cx={cx} cy={cy} r={r+18} fill="url(#pGrid)" opacity=".35" clipPath="none"/>
      <circle cx={cx} cy={cy} r={r+2}  fill="none" stroke={T.grid} strokeWidth="1" strokeDasharray="4,5" opacity=".4"/>
      {pts.map((p,i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={T.grid} strokeWidth="1" strokeDasharray="2,7" opacity=".4"/>
      ))}
      <polygon points={ptsStr} fill="rgba(34,211,238,.05)" stroke={T.teal} strokeWidth="1.5" opacity=".55"/>
      {[[pts[sides-1],pts[0]],[pts[0],pts[1]]].map(([a,b],i) => (
        <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="url(#gGold)" strokeWidth="5" strokeLinecap="round" filter="url(#fGold)"/>
      ))}
      {/* angle arc */}
      <path
        d={`M ${(pts[sides-1].x*0.15+pts[0].x*0.85).toFixed(1)} ${(pts[sides-1].y*0.15+pts[0].y*0.85).toFixed(1)}
            A 14 14 0 0 1 ${(pts[1].x*0.15+pts[0].x*0.85).toFixed(1)} ${(pts[1].y*0.15+pts[0].y*0.85).toFixed(1)}`}
        fill="none" stroke={T.red} strokeWidth="2" opacity=".8"/>
      <circle cx={pts[0].x} cy={pts[0].y} r="5.5" fill={T.gold} filter="url(#fGold)"/>
      {pts.map((p,i) => i>0 && <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={T.muted} opacity=".55"/>)}
      <circle cx={cx} cy={cy} r="2.5" fill={T.muted} opacity=".5"/>
      {/* labels */}
      <text x={cx} y="20" fill={T.gold} fontSize="17" fontWeight="900" textAnchor="middle" filter="url(#fGold)">{angleText}</text>
      <text x={cx} y="39" fill={T.text} fontSize="11"   textAnchor="middle" opacity=".9">{formula}</text>
      {highlightRatio && <text x={cx} y="56" fill={T.teal} fontSize="10.5" textAnchor="middle">{highlightRatio}</text>}
      <text x={cx} y="235" fill={T.muted} fontSize="9" textAnchor="middle">Regular {sides}-gon · Interior Angle Identity</text>
    </svg>
  );
};
