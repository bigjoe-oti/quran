import React from 'react';
import { useTooltip } from '../context/TooltipContext';
import { stats } from '../utils/math';
import { T } from '../constants/data';
import Defs from './Defs';

export const OutlierBarChart = ({ data, expected }) => {
  const W=320,H=185,PL=42,PR=8,PT=28,PB=34;
  const gW=W-PL-PR, gH=H-PT-PB;
  const maxVal = Math.max(...data.map(d=>d.val));
  const { mean, std } = stats(data.map(d=>d.val));
  const getY = v => PT + gH - (v/(maxVal*1.12))*gH;
  const barW  = (gW/data.length)*0.60;
  const getX  = i => PL + (i+0.5)*gW/data.length - barW/2;
  const expY  = getY(expected);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full"
         role="img" aria-label={`Frequency bar chart. Expected baseline ${expected}. Outlier in red.`}>
      <Defs/>
      <rect x={PL} y={PT} width={gW} height={gH} fill="url(#pGrid)" opacity=".5"/>
      {[0,Math.round(maxVal*.33),Math.round(maxVal*.66),maxVal].map((v,i) => (
        <g key={i}>
          <line x1={PL} y1={getY(v)} x2={PL+gW} y2={getY(v)} stroke={T.grid} strokeWidth="1" strokeDasharray="3,6"/>
          <text x={PL-4} y={getY(v)+3.5} fill={T.muted} fontSize="8.5" textAnchor="end">{v}</text>
        </g>
      ))}
      <line x1={PL} y1={PT}    x2={PL}    y2={PT+gH} stroke={T.borderBr} strokeWidth="1.5"/>
      <line x1={PL} y1={PT+gH} x2={PL+gW} y2={PT+gH} stroke={T.borderBr} strokeWidth="1.5"/>
      <line x1={PL} y1={expY} x2={PL+gW} y2={expY} stroke={T.gold} strokeWidth="2" strokeDasharray="7,4"/>
      <rect x={PL+3} y={expY-14} width={58} height={13} rx="3" fill={T.panel} stroke={T.border} strokeWidth="1"/>
      <text x={PL+6} y={expY-3} fill={T.gold} fontSize="9" fontWeight="700">baseline={expected}</text>
      {data.map((d,i) => {
        const x=getX(i), y=getY(d.val), ht=PT+gH-y;
        const isOut = d.val > expected*2;
        const z = ((d.val-mean)/std).toFixed(1);
        return (
          <g key={i} aria-label={`${d.label}: ${d.val}${isOut?' outlier':''}`}>
            <rect x={x} y={y} width={barW} height={ht}
                  fill={isOut?'url(#gRedV)':'url(#gBlueV)'}
                  stroke={isOut?T.red:T.blue} strokeWidth={isOut?2:1} rx="3"
                  filter={isOut?'url(#fRed)':''} opacity=".92"/>
            <text x={x+barW/2} y={y-5}  fill={isOut?T.red:T.dim} fontSize={isOut?10:9.5}
                  textAnchor="middle" fontWeight={isOut?'900':'400'}>{d.val}</text>
            {isOut && <text x={x+barW/2} y={y-19} fill={T.red} fontSize="8"
                            textAnchor="middle" fontWeight="700">z={z}σ</text>}
            <text x={x+barW/2} y={PT+gH+16} fill={T.dim} fontSize="8.5" textAnchor="middle">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}
