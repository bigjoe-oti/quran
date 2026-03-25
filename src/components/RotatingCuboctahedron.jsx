import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTooltip } from '../context/TooltipContext';
import { clamp } from '../utils/math';
import { T, MUQLETT } from '../constants/data';
import { isoProj, IsoCube } from './MiscCharts';
import Defs from './Defs';

export const RotatingCuboctahedron = () => {
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip();

  const [t, setT] = useState(0);
  const raf = useRef();
  const VERTS = useMemo(() => [
    [1,1,0],[1,-1,0],[-1,1,0],[-1,-1,0],
    [1,0,1],[1,0,-1],[-1,0,1],[-1,0,-1],
    [0,1,1],[0,1,-1],[0,-1,1],[0,-1,-1]
  ], []);
  const EDGES = useMemo(() => {
    const e=[];
    for(let i=0;i<12;i++) for(let j=i+1;j<12;j++){
      const [dx,dy,dz]=VERTS[i].map((v,k)=>v-VERTS[j][k]);
      if(Math.abs(dx*dx+dy*dy+dz*dz-2)<0.01) e.push([i,j]);
    }
    return e;
  },[VERTS]);
  useEffect(() => {
    const anim = ts => { setT(ts*.001); raf.current=requestAnimationFrame(anim); };
    raf.current = requestAnimationFrame(anim);
    return () => cancelAnimationFrame(raf.current);
  }, []);
  const proj = ([vx,vy,vz]) => {
    const cy2=Math.cos(t*.60), sy=Math.sin(t*.60);
    const cx2=Math.cos(t*.35), sx=Math.sin(t*.35);
    const x1=vx*cy2-vz*sy, z1=vx*sy+vz*cy2;
    const y2=vy*cx2-z1*sx, z2=vy*sx+z1*cx2;
    return {x:x1*56+146, y:y2*56+108, z:z2};
  };
  const PV=VERTS.map(proj);
  const sorted=[...EDGES].sort((a,b)=>(PV[a[0]].z+PV[a[1]].z)/2-(PV[b[0]].z+PV[b[1]].z)/2);
  return (
    <svg viewBox="0 0 292 220" className="w-full h-full"
         role="img" aria-label="Rotating 3D cuboctahedron — 12 vertices, 24 edges, 14 faces mapping to 14 Muqattaat letters.">
      <Defs/>
      <circle cx="146" cy="108" r="86" fill="url(#gTealR)"/>
      {sorted.map(([a,b],i) => {
        const p1=PV[a], p2=PV[b], avgZ=(p1.z+p2.z)/2;
        const op=clamp(0.12+0.88*((avgZ+1.5)/3), 0.08, 1);
        return (
          <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke={T.teal} strokeWidth={avgZ>0.2?'2.5':'1.2'}
                strokeOpacity={op} filter={avgZ>0.6?'url(#fTeal)':''}/>
        );
      })}
      {PV.map((p,i) => {
        const nz=clamp((p.z+1.5)/3,0,1);
        return (
          <circle key={i} onMouseEnter={(e) => showTooltip(`Vertex: ${MUQLETT[i] || ""}`, e)} onMouseMove={moveTooltip} onMouseLeave={hideTooltip} cx={p.x} cy={p.y} r={2.5+nz*3.5}
                  fill={T.gold} opacity={0.2+nz*0.8}
                  filter={nz>0.7?'url(#fGold)':''}/>
        );
      })}
      <text x="146" y="198" fill={T.dim} fontSize="9.5" textAnchor="middle">
        12 Vertices · 24 Edges · <tspan fill={T.gold} fontWeight="700">14 Faces</tspan>
      </text>
      <text x="146" y="212" fill={T.gold} fontSize="9" textAnchor="middle" opacity=".7">
        8 △ Triangular + 6 □ Square  =  14 Unique Letters
      </text>
    </svg>
  );
};
