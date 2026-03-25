import React from 'react';
import { useTooltip } from '../context/TooltipContext';
import { polar, fmt } from '../utils/math';
import { T } from '../constants/data';
import Defs from './Defs';

export const AdvancedRadar = () => {
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip();

  const cx=146, cy=116, r=68, n=8;
  const axes=['S.38 ص','S.40 حم','S.42 حمعسق','S.44 حم','S.46 حم','S.50 ق','S.68 ن','S.19 كهيعص'];
  const qafN=[0.15,0.20,0.25,0.18,0.20,1.00,0.05,0.08];
  const nunN=[0.30,0.33,0.35,0.28,0.30,0.33,1.00,0.38];
  const pts = data => data.map((_,i)=>{
    const p=polar(cx,cy,r*data[i],i*(360/n));
    return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 350 280" className="w-full h-full"
         role="img" aria-label="Radar chart: Qaf peaks at S.50, Nun peaks at S.68 — orthogonal spikes.">
      <Defs/>
      {[.25,.5,.75,1].map((s,i) => {
        const p = Array.from({length:n},(_,j)=>{const pt=polar(cx,cy,r*s,j*(360/n));return`${pt.x.toFixed(2)},${pt.y.toFixed(2)}`;}).join(' ');
        return <polygon key={i} points={p} fill="none" stroke={i===3?T.borderBr:T.grid} strokeWidth="1" opacity=".85"/>;
      })}
      {axes.map((label,i) => {
        const tip=polar(cx,cy,r,i*(360/n));
        const lp=polar(cx,cy,r+28,i*(360/n));
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke={T.grid} strokeWidth="1"/>
            <text x={lp.x} y={lp.y+4} fill={T.dim} fontSize="10" textAnchor="middle" dominantBaseline="middle">{label}</text>
          </g>
        );
      })}
      <polygon points={pts(nunN)} fill="rgba(96,165,250,.14)" stroke={T.blue} strokeWidth="3"
               filter="drop-shadow(0 0 6px rgba(96,165,250,.5))"/>
      <polygon points={pts(qafN)} fill="rgba(244,63,110,.14)" stroke={T.red} strokeWidth="3"
               filter="drop-shadow(0 0 6px rgba(244,63,110,.5))"/>
      {[{d:qafN,i:5,c:T.red,f:'url(#fRed)'},{d:nunN,i:6,c:T.blue,f:'url(#fBlue)'}].map(({d,i,c,f}) => {
        const p=polar(cx,cy,r*d[i],i*(360/n));
        return <circle key={c} cx={p.x} cy={p.y} r="8" fill={c} filter={f}/>;
      })}
      <g transform="translate(18,256)">
        <rect width="12" height="12" rx="2" fill={T.red} opacity=".85"/>
        <text x="18" y="10" fill={T.dim} fontSize="11">Qaf (ق) — spikes S.50</text>
        <rect x="148" width="12" height="12" rx="2" fill={T.blue} opacity=".85"/>
        <text x="166" y="10" fill={T.dim} fontSize="11">Nun (ن) — spikes S.68</text>
      </g>
    </svg>
  );
};
