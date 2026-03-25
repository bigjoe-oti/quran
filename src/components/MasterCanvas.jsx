import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useTooltip } from '../context/TooltipContext';
import Defs from './Defs';
import { T, MUQSURAHS, HAMIN, MUQLETT, RING_GUIDE } from '../constants/data';
import { polar, toRad } from '../utils/math';

export const MasterCanvas = () => {
  const { showTooltip, hideTooltip, moveTooltip } = useTooltip();
  const [hovered, setHovered] = React.useState(null);
  const cx=500, cy=500;

  // Pre-computed constants
  const MUQ_SURAHS_ARR = [2,3,7,10,11,12,13,14,15,19,20,26,27,28,29,30,31,32,36,38,40,41,42,43,44,45,46,50,68];
  const HAMIN_SET_M    = new Set([40,41,42,43,44,45,46]);
  const NO_REF_SET     = new Set([19,29,30,68]);
  const MUQLETT_ARR    = ['ا','ل','م','ص','ر','ك','ه','ي','ع','ط','س','ح','ق','ن'];

  return (
    <div className="w-full flex flex-col items-center gap-6 px-2 py-6">

      {/* ── Title ─────────────────────────────────────────────────── */}
      <div className="text-center">
        <p className="text-[15px] font-mono tracking-[0.4em] uppercase mb-2 font-bold"
           style={{color:T.teal, filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.5))'}}>Phase I · System Topology Overview</p>
        <h1 className="text-3xl md:text-[54px] leading-tight font-black tracking-wide text-transparent bg-clip-text
                       bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-100 uppercase drop-shadow-[0_0_20px_rgba(224,184,74,0.6)]"
            style={{fontFamily:'"Righteous", display', paddingBottom: '8px'}}>
          Mathematical Signatures<br/>of Intentional Design
        </h1>
        <p className="text-lg tracking-widest mt-5 opacity-100" style={{color:T.goldLt, fontFamily: '"Reem Kufi", sans-serif', filter: 'drop-shadow(0 0 5px rgba(224,184,74,0.4))'}}>
          القرآن الكريم · الحروف المقطعة · ٢٩ سورة · ١٤ حرفاً
        </p>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────── */}
      <div className="w-full flex flex-col xl:flex-row gap-8 items-start justify-center mt-6">

        {/* ── SVG Diagram ───────────────────────────────────────── */}
        <div className="w-full xl:w-[720px] shrink-0">
          <svg viewBox="0 0 1000 1000" className="w-full"
               style={{filter:'drop-shadow(0 0 50px rgba(34,211,238,0.12))'}}
               role="img" aria-label="Master topology map: concentric rings showing the mathematical architecture of the Quran Muqattaat system.">
            <Defs/>

            {/* CSS animations for center geometry */}
            <style>{`
              @keyframes spin14 { from{transform-origin:500px 500px;transform:rotate(0deg)} to{transform-origin:500px 500px;transform:rotate(360deg)} }
              @keyframes pulseCore { 0%,100%{opacity:.75} 50%{opacity:1} }
              @keyframes traceArc  { 0%{stroke-dashoffset:600} 100%{stroke-dashoffset:0} }
              .spin14 { animation: spin14 160s linear infinite; }
              .pulse-core { animation: pulseCore 4s ease-in-out infinite; }
            `}</style>

            {/* ── Ambient background ──────────────────────────────── */}
            <circle cx={cx} cy={cy} r="490" fill="url(#gBgR)" opacity=".95"/>
            <circle cx={cx} cy={cy} r="480" fill="url(#gTealR)" opacity=".75"/>
            {/* Subtle radial lines from center — sacred geometry feel */}
            {Array.from({length:28},(_,i)=>{
              const p=polar(cx,cy,485,i*360/28);
              return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y}
                           stroke={T.grid} strokeWidth=".5" opacity=".35"/>;
            })}

            {/* ══════════════════════════════════════════════════════
                RING A — 28-letter Arabic Alphabet (r=440)
            ════════════════════════════════════════════════════════ */}
            <circle cx={cx} cy={cy} r="440" fill="none"
                    stroke={T.border} strokeWidth="60" opacity=".5"/>
            {/* Ring A label arc */}
            <text style={{fontSize:14,fill:T.muted,fontWeight:'600',letterSpacing:'2px'}} >
              <textPath href="#ringA-path" startOffset="3%">
                RING A · 28-LETTER ARABIC ALPHABET · الأبجد العربي الكامل
              </textPath>
            </text>
            <defs>
              <path id="ringA-path" d={`M ${polar(cx,cy,410,5).x},${polar(cx,cy,410,5).y} A 410 410 0 1 1 ${polar(cx,cy,410,4).x},${polar(cx,cy,410,4).y}`}/>
            </defs>

            {/* 28 letter nodes */}
            {Array.from({length:28},(_,i)=>{
              const angle = i*360/28;
              const p     = polar(cx,cy,440,angle);
              const isMuq = i<14;
              return (
                <g key={`ab${i}`}>
                  <circle cx={p.x} cy={p.y} r={isMuq?16:8}
                          fill={isMuq?T.gold:T.muted}
                          opacity={isMuq?1:0.35}
                          style={isMuq?{filter:`drop-shadow(0 0 8px ${T.gold})`}:{}}/>
                  {isMuq && (
                    <text x={p.x} y={p.y+6} fill={T.bg} fontSize="14"
                          textAnchor="middle" fontWeight="900"
                          style={{fontFamily:'serif'}}>{MUQLETT_ARR[i]}</text>
                  )}
                </g>
              );
            })}

            {/* ══════════════════════════════════════════════════════
                ENHANCEMENT 1 — ALM identity lines
                Connects ا ل م in Ring A → Ring D (14-gon vertices)
            ════════════════════════════════════════════════════════ */}
            {[
              {idx:0, letter:'ا', a:polar(cx,cy,440,0),     d:polar(cx,cy,185,0)    },
              {idx:1, letter:'ل', a:polar(cx,cy,440,360/28), d:polar(cx,cy,185,360/14)},
              {idx:2, letter:'م', a:polar(cx,cy,440,2*360/28),d:polar(cx,cy,185,2*360/14)},
            ].map(({idx,letter,a,d})=>(
              <g key={`alm${idx}`}>
                <line x1={a.x} y1={a.y} x2={d.x} y2={d.y}
                      stroke={T.gold} strokeWidth="1.5"
                      strokeDasharray="6,10" opacity=".5"/>
              </g>
            ))}
            {/* Identity annotation */}
            <text x="730" y="210" fill={T.gold} fontSize="13" opacity=".85"
                  fontWeight="900" style={{filter:`drop-shadow(0 0 4px ${T.gold})`}}>A/L = e/φ</text>
            <text x="730" y="228" fill={T.muted} fontSize="11" opacity=".8">
              → 14-gon angle
            </text>

            {/* ══════════════════════════════════════════════════════
                RING B — Letter frequency spikes (r=268 outward)
            ════════════════════════════════════════════════════════ */}
            {MUQLETT_ARR.map((letter,i)=>{
              const angle = i*360/14;
              const isQ=i===12, isN=i===13, isA=i===0, isL=i===1;
              const len = isQ?184 : isN?168 : isA?122 : isL?90 : 38+Math.sin(i*1.4)*18;
              const p1  = polar(cx,cy,330,angle);
              const p2  = polar(cx,cy,330+len,angle);
              const col = isQ?T.red : isN?T.blue : isA?T.teal : isL?T.teal : T.muted;
              const sw  = isQ||isN?16 : isA||isL?12 : 8;
              return (
                <g key={`sp${i}`}>
                  <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                        stroke={col} strokeWidth={sw} strokeLinecap="round"
                        opacity=".9"
                        style={{filter:isQ?`drop-shadow(0 0 10px ${T.red})`:isN?`drop-shadow(0 0 10px ${T.blue})`:isA?`drop-shadow(0 0 6px ${T.teal})`:'none'}}/>
                  {/* Letter label at tip for anomalies */}
                  {(isQ||isN||isA) && (
                    <text x={p2.x + (isQ?-12:isN?-8:0)}
                          y={p2.y + (isQ?10:isN?-10:isA?-10:0)}
                          fill={col} fontSize="18" textAnchor="middle"
                          style={{fontFamily:'serif', filter:`drop-shadow(0 0 6px ${col})`}}
                          fontWeight="900">{letter}</text>
                  )}
                </g>
              );
            })}

            {/* ══════════════════════════════════════════════════════
                ENHANCEMENT 2 — Spike tip → Surah arc connectors
            ════════════════════════════════════════════════════════ */}
            {/* Qaf connector */}
            <path d="M 85,160 Q 155,125 385,245"
                  fill="none" stroke={T.red} strokeWidth="2"
                  strokeDasharray="8,6" opacity=".75"
                  style={{filter:`drop-shadow(0 0 5px ${T.red})`}}/>
            <circle cx="85" cy="160" r="5" fill={T.red} opacity=".9"/>
            {/* Nun connector */}
            <path d="M 280,45 Q 380,30 440,230"
                  fill="none" stroke={T.blue} strokeWidth="2"
                  strokeDasharray="8,6" opacity=".75"
                  style={{filter:`drop-shadow(0 0 5px ${T.blue})`}}/>
            <circle cx="280" cy="45" r="5" fill={T.blue} opacity=".9"/>
            {/* Connector labels */}
            <text x="125" y="115" fill={T.red} fontSize="11" fontWeight="800" opacity=".9">ق → S.50</text>
            <text x="325" y="25"  fill={T.blue} fontSize="11" fontWeight="800" opacity=".9">ن → S.68</text>

            {/* ══════════════════════════════════════════════════════
                RING C — 29 Muqattaat surahs (r=265)
                Gold outer ring = surahs with book-ref in v2
            ════════════════════════════════════════════════════════ */}
            <circle cx={cx} cy={cy} r="265" fill="none"
                    stroke="#0A1525" strokeWidth="64"/>

            {/* Intertextual gold outer ring marks */}
            {MUQ_SURAHS_ARR.map((sn,i)=>{
              if(NO_REF_SET.has(sn)) return null;
              const angle = i*360/29;
              const p     = polar(cx,cy,300,angle);
              return (
                <circle key={`ir${i}`} cx={p.x} cy={p.y} r="5"
                        fill={T.gold} opacity=".65"
                        style={{filter:`drop-shadow(0 0 4px ${T.gold})`}}/>
              );
            })}

            {/* Surah nodes */}
            {MUQ_SURAHS_ARR.map((sn,i)=>{
              const angle  = i*360/29;
              const p      = polar(cx,cy,265,angle);
              const isHM   = HAMIN_SET_M.has(sn);
              const isS19  = sn===19;
              const isS50  = sn===50;
              const isS68  = sn===68;
              const noRef  = NO_REF_SET.has(sn);
              const r2     = isHM?22 : (isS19||isS50||isS68)?19 : 9;
              const col    = isHM?T.blue : isS19?T.red : isS50?T.red : isS68?T.blue : T.teal;
              return (
                <g key={`su${i}`}>
                  <circle cx={p.x} cy={p.y} r={r2+6} fill={col} opacity=".15"/>
                  <circle cx={p.x} cy={p.y} r={r2}
                          fill={col}
                          opacity={isHM||isS19||isS50||isS68?1:0.7}
                          style={{filter:isHM?`drop-shadow(0 0 10px ${T.blue})`:
                                         isS50||isS19?`drop-shadow(0 0 10px ${T.red})`:
                                         isS68?`drop-shadow(0 0 10px ${T.blue})`:'none'}}/>
                  {(isHM||isS19||isS50||isS68) && (
                    <text x={p.x} y={p.y+5} fill="#fff"
                          fontSize={isHM?14:13.5} textAnchor="middle"
                          fontWeight="900">{sn}</text>
                  )}
                  {/* Small X mark for no-ref exceptions */}
                  {noRef && !isS19 && (
                    <text x={p.x} y={p.y-r2-5} fill={T.muted}
                          fontSize="10" textAnchor="middle" opacity=".7">✕</text>
                  )}
                </g>
              );
            })}

            {/* ══════════════════════════════════════════════════════
                ENHANCEMENT 3 — Ha-Mim bracket arc
            ════════════════════════════════════════════════════════ */}
            {/* Outer bracket arc */}
            <path d="M 215,615 A 300 300 0 0 1 315,255"
                  fill="none" stroke={T.blue} strokeWidth="4.5"
                  opacity=".9"
                  style={{filter:`drop-shadow(0 0 7px ${T.blue})`}}/>
            {/* Bracket end caps */}
            <circle cx="215" cy="615" r="5" fill={T.blue} opacity=".95"/>
            <circle cx="315" cy="255" r="5" fill={T.blue} opacity=".95"/>
            {/* Ha-Mim label */}
            <rect x="100" y="390" width="105" height="42" rx="6"
                  fill={T.card} stroke={T.blue} strokeWidth="1.5" opacity=".95"/>
            <text x="152.5" y="408" fill={T.blue} fontSize="20" textAnchor="middle"
                  fontWeight="900" style={{fontFamily:'serif',
                  filter:`drop-shadow(0 0 5px ${T.blue})`}}>حم</text>
            <text x="152.5" y="424" fill={T.blue} fontSize="10" textAnchor="middle"
                  fontWeight="800">7 consecutive</text>

            {/* ══════════════════════════════════════════════════════
                RING D — 14-gon inner structure (r=185)
            ════════════════════════════════════════════════════════ */}
            <polygon
              points={Array.from({length:14},(_,i)=>{
                const p = polar(cx,cy,185,i*360/14);
                return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
              }).join(' ')}
              fill="rgba(192,132,252,0.06)" stroke={T.purple}
              strokeWidth="2.5" opacity=".85"/>
            {/* 14-gon vertices */}
            {Array.from({length:14},(_,i)=>{
              const p=polar(cx,cy,185,i*360/14);
              return <circle key={i} cx={p.x} cy={p.y} r="6"
                             fill={T.gold} opacity=".7"
                             style={{filter:`drop-shadow(0 0 4px ${T.gold})`}}/>;
            })}

            {/* ══════════════════════════════════════════════════════
                CORE HUB — animated sacred geometry center
            ════════════════════════════════════════════════════════ */}
            {/* Outer ring */}
            <circle cx={cx} cy={cy} r="156" fill={T.bg}
                    stroke="url(#gGold)" strokeWidth="8"
                    style={{filter:`drop-shadow(0 0 35px ${T.gold}AA)`}}/>
            {/* Slowly rotating inner 14-gon */}
            <g className="spin14">
              <polygon
                points={Array.from({length:14},(_,i)=>{
                  const p = polar(cx,cy,140,i*360/14);
                  return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
                }).join(' ')}
                fill="none" stroke={T.gold} strokeWidth="2.5"
                strokeDasharray="4,10" opacity=".65"/>
            </g>
            {/* Dashed inner circle */}
            <circle cx={cx} cy={cy} r="146" fill="none"
                    stroke={T.gold} strokeWidth="2"
                    strokeDasharray="4,12" opacity=".6"/>
            {/* الم — pulsing */}
            <text x={cx} y={cy-16} fill={T.gold} fontSize="108" fontWeight="bold"
                  textAnchor="middle" className="pulse-core"
                  style={{fontFamily:'serif',
                  filter:`drop-shadow(0 0 40px ${T.gold}DD)`}}>الم</text>
            {/* Stats */}
            <text x={cx} y={cy+55} fill={T.text} fontSize="17"
                  textAnchor="middle" letterSpacing="4px"
                  style={{fontFamily:'monospace'}}>29 SURAHS · 14 LETTERS</text>
            <text x={cx} y={cy+82} fill={T.red} fontSize="16"
                  fontWeight="900" textAnchor="middle"
                  style={{filter:`drop-shadow(0 0 10px ${T.red})`}}>
              Joint P &lt; 10⁻⁶⁰
            </text>
            {/* e/φ annotation on inner ring edge */}
            <text x={cx+108} y={cy-100} fill={T.gold} fontSize="12"
                  opacity=".8" fontWeight="800">e/φ</text>

            {/* ══════════════════════════════════════════════════════
                RING LABELS — right side, aligned to ring edges
            ════════════════════════════════════════════════════════ */}
            {[
              {r:440, col:T.gold,   label:'A · 28-letter Abjad'},
              {r:330, col:T.teal,   label:'B · Frequency spikes'},
              {r:265, col:T.blue,   label:'C · 29 Muqattaat surahs'},
              {r:185, col:T.purple, label:'D · 14-gon (e/φ identity)'},
              {r:108, col:T.gold,   label:'Core · Initiatory letters'},
            ].map(({r,col,label},i)=>{
              const edgePt = polar(cx,cy,r,55);
              return (
                <g key={i}>
                  <line x1={edgePt.x} y1={edgePt.y}
                        x2={edgePt.x+24} y2={edgePt.y}
                        stroke={col} strokeWidth="1.5" opacity=".7"/>
                  <circle cx={edgePt.x} cy={edgePt.y} r="4"
                          fill={col} opacity=".85"/>
                  <text x={edgePt.x+30} y={edgePt.y+5}
                        fill={col} fontSize="14" fontWeight="800"
                        style={{filter:`drop-shadow(0 0 4px rgba(12,22,40,0.8))`}}>{label}</text>
                </g>
              );
            })}

            {/* ══════════════════════════════════════════════════════
                INTERTEXTUAL LEGEND — bottom
            ════════════════════════════════════════════════════════ */}
            <g transform="translate(35,950)">
              <circle cx="10" cy="8" r="5" fill={T.gold} opacity=".8"/>
              <text x="22" y="13" fill={T.dim} fontSize="14">Book-ref in v2 (25/29)</text>
              <circle cx="210" cy="8" r="5" fill={T.blue}/>
              <text x="222" y="13" fill={T.dim} fontSize="14">Ha-Mim block (40–46)</text>
              <circle cx="415" cy="8" r="5" fill={T.red}/>
              <text x="427" y="13" fill={T.dim} fontSize="14">Outliers: S.19 · S.50 · S.68</text>
            </g>

          </svg>
        </div>

        {/* ── Ring Guide Cards ──────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <p className="text-xs font-mono tracking-[0.25em] uppercase mb-1"
             style={{color:T.muted}}>Ring-by-Ring Explanation</p>
          {RING_GUIDE.map((ring, i) => (
            <div key={i}
                 className="rounded-xl border p-4 transition-all duration-300 cursor-default"
                 style={{
                   background: hovered===i ? T.card : T.panel,
                   borderColor: hovered===i ? ring.color : T.border,
                   boxShadow: hovered===i ? `0 0 18px ${ring.color}22` : 'none',
                 }}
                 onMouseEnter={()=>setHovered(i)}
                 onMouseLeave={()=>setHovered(null)}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                      style={{background:`${ring.color}22`, color:ring.color,
                              border:`1px solid ${ring.color}55`}}>
                  {ring.ring}
                </span>
                <span className="text-sm" style={{color:ring.color, fontFamily:'"Righteous", display'}}>
                  {ring.title}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-2" style={{color:T.dim, fontFamily:'"Advent Pro", sans-serif', fontWeight:400, fontStretch:'120%'}}>
                {ring.desc}
              </p>
              <p className="text-[13.5px] leading-relaxed text-right opacity-90 border-t border-white/5 pt-2"
                 style={{color:T.text, fontFamily:'"Reem Kufi", sans-serif', direction:'rtl'}}>
                {ring.arabicDesc}
              </p>
            </div>
          ))}
          {/* Intertextual summary card */}
          <div className="rounded-xl border p-4 mt-1"
               style={{background:T.card, borderColor:`${T.gold}44`}}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                    style={{background:`${T.gold}22`, color:T.gold,
                            border:`1px solid ${T.gold}55`}}>Finding C</span>
              <span className="text-sm font-bold" style={{color:T.gold}}>
                Intertextual Bridge — 86.2%
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{color:T.dim}}>
              Gold dots on Ring C mark the 25 of 29 surahs whose very next verse 
              declares كتاب · قرآن · تنزيل. Fisher Exact p = 6×10⁻¹⁰. Odds ratio 23.26.
              The letters say: these are Arabic letters. The next verse says: this is the Book.
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats row ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        {[
          {label:'Muqattaat Surahs', val:'29',     sub:'of 114  ·  114 = 6 × 19',       col:T.teal  },
          {label:'Unique Letters',   val:'14',     sub:'= ½ × 28 Arabic alphabet',       col:T.gold  },
          {label:'Total Occurrences',val:'40,071', sub:'= 3 × 19² × 37 = 111 × 19²',    col:T.purple},
          {label:'Joint Probability',val:'< 10⁻⁶⁰',sub:'far beyond chance',             col:T.red   },
        ].map(({label,val,sub,col})=>(
          <div key={label} className="flex flex-col items-center rounded-xl px-5 py-3 border"
               style={{background:T.panel, borderColor:T.border}}>
            <span className="text-[10px] font-mono tracking-widest uppercase"
                  style={{color:T.muted}}>{label}</span>
            <span className="text-xl font-black mt-0.5" style={{color:col}}>{val}</span>
            <span className="text-[10px] font-mono mt-0.5" style={{color:T.muted}}>{sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
