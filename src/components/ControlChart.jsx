import React from 'react';
import { useTooltip } from '../context/TooltipContext';
import { stats, fmt } from '../utils/math';
import { T } from '../constants/data';
import Defs from './Defs';

export const ControlChart = ({ data, target, min, max, yLabel = '', xLabels }) => {
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip();

  const W=320,H=168,PL=46,PR=16,PT=20,PB=28;
  const gW=W-PL-PR, gH=H-PT-PB;
  const getY = v => PT + gH - ((v-min)/(max-min))*gH;
  const getX = i => PL + (i*gW)/(data.length-1);
  const { mean, std, cv } = stats(data);
  const tgt = typeof target==='number' ? target : mean;
  const pathD = data.map((d,i) => `${i===0?'M':'L'}${getX(i).toFixed(1)} ${getY(d).toFixed(1)}`).join(' ');
  const areaD = `${pathD} L${getX(data.length-1).toFixed(1)} ${(PT+gH).toFixed(1)} L${PL} ${(PT+gH).toFixed(1)} Z`;
  const ticks  = Array.from({length:5}, (_,i) => min+(max-min)*i/4);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full"
         role="img" aria-label={`Control chart: ${yLabel}. Mean ${mean.toFixed(5)}. CV ${cv.toFixed(3)}%.`}>
      <Defs/>
      <rect x={PL} y={PT} width={gW} height={gH} fill="url(#pGrid)" opacity=".6"/>
      {/* sigma band */}
      <rect x={PL} y={Math.min(getY(mean+std),getY(mean-std))} width={gW}
            height={Math.abs(getY(mean+std)-getY(mean-std))}
            fill={T.teal} fillOpacity=".06" rx="2"/>
      {ticks.map((v,i) => (
        <g key={i}>
          <line x1={PL} y1={getY(v)} x2={PL+gW} y2={getY(v)} stroke={T.grid} strokeWidth="1" strokeDasharray="3,7"/>
          <text x={PL-5} y={getY(v)+4} fill={T.muted} fontSize="8.5" textAnchor="end">{v.toFixed(2)}</text>
        </g>
      ))}
      <line x1={PL} y1={PT}    x2={PL}    y2={PT+gH} stroke={T.borderBr} strokeWidth="1.5"/>
      <line x1={PL} y1={PT+gH} x2={PL+gW} y2={PT+gH} stroke={T.borderBr} strokeWidth="1.5"/>
      {/* target line */}
      <line x1={PL} y1={getY(tgt)} x2={PL+gW} y2={getY(tgt)} stroke={T.gold} strokeWidth="2" strokeDasharray="6,3"/>
      <rect x={PL+gW-76} y={getY(tgt)-14} width={76} height={13} rx="3" fill={T.panel} stroke={T.border} strokeWidth="1"/>
      <text x={PL+gW-5} y={getY(tgt)-4} fill={T.gold} fontSize="8.5" textAnchor="end" fontWeight="700">
        {typeof target==='number' ? fmt(tgt,7) : 'mean'}
      </text>
      {/* area fill */}
      <path d={areaD} fill="url(#gTealV)" opacity=".35"/>
      <path d={pathD} fill="none" stroke={T.teal} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" filter="url(#fTeal)"/>
      {data.map((d,i) => (
        <g key={i}>
          <circle cx={getX(i)} cy={getY(d)} r="4.5" fill={T.bg} stroke={T.teal} strokeWidth="2.5"/>
          <circle cx={getX(i)} cy={getY(d)} r="1.8" fill={T.text}/>
          {xLabels && <text x={getX(i)} y={PT+gH+16} fill={T.muted} fontSize="8" textAnchor="middle">{xLabels[i]}</text>}
        </g>
      ))}
      <text x="9" y={PT+gH/2} fill={T.muted} fontSize="8" textAnchor="middle"
            transform={`rotate(-90,9,${PT+gH/2})`}>{yLabel}</text>
      <rect x={PL+gW-74} y={PT} width={74} height={14} rx="3" fill={T.card} stroke={T.border} strokeWidth="1"/>
      <text x={PL+gW-5} y={PT+10} fill={T.purple} fontSize="8.5" textAnchor="end" fontWeight="700">CV = {cv.toFixed(3)}%</text>
    </svg>
  );
}
