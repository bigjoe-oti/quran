import React from 'react';
import { useTooltip } from '../context/TooltipContext';
import { polar, fmt, clamp, toRad, stats, pi, phi, C, Q } from '../utils/math';
import { T, FINDING_C_DATA, MAKHRAJ_DATA, MK_STATUS_COL, TAG_COLORS, MAHAL_SURAHS, MAHAL_SIGMAS, MAHAL_PCAX, MAHAL_PCAY } from '../constants/data';
import Defs from './Defs';

export const isoProj = (gx, gy, gz, s = 22, ox = 0, oy = 0) => ({
  x: ox + (gx - gy) * s * 0.866,
  y: oy + (gx + gy) * s * 0.5 - gz * s,
});

export const IsoCube = ({ gx, gy, gz, s = 22, ox = 0, oy = 0, topCol, leftCol, rightCol, opacity = 1 }) => {
  const p = (x, y, z) => isoProj(x, y, z, s, ox, oy);
  const T_ = p(gx,   gy,   gz+1); const TR = p(gx+1, gy,   gz+1);
  const TF = p(gx+1, gy+1, gz+1); const TL = p(gx,   gy+1, gz+1);
  const BL = p(gx,   gy+1, gz);   const BR = p(gx+1, gy+1, gz);
  const BC = p(gx+1, gy,   gz);
  const pt = arr => arr.map(v => `${v.x.toFixed(1)},${v.y.toFixed(1)}`).join(' ');
  return (
    <g opacity={opacity}>
      <polygon points={pt([T_,TR,TF,TL])} fill={topCol}   stroke={T.bg} strokeWidth=".8"/>
      <polygon points={pt([TL,TF,BR,BL])} fill={leftCol}  stroke={T.bg} strokeWidth=".8"/>
      <polygon points={pt([TR,BC,BR,TF])} fill={rightCol} stroke={T.bg} strokeWidth=".8"/>
    </g>
  );
};


export const IsoFactorViz = () => {
  const s=18, ox=146, oy=160;
  const towers = [
    { gx:0, col:['#34D399','#1A8C60','#0F5E42'], ht:3,  label:'3', sublabel:'factor' },
    { gx:3, col:['#E0B84A','#9A6E1A','#6A4A10'], ht:8,  label:'19²', sublabel:'=361' },
    { gx:6, col:['#60A5FA','#2563EB','#1E3A8A'], ht:4,  label:'37', sublabel:'factor' },
  ];
  return (
    <svg viewBox="0 0 292 230" className="w-full h-full"
         role="img" aria-label="Isometric 3D tower visualization of prime factorization: 40,071 = 3 x 19 squared x 37">
      <Defs/>
      {/* isometric grid floor */}
      {Array.from({length:6},(_,i)=>Array.from({length:6},(_,j)=>{
        const p0=isoProj(i,  j,  0,s,ox,oy);
        const p1=isoProj(i+1,j,  0,s,ox,oy);
        const p2=isoProj(i+1,j+1,0,s,ox,oy);
        const p3=isoProj(i,  j+1,0,s,ox,oy);
        const pts=[p0,p1,p2,p3].map(p=>`${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
        return <polygon key={`${i}-${j}`} points={pts} fill="none" stroke={T.grid} strokeWidth=".7" opacity=".5"/>;
      }))}
      {/* towers */}
      {towers.map(({gx,col,ht,label,sublabel},ti) => {
        const blocks=[];
        for(let gz=0;gz<ht;gz++){
          blocks.push(
            <IsoCube key={gz} gx={gx} gy={2} gz={gz} s={s} ox={ox} oy={oy}
                     topCol={col[0]} leftCol={col[1]} rightCol={col[2]}
                     opacity={0.6+gz*0.05}/>
          );
        }
        const top=isoProj(gx+0.5,2,ht+0.4,s,ox,oy);
        const bot=isoProj(gx+0.5,2+1.8,0,s,ox,oy);
        return (
          <g key={ti}>
            {blocks}
            <text x={top.x} y={top.y} fill={col[0]} fontSize="12" fontWeight="900"
                  textAnchor="middle" filter="url(#fSoft)">{label}</text>
            <text x={bot.x} y={bot.y+10} fill={T.muted} fontSize="9" textAnchor="middle">{sublabel}</text>
          </g>
        );
      })}
      {/* equals sign and result */}
      <text x="146" y="10" fill={T.gold} fontSize="14" fontWeight="900" textAnchor="middle">40,071  =  3  ×  19²  ×  37</text>
      <text x="146" y="26" fill={T.dim} fontSize="10" textAnchor="middle">=  111  ×  361  =  111  ×  19²</text>
      <text x="146" y="220" fill={T.muted} fontSize="9" textAnchor="middle">Tower height proportional to factor magnitude</text>
    </svg>
  );
};

export const FullDistChart = ({ letter, surahNum, outlierFreq, corpusMean, corpusStd,
                          zScore, outlierCount, baselineCount, pValue, color }) => {
  // Histogram bins for the 113 non-outlier surahs
  const W=420, H=230, PL=46, PR=12, PT=46, PB=32;
  const gW=W-PL-PR, gH=H-PT-PB;

  // Pre-computed histogram data (113 body + 1 outlier)
  const isQaf = letter === 'ق';
  const bins = isQaf
    ? [{x:0,w:10,n:71},{x:10,w:10,n:41},{x:20,w:10,n:1},{x:30,w:80,n:0}]
    : [{x:20,w:15,n:3},{x:35,w:15,n:10},{x:50,w:15,n:60},{x:65,w:15,n:38},
       {x:80,w:15,n:1},{x:95,w:15,n:1}];
  const maxN = Math.max(...bins.map(b=>b.n));
  const xMax = isQaf ? 135 : 210;
  const xScale = gW / xMax;

  const getX = v => PL + v * xScale;
  const getY = n => PT + gH - (n/maxN) * gH;

  return (
    <svg viewBox={`0 0 ${W} ${H+20}`} className="w-full h-full"
         role="img"
         aria-label={`Full 114-surah frequency distribution for letter ${letter}. Surah ${surahNum} is the extreme outlier at ${outlierFreq} per 1000 letters, z=${zScore}.`}>
      <Defs/>
      <text x={W/2} y="13" fill="#E0B84A" fontSize="10" fontWeight="900"
            textAnchor="middle">FULL CORPUS — ALL 114 SURAHS</text>
      <text x={W/2} y="23" fill="#94ADC8" fontSize="8" textAnchor="middle">
        Letter {letter} frequency per 1000 letters · Anchors verified
      </text>

      {/* Axes */}
      <line x1={PL} y1={PT} x2={PL} y2={PT+gH} stroke="#3A5A80" strokeWidth="1.5"/>
      <line x1={PL} y1={PT+gH} x2={PL+gW} y2={PT+gH} stroke="#3A5A80" strokeWidth="1.5"/>

      {/* Grid */}
      {[0,.25,.5,.75,1].map((v,i)=>(
        <g key={i}>
          <line x1={PL} y1={getY(v*maxN)} x2={PL+gW} y2={getY(v*maxN)}
                stroke="#1E3450" strokeWidth="1" strokeDasharray="3,6"/>
          <text x={PL-4} y={getY(v*maxN)+4} fill="#475569" fontSize="8" textAnchor="end">
            {Math.round(v*maxN)}
          </text>
        </g>
      ))}

      {/* Histogram bars */}
      {bins.map((b,i)=>(
        <rect key={i}
              x={getX(b.x)+1} y={getY(b.n)} width={b.w*xScale-2} height={PT+gH-getY(b.n)}
              fill="#3B82F6" rx="2" opacity={b.n>0?0.75:0}/>
      ))}

      {/* Mean marker */}
      <line x1={getX(corpusMean)} y1={PT} x2={getX(corpusMean)} y2={PT+gH}
            stroke="#E0B84A" strokeWidth="1.5" strokeDasharray="5,4"/>
      <text x={getX(corpusMean)} y={PT-4} fill="#E0B84A" fontSize="8" textAnchor="middle">
        μ={corpusMean}
      </text>

      {/* Outlier spike */}
      <line x1={getX(outlierFreq)} y1={PT+gH} x2={getX(outlierFreq)} y2={PT+gH-50}
            stroke={color} strokeWidth="3"
            style={{filter:`drop-shadow(0 0 6px ${color})`}}/>
      <polygon
        points={`${getX(outlierFreq)-5},${PT+gH-50} ${getX(outlierFreq)+5},${PT+gH-50} ${getX(outlierFreq)},${PT+gH-62}`}
        fill={color} style={{filter:`drop-shadow(0 0 4px ${color})`}}/>
      <rect x={getX(outlierFreq)-28} y={PT+gH-85} width={56} height={20} rx="4"
            fill="#1C2D48" stroke={color} strokeWidth="1"/>
      <text x={getX(outlierFreq)} y={PT+gH-77} fill={color} fontSize="8.5"
            textAnchor="middle" fontWeight="900">S.{surahNum}  {letter}</text>
      <text x={getX(outlierFreq)} y={PT+gH-67} fill={color} fontSize="7.5"
            textAnchor="middle">z = {zScore}σ</text>

      {/* X axis labels */}
      {(isQaf?[0,20,40,60,80,100,120]:[20,50,80,110,140,170,200]).map((v,i)=>(
        <text key={i} x={getX(v)} y={PT+gH+12} fill="#475569" fontSize="8" textAnchor="middle">{v}</text>
      ))}
      <text x={PL+gW/2} y={PT+gH+24} fill="#94ADC8" fontSize="8" textAnchor="middle">
        Frequency per 1,000 letters
      </text>

      {/* Stats box */}
      <rect x={PL+gW-130} y={PT+2} width={130} height={42} rx="4"
            fill="#1C2D48" stroke={color} strokeWidth="1" strokeOpacity=".7"/>
      <text x={PL+gW-8} y={PT+13} fill={color} fontSize="8.5" textAnchor="end" fontWeight="700">
        Z = {zScore}σ  ·  p = {pValue}
      </text>
      <text x={PL+gW-8} y={PT+24} fill="#94ADC8" fontSize="8" textAnchor="end">
        Count: {outlierCount}  ·  Baseline mean: {baselineCount}
      </text>
      <text x={PL+gW-8} y={PT+35} fill="#C084FC" fontSize="8" textAnchor="end" fontWeight="700">
        Rank 1st of all 114 surahs
      </text>
    </svg>
  );
};

export const QafDistChart = () => (
  <FullDistChart
    letter="ق" surahNum={50} outlierFreq={121.1}
    corpusMean={20.22} corpusStd={10.49} zScore={9.62}
    outlierCount={221} baselineCount={20}
    pValue="< 10⁻²¹" color="#F43F6E"/>
);

export const NunDistChart = () => (
  <FullDistChart
    letter="ن" surahNum={68} outlierFreq={194.4}
    corpusMean={62.77} corpusStd={17.23} zScore={7.64}
    outlierCount={391} baselineCount={63}
    pValue="< 10⁻¹⁴" color="#60A5FA"/>
);

export const MahalanobisScatter = () => {
  const [hov, setHov] = React.useState(null);
  const W=320, H=218, pad=28;

  // Normalize PCA coords to canvas
  const allX = MAHAL_PCAX, allY = MAHAL_PCAY;
  const minX=Math.min(...allX), maxX=Math.max(...allX);
  const minY=Math.min(...allY), maxY=Math.max(...allY);
  const sx = v => pad + (v-minX)/(maxX-minX)*(W-pad*2);
  const sy = v => pad + (v-minY)/(maxY-minY)*(H-pad*2);

  const openings = {19:'كهيعص',50:'ق',68:'ن'};
  const TOP3 = new Set([19,50,68]);

  return (
    <svg viewBox={`0 0 ${W} ${H+34}`} className="w-full h-full"
         role="img"
         aria-label="PCA scatter of all 29 Muqattaat surahs in 14-dimensional letter-frequency space. S.50, S.68, S.19 are the three most isolated points.">
      <Defs/>
      {/* Grid */}
      <rect x={pad} y={pad} width={W-pad*2} height={H-pad*2}
            fill="url(#pGrid)" opacity=".4" rx="4"/>
      {/* Sigma rings around centroid */}
      {[1,2,3].map(s => {
        // approximate sigma rings in PCA space
        const r = s * 38;
        const cx2 = sx(0), cy2 = sy(0);
        return (
          <g key={s}>
            <ellipse cx={cx2} cy={cy2} rx={r*2.1} ry={r}
                     fill="none" stroke="#1E3450" strokeWidth="1"
                     strokeDasharray="4,6" opacity=".6"/>
            <text x={cx2+r*2.1+4} y={cy2+4} fill="#2A4060" fontSize="7.5">{s}σ</text>
          </g>
        );
      })}
      {/* All points */}
      {MAHAL_SURAHS.map((s,i) => {
        const isTop = TOP3.has(s);
        const isHov = hov === i;
        const x = sx(MAHAL_PCAX[i]);
        const y = sy(MAHAL_PCAY[i]);
        const col = s===50?'#F43F6E':s===68?'#60A5FA':s===19?'#E0B84A':'#3A5A80';
        const r   = isTop ? 7 : 4;
        return (
          <g key={s} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
             style={{cursor:'default'}}>
            {isTop && <circle cx={x} cy={y} r={r+6} fill={col} opacity=".12"/>}
            <circle cx={x} cy={y} r={r} fill={col}
                    style={{filter: isTop?`drop-shadow(0 0 5px ${col})`:'none'}}
                    opacity={isTop?1:0.65}/>
            {isTop && (
              <g>
                <rect x={x-18} y={y-22} width={36} height={13} rx="3"
                      fill="#1C2D48" stroke={col} strokeWidth=".8"/>
                <text x={x} y={y-13} fill={col} fontSize="8" textAnchor="middle"
                      fontWeight="700">S.{s}</text>
              </g>
            )}
            {(isHov && !isTop) && (
              <text x={x} y={y-8} fill="#94ADC8" fontSize="7.5"
                    textAnchor="middle">S.{s}</text>
            )}
          </g>
        );
      })}
      {/* Axis labels */}
      <text x={W/2} y={H+8} fill="#475569" fontSize="8" textAnchor="middle">
        PC1 (79.7% variance)
      </text>
      <text x="8" y={H/2} fill="#475569" fontSize="8" textAnchor="middle"
            transform={`rotate(-90,8,${H/2})`}>PC2 (8.5%)</text>
      {/* Legend */}
      <g transform={`translate(${pad},${H+22})`}>
        {[[50,'#F43F6E','S.50 ق +3.26σ'],[68,'#60A5FA','S.68 ن +2.94σ'],[19,'#E0B84A','S.19 كهيعص +1.92σ']].map(([s,col,label],i)=>(
          <g key={s} transform={`translate(${i*88},0)`}>
            <circle cx="5" cy="5" r="4.5" fill={col}
                    style={{filter:`drop-shadow(0 0 3px ${col})`}}/>
            <text x="13" y="9" fill="#94ADC8" fontSize="7.5">{label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export const SemanticConcentrationViz = () => {
  const surahs = [
    {
      s:50, letter:'ق', col:'#F43F6E',
      sections:[
        {name:'Opening / Oath',  n:15,  v:5,  type:'declaration'},
        {name:'Narrative',       n:90,  v:25, type:'narrative'},
        {name:'Eschatological',  n:116, v:15, type:'declaration'},
      ],
      total:221, chi2:31.1, p:'2.5×10⁻⁸'
    },
    {
      s:68, letter:'ن', col:'#60A5FA',
      sections:[
        {name:'Defence / Opening', n:158, v:16, type:'declaration'},
        {name:'Narrative / Parable',n:72,  v:17, type:'narrative'},
        {name:'Eschatological',    n:161, v:19, type:'declaration'},
      ],
      total:391, chi2:24.9, p:'6.0×10⁻⁷'
    },
  ];
  const W=360;
  return (
    <svg viewBox={`0 0 ${W} 240`} className="w-full h-full"
         role="img"
         aria-label="Semantic concentration: opening letters appear at higher frequency in declaration verses vs narrative verses in S.50 and S.68.">
      <Defs/>
      <text x={W/2} y="14" fill="#E0B84A" fontSize="10" fontWeight="900"
            textAnchor="middle">SEMANTIC CONCENTRATION — BY VERSE TYPE</text>
      <text x={W/2} y="25" fill="#94ADC8" fontSize="8" textAnchor="middle">
        Opening letter frequency per verse · Declaration vs Narrative sections
      </text>
      {surahs.map((su, si) => {
        const yBase = 36 + si * 96;
        const maxRate = Math.max(...su.sections.map(s=>s.n/s.v));
        return (
          <g key={su.s}>
            <text x="8" y={yBase+12} fill={su.col} fontSize="9.5"
                  fontWeight="900">S.{su.s} ({su.letter})</text>
            <text x="8" y={yBase+24} fill="#5A7A96" fontSize="7.5">
              χ²={su.chi2}  p={su.p}
            </text>
            {su.sections.map((sec, si2) => {
              const rate    = sec.n / sec.v;
              const barW    = (rate/maxRate) * 148;
              const y       = yBase + si2 * 22 + 28;
              const isDecl  = sec.type === 'declaration';
              const barCol  = isDecl ? su.col : '#2A4060';
              const textCol = isDecl ? su.col : '#475569';
              return (
                <g key={si2}>
                  <text x="8" y={y+10} fill={textCol} fontSize="7.5">{sec.name}</text>
                  <rect x="108" y={y} width={barW} height="13" rx="3"
                        fill={barCol}
                        opacity={isDecl?0.9:0.45}
                        style={{filter:isDecl?`drop-shadow(0 0 3px ${barCol})`:'none'}}/>
                  <text x={108+barW+4} y={y+10} fill={textCol}
                        fontSize="8" fontWeight={isDecl?'700':'400'}>
                    {rate.toFixed(1)}/v
                  </text>
                  {isDecl && (
                    <rect x="104" y={y-1} width={barW+8} height="15" rx="3"
                          fill="none" stroke={su.col} strokeWidth="1" opacity=".5"/>
                  )}
                </g>
              );
            })}
            <line x1="8" y1={yBase+94} x2={W-8} y2={yBase+94}
                  stroke="#1E3450" strokeWidth=".8"/>
          </g>
        );
      })}
      <rect x="8" y="224" width={W-16} height="14" rx="4"
            fill="rgba(34,211,238,0.06)" stroke="#22D3EE" strokeWidth=".8"/>
      <text x={W/2} y="233" fill="#22D3EE" fontSize="8" textAnchor="middle"
            fontWeight="700">
        Declaration verses carry 2.15× (S.50) and 2.00× (S.68) more opening-letter density
      </text>
    </svg>
  );
};

export const HawamimHeritageViz = () => {
  const [hov, setHov] = React.useState(null);
  const surahs = [
    { n:40, ar:'غافر',    en:'Al-Ghafir',    meaning:'The Forgiver',             col:'#E0B84A' },
    { n:41, ar:'فصلت',    en:'Fussilat',      meaning:'Explained in Detail',       col:'#22D3EE' },
    { n:42, ar:'الشورى',  en:'Ash-Shura',     meaning:'The Consultation',          col:'#A855F7' },
    { n:43, ar:'الزخرف',  en:'Az-Zukhruf',    meaning:'The Gold Ornaments',        col:'#F43F6E' },
    { n:44, ar:'الدخان',  en:'Ad-Dukhan',     meaning:'The Smoke',                 col:'#60A5FA' },
    { n:45, ar:'الجاثية', en:'Al-Jathiyah',   meaning:'The Crouching',             col:'#34D399' },
    { n:46, ar:'الأحقاف', en:'Al-Ahqaf',      meaning:'The Sand Dunes',            col:'#FBBF24' },
  ];
  const W=480;
  return (
    <svg viewBox={`0 0 ${W} 420`} className="w-full h-full"
         role="img"
         aria-label="Al-Hawamim: seven consecutive surahs 40-46, all beginning with Ha-Mim. Their classical descriptions and thematic unity.">
      <Defs/>

      {/* Title */}
      <text x={W/2} y="20" fill="#E0B84A" fontSize="16" fontWeight="900"
            textAnchor="middle" style={{fontFamily:'serif'}}>
        الحواميم — Al-Hawamim
      </text>
      <text x={W/2} y="36" fill="#94ADC8" fontSize="11" textAnchor="middle">
        Surahs 40–46 · Seven consecutive chapters · All begin with حم
      </text>

      {/* Seven surah blocks */}
      {surahs.map((s, i) => {
        const x   = 16 + i * 64;
        const isH = hov === i;
        return (
          <g key={s.n}
             onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
             style={{cursor:'default'}}>
            {/* Block */}
            <rect x={x} y="50" width="58" height="96" rx="6"
                  fill={isH ? `${s.col}22` : '#1C2D48'}
                  stroke={s.col} strokeWidth={isH?2:1}
                  style={{filter:isH?`drop-shadow(0 0 8px ${s.col}88)`:'none'}}/>
            {/* Surah number */}
            <text x={x+29} y="70" fill={s.col} fontSize="16" fontWeight="900"
                  textAnchor="middle">{s.n}</text>
            {/* Arabic name */}
            <text x={x+29} y="92" fill="#E8EEF6" fontSize="13" textAnchor="middle"
                  style={{fontFamily:'serif'}} fontWeight="700">{s.ar}</text>
            {/* حم badge */}
            <text x={x+29} y="128" fill={s.col} fontSize="20" textAnchor="middle"
                  style={{fontFamily:'serif', filter:isH?`drop-shadow(0 0 6px ${s.col})`:'none'}}>
              حم
            </text>
            {/* Connector arrow to next */}
            {i < 6 && (
              <text x={x+67} y="92" fill="#2A4060" fontSize="14"
                    textAnchor="middle">›</text>
            )}
          </g>
        );
      })}

      {/* Hovered detail */}
      <rect x="12" y="160" width={W-24} height="24" rx="4"
            fill="#152038" stroke="#2A4060" strokeWidth="1"/>
      <text x={W/2} y="176" fill="#94ADC8" fontSize="11" textAnchor="middle">
        {hov !== null
          ? `${surahs[hov].en} — "${surahs[hov].meaning}"`
          : 'Hover a surah to see its name and meaning'}
      </text>

      {/* Tanzil declaration bar */}
      <rect x="12" y="196" width={W-24} height="48" rx="6"
            fill="rgba(34,211,238,0.07)" stroke="#22D3EE" strokeWidth="1"/>
      <text x="24" y="214" fill="#22D3EE" fontSize="12" fontWeight="700">
        All 7 open with:
      </text>
      <text x="24" y="234" fill="#22D3EE" fontSize="14"
            style={{fontFamily:'serif'}}>
        تَنزِيلُ الْكِتَابِ مِنَ اللَّهِ
      </text>
      <text x="24" y="234" fill="#94ADC8" fontSize="11" dy="4">
        "The Revelation of the Book from Allah"
      </text>

      {/* Classical descriptions */}
      {[
        { who:'Ibn Mas\'ud', ar:'دِيباجُ القُرْآن', en1:'Dibaj al-Quran', en2:'The Silk Adornment', col:'#E0B84A' },
        { who:'Ibn Abbas',   ar:'لُبَابُ القُرْآن', en1:'Lubab al-Quran', en2:'The Core Essence',   col:'#60A5FA' },
        { who:"Mis'ar Ibn Kidam", ar:'عَرَائِس', en1:"Ara'is",          en2:'The Brides of the Quran', col:'#C084FC' },
      ].map((d,i) => {
        const y = 252 + i*40;
        return (
          <g key={i}>
            <rect x="12" y={y} width={W-24} height="36" rx="6"
                  fill={`${d.col}0E`} stroke={`${d.col}44`} strokeWidth="1.5"/>
            <text x="24" y={y+16} fill={d.col} fontSize="11" fontWeight="700">{d.who}:</text>
            <text x="24" y={y+31} fill={d.col} fontSize="15"
                  style={{fontFamily:'serif'}}>{d.ar}</text>
            <text x="130" y={y+16} fill={d.col} fontSize="12" fontWeight="700">{d.en1}</text>
            <text x="130" y={y+31} fill="#94ADC8" fontSize="11">{d.en2}</text>
          </g>
        );
      })}

      {/* Source note */}
      <text x={W/2} y="370" fill="#2A4060" fontSize="10" textAnchor="middle">
        Source: Ibn Kathir Tafsir · Abu Ubaid Fada'il al-Quran · SeekersGuidance
      </text>
    </svg>
  );
};

export const HawamimThematicViz = () => {
  const themes = [
    { icon:'📖', title:'Divine Revelation',  desc:'All 7 open with tanzil — This Book is from Allah. Verified: 7/7 carry book-reference in v2.' },
    { icon:'🕊️', title:'Dawah & Mercy',     desc:'Surahs of calling — inviting humanity to belief. Comfort for believers under persecution.' },
    { icon:'⚖️', title:'Divine Justice',    desc:'Both mercy and severity. Day of Judgment. The failure of those who reject.' },
    { icon:'📜', title:'Prophetic History',  desc:'Lessons from Musa, Pharaoh, and earlier nations — pattern of rejection and consequence.' },
    { icon:'🌐', title:'Inimitability',      desc:'Direct address to the challenge: produce something like this Quran. Arabic as the vessel.' },
  ];
  const W=320;
  return (
    <svg viewBox={`0 0 ${W} 250`} className="w-full h-full"
         role="img"
         aria-label="Thematic commonalities across all seven Al-Hawamim surahs: divine revelation, mercy and dawah, justice, prophetic history, and inimitability.">
      <Defs/>
      <text x={W/2} y="13" fill="#E0B84A" fontSize="10.5" fontWeight="900"
            textAnchor="middle">THEMATIC UNITY OF AL-HAWAMIM</text>
      <text x={W/2} y="24" fill="#94ADC8" fontSize="8" textAnchor="middle">
        Five shared themes across all seven surahs · Verified by academic intertextual study
      </text>
      {themes.map((t, i) => {
        const y = 28 + i * 44;
        const cols = ['#E0B84A','#22D3EE','#F43F6E','#60A5FA','#34D399'];
        const col  = cols[i];
        return (
          <g key={i}>
            <rect x="6" y={y} width={W-12} height="40" rx="6"
                  fill={`${col}0C`} stroke={`${col}44`} strokeWidth="1"/>
            {/* Number badge */}
            <circle cx="22" cy={y+20} r="11" fill={`${col}22`} stroke={col} strokeWidth="1"/>
            <text x="22" y={y+24} fill={col} fontSize="9" textAnchor="middle"
                  fontWeight="900">{i+1}</text>
            {/* Theme title */}
            <text x="40" y={y+14} fill={col} fontSize="9" fontWeight="700">{t.title}</text>
            {/* Description — two lines with padding from bottom */}
            <text x="40" y={y+25} fill="#94ADC8" fontSize="7.5">{t.desc.slice(0,52)}</text>
            <text x="40" y={y+35} fill="#94ADC8" fontSize="7.5">{t.desc.slice(52)}</text>
          </g>
        );
      })}
    </svg>
  );
};

export const HawamimMathBridgeViz = () => {
  const W=480;
  return (
    <svg viewBox={`0 0 ${W} 280`} className="w-full h-full"
         role="img"
         aria-label="Mathematical and spiritual bridge: Al-Hawamim connects classical scholarly heritage with the computational findings of this analysis.">
      <Defs/>
      <text x={W/2} y="13" fill="#E0B84A" fontSize="10.5" fontWeight="900"
            textAnchor="middle">HERITAGE MEETS COMPUTATION</text>
      <text x={W/2} y="24" fill="#94ADC8" fontSize="8" textAnchor="middle">
        What 1,400 years of scholarship described — confirmed by exact statistics
      </text>

      {/* Two columns: classical vs computational */}
      {/* Dividing line */}
      <line x1={W/2} y1="32" x2={W/2} y2="240" stroke="#2A4060" strokeWidth="1" strokeDasharray="3,5"/>

      {/* Classical column */}
      <text x={W/4} y="40" fill="#E0B84A" fontSize="9" textAnchor="middle" fontWeight="700">
        Classical Heritage
      </text>
      {[
        '"Essence of the Quran"',
        '"Silk Adornment"',
        '"Brides of the Quran"',
        '"Luxurious Gardens"',
        '7 consecutive surahs',
        'All Makki period',
        'Night battle password حم',
      ].map((t,i)=>(
        <g key={i}>
          <circle cx="16" cy={50+i*23} r="3" fill="#E0B84A" opacity=".7"/>
          <text x="22" y={54+i*23} fill="#94ADC8" fontSize="7.8">{t}</text>
        </g>
      ))}

      {/* Computational column */}
      <text x={3*W/4} y="40" fill="#22D3EE" fontSize="9" textAnchor="middle" fontWeight="700">
        Computational Proof
      </text>
      {[
        'p ≈ 2.6×10⁻⁹ consecutive',
        'CV = 0.622% (Mim/Ha)',
        'Book-ref: 7/7 (100%)',
        'Echo lift: 0.807–1.069',
        'Mim/Ha mean = 3.407',
        'Canonical + revelation ✓',
        'Mahalanobis confirmed',
      ].map((t,i)=>(
        <g key={i}>
          <circle cx={W/2+8} cy={50+i*23} r="3" fill="#22D3EE" opacity=".7"/>
          <text x={W/2+14} y={54+i*23} fill="#94ADC8" fontSize="7.5">{t}</text>
        </g>
      ))}

      {/* Bridge arrows */}
      {[0,2,4].map(i=>(
        <g key={i}>
          <line x1={W/2-4} y1={50+i*23} x2={W/2+4} y2={50+i*23}
                stroke="#E0B84A" strokeWidth="1.5" opacity=".5"/>
          <polygon points={`${W/2+1},${50+i*23-3} ${W/2+1},${50+i*23+3} ${W/2+5},${50+i*23}`}
                   fill="#E0B84A" opacity=".5"/>
        </g>
      ))}

      {/* Bottom summary */}
      <rect x="6" y="224" width={W-12} height="36" rx="4"
            fill="rgba(224,184,74,0.08)" stroke="#E0B84A" strokeWidth="1"/>
      <text x={W/2} y="240" fill="#E0B84A" fontSize="8.5" textAnchor="middle" fontWeight="700">
        Every classical description has a corresponding mathematical signature.
      </text>
      <text x={W/2} y="252" fill="#94ADC8" fontSize="7.5" textAnchor="middle">
        Source: Ibn Kathir · Abu Ubaid Qasim Ibn Sallam · Fada'il al-Quran
      </text>
    </svg>
  );
};

export const BrainwaveViz = () => {
  const waves = [
    { name:'Delta',  range:'0.5–4',  col:'#3B82F6', pct:8,  state:'Deep sleep · Cellular repair',          quran:false },
    { name:'Theta',  range:'4–8',    col:'#8B5CF6', pct:24, state:'Meditation · Creativity · Positive emotion', quran:true },
    { name:'Alpha',  range:'8–13',   col:'#34D399', pct:62, state:'Relaxed alertness · Calm focus · Reduced anxiety', quran:true },
    { name:'Beta',   range:'14–26',  col:'#F59E0B', pct:35, state:'Active thinking · External focus',        quran:false },
    { name:'Gamma',  range:'30–80',  col:'#EC4899', pct:18, state:'High cognition · Perception binding',     quran:false },
  ];
  const W=480, H=280;
  return (
    <svg viewBox={`0 0 ${W*1.15} ${(H+40)*1.15}`} className="w-full h-full"
         role="img"
         aria-label="Brainwave spectrum. Alpha (8-13 Hz) and Theta (4-8 Hz) increase significantly during Quranic recitation per 22 peer-reviewed EEG studies.">
      <Defs/>
      <g transform="scale(1.15)">
      <text x={W/2} y="20" fill="#E0B84A" fontSize="16" fontWeight="900"
            textAnchor="middle">BRAINWAVE SPECTRUM — EEG EVIDENCE</text>
      <text x={W/2} y="38" fill="#94ADC8" fontSize="11" textAnchor="middle">
        22 peer-reviewed studies · PMC systematic review 2022 · Effect in non-Muslims confirmed
      </text>

      {waves.map((w, i) => {
        const y   = 50 + i * 46;
        const bW  = (w.pct/100) * 300;
        return (
          <g key={w.name}>
            {/* Band label */}
            <text x="10" y={y+18} fill={w.col} fontSize="14" fontWeight="900">{w.name}</text>
            <text x="10" y={y+34} fill="#5A7A96" fontSize="11">{w.range} Hz</text>

            {/* Bar */}
            <rect x="90" y={y+2} width="300" height="36" rx="6" fill="#1C2D48"/>
            <rect x="90" y={y+2} width={bW} height="36" rx="6" fill={w.col} opacity=".8"
                  style={{filter: w.quran ? `drop-shadow(0 0 6px ${w.col})` : 'none'}}/>

            {/* State label */}
            <text x="96" y={y+16} fill={w.quran ? '#0C1628' : '#94ADC8'}
                  fontSize="11" fontWeight={w.quran?'700':'400'}>{w.state.split('·')[0]}</text>
            <text x="96" y={y+30} fill={w.quran ? '#0C1628' : '#5A7A96'}
                  fontSize="10" opacity=".9">{w.state.split('·').slice(1).join('·')}</text>

            {/* Quran badge */}
            {w.quran && (
              <g>
                <rect x="400" y={y+8} width="60" height="20" rx="4"
                      fill={w.col} opacity=".9"/>
                <text x="430" y={y+22} fill="#0C1628" fontSize="11"
                      textAnchor="middle" fontWeight="900">↑ QURAN</text>
              </g>
            )}
          </g>
        );
      })}
      </g>


      {/* Key numbers */}
      <rect x="10" y="286" width={W-20} height="34" rx="6"
            fill="rgba(52,211,153,0.08)" stroke="#34D399" strokeWidth="1"/>
      <text x="20" y="302" fill="#34D399" fontSize="12" fontWeight="700">
        Alpha: +12.67% Quran vs +9.96% classical music (p=0.001)
      </text>
      <text x="20" y="316" fill="#8B5CF6" fontSize="12" fontWeight="700">
        Theta: confirmed increase · Frontal-medial theta = meditation signature
      </text>
    </svg>
  );
};

export const ResonanceBodyViz = () => {
  const W=480, H=420;
  // Letters grouped by where they physically resonate in the body
  const zones = [
    {
      zone:'Nasal Cavity & Sinuses',
      freq:'250–400 Hz',
      letters:['م','ن'],
      col:'#22D3EE',
      y:48,
      detail:'Bilabial + dental nasals. Velum opens, vibration enters nasal cavity and paranasal sinuses. F1: 305–369 Hz matches nasal resonance at ~250 Hz. (Source: PMC vocal tract resonance, UW Phonetics Lab)',
      icon:'👃',
    },
    {
      zone:'Pharyngeal Cavity',
      freq:'400–800 Hz',
      letters:['ع','ح','ه'],
      col:'#A855F7',
      y:140,
      detail:'Pharyngeal consonants. Constriction in pharynx creates resonance in throat chamber. F1: 687 Hz. Strong subjective sensation in upper chest and throat. (Source: ASHA resonance classification)',
      icon:'🗣️',
    },
    {
      zone:'Uvular / Deep Skull',
      freq:'600–900 Hz',
      letters:['ق','ك'],
      col:'#F43F6E',
      y:232,
      detail:'Uvular stop (ق) produces resonance at skull base. Most posterior makhraj — deepest point of the vocal tract. F1: 687 Hz, F2: 1080 Hz (emphatic correction). (Source: Alghamdi 1998, our computation)',
      icon:'🧠',
    },
    {
      zone:'Full Oral Tract',
      freq:'500–2500 Hz',
      letters:['ا','ل','ر','ي','ص','ط','س','ك'],
      col:'#E0B84A',
      y:324,
      detail:'Oral resonators. Tongue + cavity shape modulates F1/F2. Wide frequency range. The broadest coverage — consistent with phonetic completeness finding. (Source: our acoustic analysis)',
      icon:'👄',
    },
  ];

  return (
    <svg viewBox={`0 0 ${W*1.15} ${H*1.15}`} className="w-full h-full"
         role="img"
         aria-label="Physical resonance zones of the 14 Muqattaat letters in the human vocal tract and body.">
      <Defs/>
      <g transform="scale(1.15)">
      <text x={W/2} y="20" fill="#E0B84A" fontSize="16" fontWeight="900"
            textAnchor="middle">PHYSICAL RESONANCE ZONES</text>
      <text x={W/2} y="36" fill="#94ADC8" fontSize="11" textAnchor="middle">
        Where each Muqattaat letter physically vibrates in the human body
      </text>

      {zones.map((z, i) => (
        <g key={i}>
          <rect x="12" y={z.y} width={W-24} height="80" rx="8"
                fill={`${z.col}0C`} stroke={`${z.col}44`} strokeWidth="1.5"/>
          {/* Zone header */}
          <text x="24" y={z.y+20} fill={z.col} fontSize="14" fontWeight="900">
            {z.zone}
          </text>
          <text x="24" y={z.y+36} fill="#5A7A96" fontSize="11">
            Physical resonance: {z.freq}
          </text>
          {/* Letters */}
          {z.letters.map((l, li) => (
            <text key={li} x={290+li*18} y={z.y+28} fill={z.col}
                  fontSize="20" textAnchor="middle"
                  style={{fontFamily:'serif', filter:`drop-shadow(0 0 5px ${z.col})`}}
                  fontWeight="900">{l}</text>
          ))}
          {/* Detail */}
          <text x="24" y={z.y+55} fill="#94ADC8" fontSize="10">
            {z.detail.slice(0, 80)}
          </text>
          <text x="24" y={z.y+70} fill="#94ADC8" fontSize="10">
            {z.detail.slice(80, 180)}
          </text>
        </g>
      ))}
      </g>
    </svg>
  );
};

export const TeslaFrameworkViz = () => {
  const W=320;
  return (
    <svg viewBox={`0 0 ${W*1.15} ${270*1.15}`} className="w-full h-full"
         role="img"
         aria-label="Tesla framework: what is verified, what are the mechanisms, and what remains to be tested. Honest scientific framing of frequency, vibration, and energy in Quranic recitation.">
      <Defs/>
      <g transform="scale(1.15)">
      <text x={W/2} y="13" fill="#E0B84A" fontSize="10.5" fontWeight="900"
            textAnchor="middle">FREQUENCY · VIBRATION · ENERGY</text>
      <text x={W/2} y="24" fill="#94ADC8" fontSize="8" textAnchor="middle">
        Tesla: "Think in terms of energy, frequency and vibration"
      </text>

      {/* Three layers */}
      {[
        {
          level: '✓ CONFIRMED SCIENCE',
          col: '#34D399',
          y: 32,
          items: [
            'Alpha brainwaves increase 12.67% during recitation (p=0.001)',
            'Theta brainwaves increase — meditation state confirmed',
            'Effect in non-Muslims: not belief/placebo — acoustic in nature',
            'Tajweed Medd (elongation) activates vagus nerve → calm state',
            '22 peer-reviewed EEG studies (systematic review PMC 2022)',
          ]
        },
        {
          level: '~ ACOUSTIC PHYSICS (Solid, not yet Quran-specific)',
          col: '#E0B84A',
          y: 120,
          items: [
            'م ن (nasal letters): vibrate nasal cavity at 250–400 Hz',
            'ق (uvular): resonates at skull base — deepest vocal tract point',
            'ع ح (pharyngeal): vibrate pharynx, felt in upper chest/throat',
            'Tajweed rules fix vowel durations — standardised vibration',
          ]
        },
        {
          level: '? OPEN FRONTIER (Not yet tested)',
          col: '#F43F6E',
          y: 212,
          items: [
            'Do specific Muqattaat letters produce different brainwave patterns?',
            'Does Hz of individual phonemes influence physiology directly?',
          ]
        },
      ].map((layer, i) => (
        <g key={i}>
          <rect x="6" y={layer.y} width={W-12} height={layer.y===212?50:84} rx="5"
                fill={`${layer.col}0A`} stroke={`${layer.col}44`} strokeWidth="1"/>
          <rect x="6" y={layer.y} width={W-12} height="14" rx="5"
                fill={`${layer.col}22`}/>
          <text x="12" y={layer.y+11} fill={layer.col} fontSize="8.5" fontWeight="900">
            {layer.level}
          </text>
          {layer.items.map((item, j) => (
            <g key={j}>
              <circle cx="14" cy={layer.y+24+j*14} r="2.5" fill={layer.col} opacity=".7"/>
              <text x="20" y={layer.y+28+j*14} fill="#94ADC8" fontSize="7.8">{item}</text>
            </g>
          ))}
        </g>
      ))}

      {/* Critical distinction note */}
      <rect x="6" y="266" width={W-12} height="1" fill="#1E3450"/>
      </g>
    </svg>
  );
};

export const MakhrajViz = () => {
  const [hov, setHov] = React.useState(null);
  return (
    <svg viewBox="0 0 320 260" className="w-full h-full"
         role="img" aria-label="16 classical makhraj regions. 8 fully covered (green), 4 partial (gold), 4 absent (red).">
      <Defs/>
      <text x="146" y="13" fill="#E0B84A" fontSize="10" fontWeight="900"
            textAnchor="middle" letterSpacing="1">16 CLASSICAL MAKHRAJ · SIBAWAYHI ~786 CE</text>
      <text x="146" y="24" fill="#94ADC8" fontSize="8" textAnchor="middle">
        Ibn al-Jazari Al-Nashr ~1400 CE · Undisputed classical authority
      </text>
      {MAKHRAJ_DATA.map((mk, i) => {
        const col = i < 8 ? 0 : 1;
        const row = i < 8 ? i : i - 8;
        const x   = col === 0 ? 4 : 150;
        const y   = 30 + row * 26;
        const c2  = MK_STATUS_COL[mk.status];
        const isH = hov === i;
        return (
          <g key={mk.id} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}>
            <rect x={x} y={y} width="138" height="21" rx="4"
                  fill={isH ? '#1C2D48' : '#152038'}
                  stroke={isH ? c2 : '#2A4060'} strokeWidth={isH ? 1.5 : 0.5}/>
            <circle cx={x+9} cy={y+10} r="5" fill={c2}
                    style={{filter: mk.status==='FULL' ? `drop-shadow(0 0 4px ${c2})` : 'none'}}/>
            <text x={x+18} y={y+14} fill={isH ? c2 : '#94ADC8'} fontSize="8"
                  fontWeight={isH ? '700' : '400'}>{mk.name}</text>
            {mk.muq.map((l, li) => (
              <text key={`m${li}`} x={x+103+(li*12)} y={y+14}
                    fill={c2} fontSize="11" textAnchor="middle"
                    fontWeight="700"
                    style={{fontFamily:'serif', filter: mk.status==='FULL' ? `drop-shadow(0 0 3px ${c2})` : 'none'}}>{l}</text>
            ))}
            {mk.letters.filter(l=>!mk.muq.includes(l)).map((l, li) => (
              <text key={`a${li}`} x={x+103+(mk.muq.length*12)+(li*12)} y={y+14}
                    fill="#475569" fontSize="11" textAnchor="middle"
                    style={{fontFamily:'serif'}}>{l}</text>
            ))}
          </g>
        );
      })}
      <line x1="4" y1="241" x2="288" y2="241" stroke="#2A4060" strokeWidth="0.5"/>
      <g transform="translate(4,244)">
        {[['FULL','Fully Covered'],['PARTIAL','Partial'],['ABSENT','Absent']].map(([s,l],i) => (
          <g key={s} transform={`translate(${i*94},0)`}>
            <circle cx="5" cy="4" r="4" fill={MK_STATUS_COL[s]}/>
            <text x="13" y="8" fill="#5A7A96" fontSize="8">{l}</text>
          </g>
        ))}
        <text x="288" y="8" fill="#C084FC" fontSize="8.5" textAnchor="end" fontWeight="700">
          Top 0.34% of 40.1M subsets
        </text>
      </g>
    </svg>
  );
};

export const MakhrajDistChart = () => {
  const dist = [
    {s:2,n:61263},{s:3,n:1095849},{s:4,n:5828033},{s:5,n:12703885},
    {s:6,n:12769140},{s:7,n:6138798},{s:8,n:1382079},{s:9,n:133143},
    {s:10,n:4385},{s:11,n:25},
  ];
  const W=480, H=220, PL=46, PR=12, PT=40, PB=50;
  const gW=W-PL-PR, gH=H-PT-PB;
  const max = 12769140;
  const bW  = gW / dist.length * 0.72;
  const gx  = i => PL + (i+0.5)*gW/dist.length;
  const gh  = n => (n/max)*gH;
  return (
    <svg viewBox={`0 0 ${W} ${H+32}`} className="w-full h-full"
         role="img" aria-label="Distribution of fully-covered makhraj scores across 40,116,600 subsets. Muqattaat bar at score 8 is highlighted.">
      <Defs/>
      <text x={W/2} y="13" fill="#E0B84A" fontSize="10" fontWeight="900" textAnchor="middle">
        FULLY-COVERED SCORE DISTRIBUTION
      </text>
      <text x={W/2} y="23" fill="#94ADC8" fontSize="8" textAnchor="middle">
        All 40,116,600 C(28,14) subsets · Exhaustive enumeration
      </text>
      <line x1={PL} y1={PT}    x2={PL}    y2={PT+gH} stroke="#3A5A80" strokeWidth="1.5"/>
      <line x1={PL} y1={PT+gH} x2={PL+gW} y2={PT+gH} stroke="#3A5A80" strokeWidth="1.5"/>
      {[0,.25,.5,.75,1].map((v,i) => (
        <g key={i}>
          <line x1={PL} y1={PT+gH-v*gH} x2={PL+gW} y2={PT+gH-v*gH}
                stroke="#1E3450" strokeWidth="1" strokeDasharray="3,6"/>
          <text x={PL-4} y={PT+gH-v*gH+4} fill="#475569" fontSize="8" textAnchor="end">
            {v===0?'0':v===1?'12.8M':`${(v*12.8).toFixed(0)}M`}
          </text>
        </g>
      ))}
      {dist.map((d,i) => {
        const x  = gx(i) - bW/2;
        const h  = gh(d.n);
        const isM = d.s === 8;
        return (
          <g key={i}>
            <rect x={x} y={PT+gH-h} width={bW} height={h}
                  fill={isM ? '#34D399' : '#60A5FA'}
                  stroke={isM ? '#34D399' : '#3B82F6'}
                  strokeWidth={isM ? 2 : 0.8} rx="2" opacity={isM ? 1 : 0.6}
                  style={{filter: isM ? 'drop-shadow(0 0 6px #34D399)' : 'none'}}/>
            {isM && (
              <g>
                <polygon points={`${gx(i)-4},${PT+gH-h-14} ${gx(i)+4},${PT+gH-h-14} ${gx(i)},${PT+gH-h-8}`}
                         fill="#34D399"/>
                <rect x={gx(i)-30} y={PT+gH-h-30} width={60} height={13}
                      rx="3" fill="#1C2D48" stroke="#34D399" strokeWidth="1"/>
                <text x={gx(i)} y={PT+gH-h-21}
                      fill="#34D399" fontSize="8" textAnchor="middle" fontWeight="700">
                  MUQATTAAT
                </text>
              </g>
            )}
            <text x={gx(i)} y={PT+gH+11} fill={isM?'#34D399':'#475569'}
                  fontSize={isM?9:8} textAnchor="middle" fontWeight={isM?'700':'400'}>{d.s}</text>
          </g>
        );
      })}
      <text x={PL+gW/2} y={PT+gH+23} fill="#94ADC8" fontSize="8" textAnchor="middle">
        Makhraj regions fully covered
      </text>
      <rect x={PL+gW-128} y={PT-20} width={128} height={37} rx="4"
            fill="#1C2D48" stroke="#34D399" strokeWidth="1" strokeOpacity=".7"/>
      <text x={PL+gW-7} y={PT-8} fill="#34D399" fontSize="8.5" textAnchor="end" fontWeight="700">
        Score 8: 1,382,079 subsets
      </text>
      <text x={PL+gW-7} y={PT+2} fill="#94ADC8" fontSize="8" textAnchor="end">
        137,553 score higher
      </text>
      <text x={PL+gW-7} y={PT+12} fill="#C084FC" fontSize="8" textAnchor="end" fontWeight="700">
        Muqattaat = Top 0.343%
      </text>
    </svg>
  );
};

export const SymmetryViz = () => {
  const MUQ  = ['ا','ل','م','ص','ر','ك','ه','ي','ع','ط','س','ح','ق','ن'];
  const COMP = ['ب','ت','ث','ج','خ','د','ذ','ز','ش','ض','ظ','غ','ف','و'];
  return (
    <svg viewBox="0 0 320 232" className="w-full h-full"
         role="img" aria-label="Complement symmetry theorem: fully covered(S) + distinct(complement) = 16 always. Muqattaat scores 20, complement scores 12, sum = 32.">
      <Defs/>
      <text x="146" y="14" fill="#E0B84A" fontSize="11" fontWeight="900" textAnchor="middle">
        COMPLEMENT SYMMETRY THEOREM
      </text>
      <text x="146" y="25" fill="#94ADC8" fontSize="8.5" textAnchor="middle">
        For any 14-subset S and its complement Sc (also 14 letters):
      </text>
      <rect x="28" y="30" width="236" height="20" rx="5"
            fill="rgba(34,211,238,0.08)" stroke="#22D3EE" strokeWidth="1.2"/>
      <text x="146" y="44" fill="#22D3EE" fontSize="10" fontWeight="900" textAnchor="middle">
        fully_covered(S) + distinct(Sc) = 16 always
      </text>
      <rect x="8" y="56" width="130" height="104" rx="8"
            fill="rgba(52,211,153,0.05)" stroke="#34D399" strokeWidth="1.5"/>
      <text x="73" y="71" fill="#34D399" fontSize="9" fontWeight="900" textAnchor="middle">S = Muqattaat</text>
      <text x="73" y="87" fill="#34D399" fontSize="16" textAnchor="middle"
            style={{fontFamily:'serif'}}>
        {MUQ.slice(0,7).join(' ')}
      </text>
      <text x="73" y="103" fill="#34D399" fontSize="16" textAnchor="middle"
            style={{fontFamily:'serif'}}>
        {MUQ.slice(7).join(' ')}
      </text>
      <text x="73" y="119" fill="#34D399" fontSize="8.5" textAnchor="middle" fontWeight="700">fully_covered = 8</text>
      <text x="73" y="130" fill="#22D3EE" fontSize="8" textAnchor="middle">distinct reached = 12</text>
      <rect x="20" y="135" width="106" height="16" rx="4"
            fill="rgba(52,211,153,0.13)" stroke="#34D399" strokeWidth="1"/>
      <text x="73" y="147" fill="#34D399" fontSize="9" textAnchor="middle" fontWeight="700">composite = 20</text>
      <rect x="154" y="56" width="130" height="104" rx="8"
            fill="rgba(244,63,110,0.05)" stroke="#F43F6E" strokeWidth="1.5"/>
      <text x="219" y="71" fill="#F43F6E" fontSize="9" fontWeight="900" textAnchor="middle">Sc = Complement</text>
      <text x="219" y="87" fill="#5A7A96" fontSize="16" textAnchor="middle"
            style={{fontFamily:'serif'}}>
        {COMP.slice(0,7).join(' ')}
      </text>
      <text x="219" y="103" fill="#5A7A96" fontSize="16" textAnchor="middle"
            style={{fontFamily:'serif'}}>
        {COMP.slice(7).join(' ')}
      </text>
      <text x="219" y="119" fill="#F43F6E" fontSize="8.5" textAnchor="middle" fontWeight="700">fully_covered = 4</text>
      <text x="219" y="130" fill="#22D3EE" fontSize="8" textAnchor="middle">distinct reached = 8</text>
      <rect x="166" y="135" width="106" height="16" rx="4"
            fill="rgba(244,63,110,0.13)" stroke="#F43F6E" strokeWidth="1"/>
      <text x="219" y="147" fill="#F43F6E" fontSize="9" textAnchor="middle" fontWeight="700">composite = 12</text>
      <text x="146" y="112" fill="#5A7A96" fontSize="24" textAnchor="middle" fontWeight="900">+</text>
      <line x1="28" y1="168" x2="264" y2="168" stroke="#3A5A80" strokeWidth="1"/>
      <rect x="82" y="173" width="128" height="22" rx="5"
            fill="rgba(224,184,74,0.1)" stroke="#E0B84A" strokeWidth="1.5"/>
      <text x="146" y="188" fill="#E0B84A" fontSize="12" textAnchor="middle" fontWeight="900">
        20 + 12 = 32 = 2 x 16
      </text>
      <text x="146" y="208" fill="#94ADC8" fontSize="8.5" textAnchor="middle">
        Proven for all 40,116,600 complementary pairs
      </text>
      <text x="146" y="221" fill="#C084FC" fontSize="8" textAnchor="middle">
        Proof: every fully-covered region in S is fully absent in Sc
      </text>
    </svg>
  );
};

export const ContingencyViz = () => {
  const muqRate    = (25/29*100).toFixed(1);
  const nonMuqRate = (18/85*100).toFixed(1);
  const W=320, H=230;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full"
         role="img"
         aria-label={`2x2 contingency table. Muqattaat: 25 of 29 positive (${muqRate}%). Non-Muqattaat: 18 of 85 positive (${nonMuqRate}%). Fisher exact p = 6.03e-10.`}>
      <Defs/>
      <text x={W/2} y="15" fill="#E0B84A" fontSize="10" fontWeight="900"
            textAnchor="middle" letterSpacing="1">INTERTEXTUAL BRIDGE — 2×2 VERIFIED TABLE</text>
      <text x={W/2} y="26" fill="#94ADC8" fontSize="8" textAnchor="middle">
        Independent verification: DeepSeek · All 114 surahs · Exact counts
      </text>
      {/* Column headers */}
      <text x="170" y="42" fill="#34D399" fontSize="9" textAnchor="middle" fontWeight="700">Book-Ref ✓</text>
      <text x="245" y="42" fill="#F43F6E" fontSize="9" textAnchor="middle" fontWeight="700">No Ref ✗</text>
      {/* Row headers */}
      <text x="14" y="75"  fill="#E0B84A" fontSize="9" fontWeight="700">Muqattaat</text>
      <text x="14" y="76"  fill="#94ADC8" fontSize="7">(29 surahs)</text>
      <text x="14" y="130" fill="#94ADC8" fontSize="9" fontWeight="700">Non-Muqattaat</text>
      <text x="14" y="141" fill="#5A7A96" fontSize="7">(85 surahs)</text>
      {/* Cells */}
      {[
        { x:130, y:52, w:72, h:42, val:'25', pct:`${muqRate}%`,    col:'#34D399', bg:'rgba(52,211,153,0.12)' },
        { x:205, y:52, w:72, h:42, val:'4',  pct:'13.8%',          col:'#F43F6E', bg:'rgba(244,63,110,0.08)' },
        { x:130, y:96, w:72, h:42, val:'18', pct:`${nonMuqRate}%`, col:'#60A5FA', bg:'rgba(96,165,250,0.08)' },
        { x:205, y:96, w:72, h:42, val:'67', pct:'78.8%',          col:'#475569', bg:'rgba(71,85,105,0.12)'  },
      ].map((cell,i) => (
        <g key={i}>
          <rect x={cell.x} y={cell.y} width={cell.w} height={cell.h} rx="6"
                fill={cell.bg} stroke={cell.col} strokeWidth="1.5"/>
          <text x={cell.x+cell.w/2} y={cell.y+17} fill={cell.col}
                fontSize="20" fontWeight="900" textAnchor="middle">{cell.val}</text>
          <text x={cell.x+cell.w/2} y={cell.y+32} fill={cell.col}
                fontSize="9" textAnchor="middle" opacity=".8">{cell.pct}</text>
        </g>
      ))}
      {/* Dividers */}
      <line x1="128" y1="50" x2="279" y2="50" stroke="#2A4060" strokeWidth="1"/>
      <line x1="128" y1="94" x2="279" y2="94" strokeWidth="1" stroke="#2A4060"/>
      <line x1="128" y1="139" x2="279" y2="139" stroke="#2A4060" strokeWidth="1"/>
      <line x1="128" y1="50" x2="128" y2="139" stroke="#2A4060" strokeWidth="1"/>
      <line x1="203" y1="50" x2="203" y2="139" stroke="#2A4060" strokeWidth="1"/>
      {/* Rate comparison bars */}
      <text x="14" y="158" fill="#94ADC8" fontSize="8.5">Rate comparison:</text>
      {[
        { label:'Muqattaat', pct:86.2, col:'#E0B84A', y:167 },
        { label:'Non-Muqattaat', pct:21.2, col:'#60A5FA', y:184 },
      ].map(({label,pct,col,y}) => (
        <g key={label}>
          <text x="14" y={y+9} fill={col} fontSize="8" fontWeight="700">{label}</text>
          <rect x="100" y={y} width="160" height="13" rx="3" fill="#1C2D48"/>
          <rect x="100" y={y} width={pct/100*160} height="13" rx="3" fill={col} opacity=".85"
                style={{filter:`drop-shadow(0 0 4px ${col}88)`}}/>
          <text x={100+pct/100*160+4} y={y+10} fill={col} fontSize="8.5" fontWeight="700">{pct}%</text>
        </g>
      ))}
      {/* Stats */}
      <rect x="14" y="202" width="262" height="22" rx="5"
            fill="rgba(224,184,74,0.08)" stroke="#E0B84A" strokeWidth="1"/>
      <text x={W/2} y="211" fill="#E0B84A" fontSize="8.5" textAnchor="middle" fontWeight="700">
        Odds Ratio = 23.26
      </text>
      <text x={W/2} y="221" fill="#94ADC8" fontSize="8" textAnchor="middle">
        Fisher Exact p = 6.03 × 10⁻¹⁰  ·  4.07× more likely than non-Muqattaat
      </text>
    </svg>
  );
};

export const IntertextualTimelineViz = () => {
  const W=576, H=320;
  const allSurahs = Array.from({length:114},(_,i)=>i+1);
  const muqSet    = new Set([2,3,7,10,11,12,13,14,15,19,20,26,27,28,29,30,31,32,36,38,40,41,42,43,44,45,46,50,68]);
  const muqPos    = new Set([2,3,7,10,11,12,13,14,15,20,26,27,28,29,30,31,32,36,38,40,41,42,43,44,45,46,50]);
  const muqExc    = new Set([19,29,30,68]);
  const nonMuqPos = new Set([8,16,17,18,24,25,33,34,39,47,52,54,55,59,62,72,97,98]);
  const sx = i => 16 + (i/114)*516;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full"
         role="img"
         aria-label="Timeline of all 114 surahs. Gold: Muqattaat with book-ref. Red dots: Muqattaat exceptions. Blue: non-Muqattaat with book-ref. Grey: neither.">
      <Defs/>
      <text x={W/2} y="20" fill="#E0B84A" fontSize="16" fontWeight="900"
            textAnchor="middle">ALL 114 SURAHS — PATTERN MAP</text>
      <text x={W/2} y="38" fill="#94ADC8" fontSize="11" textAnchor="middle">
        Each column = one surah · Sorted by canonical order
      </text>
      {/* Decade markers */}
      {[1,20,40,60,80,100,114].map(n => (
        <g key={n}>
          <line x1={sx(n-1)} y1="46" x2={sx(n-1)} y2="52" stroke="#2A4060" strokeWidth="1.5"/>
          <text x={sx(n-1)} y="64" fill="#475569" fontSize="10" textAnchor="middle">{n}</text>
        </g>
      ))}
      {/* Surah bars */}
      {allSurahs.map((s,i) => {
        const x   = sx(i);
        const isMuq    = muqSet.has(s);
        const isMuqPos = muqPos.has(s);
        const isMuqExc = muqExc.has(s);
        const isNonPos = nonMuqPos.has(s);
        let col, h2, glow;
        if(isMuqPos)  { col='#E0B84A'; h2=95; glow=`drop-shadow(0 0 5px #E0B84A)`; }
        else if(isMuqExc){ col='#F43F6E'; h2=65; glow=`drop-shadow(0 0 4px #F43F6E)`; }
        else if(isNonPos){ col='#60A5FA'; h2=50; glow=`drop-shadow(0 0 3px #60A5FA)`; }
        else             { col='#1C2D48'; h2=26; glow='none'; }
        return (
          <rect key={s} x={x-1.5} y={72+95-h2} width="3" height={h2} rx="1.5"
                fill={col} style={{filter:glow}} opacity={isMuq?1:0.75}/>
        );
      })}
      {/* Legend */}
      <g transform="translate(16,190)">
        {[
          ['#E0B84A','Muqattaat + book-ref (25 surahs)'],
          ['#F43F6E','Muqattaat — no book-ref (4 surahs)'],
          ['#60A5FA','Non-Muqattaat + book-ref (18 surahs)'],
          ['#1C2D48','Non-Muqattaat — no ref (67 surahs)'],
        ].map(([col,label],i) => (
          <g key={i} transform={`translate(${(i%2)*210}, ${Math.floor(i/2)*24})`}>
            <rect width="14" height="14" rx="3" fill={col} stroke={col} strokeWidth="1.5"
                  style={{filter:`drop-shadow(0 0 3px ${col}88)`}}/>
            <text x="22" y="11" fill="#94ADC8" fontSize="11">{label}</text>
          </g>
        ))}
      </g>
      {/* Key insight */}
      <rect x="16" y="244" width="514" height="70" rx="8"
            fill="#1C2D48" stroke="#E0B84A" strokeWidth="1.5" strokeOpacity=".5"/>
      <text x={W/2} y="262" fill="#E0B84A" fontSize="13" textAnchor="middle" fontWeight="700">
        The Pattern in Plain Language
      </text>
      <text x={W/2} y="280" fill="#94ADC8" fontSize="11" textAnchor="middle">
        When a surah opens with Muqattaat letters, the very next breath
      </text>
      <text x={W/2} y="294" fill="#94ADC8" fontSize="11" textAnchor="middle">
        declares divine revelation — 4× more often than surahs without them.
      </text>
      <text x={W/2} y="308" fill="#22D3EE" fontSize="11.5" textAnchor="middle" fontWeight="700">
        The letters say: these are Arabic letters. Next verse: this is the Book.
      </text>
    </svg>
  );
};

export const ExceptionsViz = () => {
  const exceptions = [
    { s:19, arabic:'كهيعص', opening:`ذِكْرُ رَحْمَتِ رَبِّكَ`, eng:`A mention of the mercy of your Lord to His servant Zakariyya`, mode:`MERCY`, col:'#C084FC' },
    { s:29, arabic:'الم',   opening:`أَحَسِبَ النَّاسُ أَن يُتْرَكُوا`, eng:`Do people think they will be left just saying we believe`, mode:`CHALLENGE`, col:'#F43F6E' },
    { s:30, arabic:'الم',   opening:`غُلِبَتِ الرُّومُ`, eng:`The Romans have been defeated`, mode:`GEOPOLITICAL`, col:'#60A5FA' },
    { s:68, arabic:'ن',     opening:`مَا أَنتَ بِنِعْمَةِ رَبِّكَ بِمَجْنُونٍ`, eng:`You are not, by your Lord's grace, a madman`, mode:`DEFENCE`, col:'#FBBF24' },
  ];
  return (
    <svg viewBox="0 0 480 380" className="w-full h-full"
         role="img"
         aria-label="The 4 Muqattaat surahs without book-reference in verse 2. All open in defence, challenge, or mercy mode — not declaration mode.">
      <Defs/>
      <text x="240" y="20" fill="#E0B84A" fontSize="16" fontWeight="900"
            textAnchor="middle">THE 4 EXCEPTIONS — THEY PROVE THE RULE</text>
      <text x="240" y="38" fill="#94ADC8" fontSize="11" textAnchor="middle">
        All 4 open in a different mode — not declaration. The rule holds where it should.
      </text>
      {exceptions.map((ex, i) => {
        const y = 54 + i * 78;
        return (
          <g key={ex.s}>
            <rect x="16" y={y} width="418" height="68" rx="8"
                  fill="rgba(28,45,72,0.8)" stroke={ex.col} strokeWidth="1.5"/>
            {/* Surah badge */}
            <rect x="24" y={y+8} width="48" height="42" rx="6"
                  fill={`${ex.col}22`} stroke={ex.col} strokeWidth="1.5"/>
            <text x="48" y={y+23} fill={ex.col} fontSize="13" textAnchor="middle" fontWeight="900">S.{ex.s}</text>
            <text x="48" y={y+41} fill={ex.col} fontSize="20" textAnchor="middle"
                  style={{fontFamily:'serif'}}>{ex.arabic}</text>
            {/* Mode badge */}
            <rect x="84" y={y+8} width="84" height="18" rx="4"
                  fill={`${ex.col}33`} stroke={ex.col} strokeWidth="1.2"/>
            <text x="126" y={y+21} fill={ex.col} fontSize="10"
                  textAnchor="middle" fontWeight="700">{ex.mode}</text>
            {/* Opening verse */}
            <text x="86" y={y+39} fill="#94ADC8" fontSize="11">{ex.opening}</text>
            <text x="86" y={y+54} fill="#5A7A96" fontSize="10">{ex.eng}...</text>
          </g>
        );
      })}
      <rect x="16" y="328" width="418" height="1.5" fill="#2A4060" opacity=".5"/>
    </svg>
  );
};

