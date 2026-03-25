import React from 'react';
import { LETTER_FREQ_DATA, ENTROPY_DATA, PCA_DATA, FFT_DATA, PCA_VARIANCE } from '../constants/data';
import Defs from './Defs';

// ─── Design tokens ────────────────────────────────────────────────────────────
const T_GOLD   = '#E0B84A';
const T_TEAL   = '#22D3EE';
const T_BLUE   = '#60A5FA';
const T_DIM    = '#94ADC8';
const T_MUTED  = '#4A6A86';
const T_GRID   = '#1E3450';
const T_BORDER = '#2A4060';
const T_PANEL  = '#0F1E35';

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 1: MACRO-LEDGER — 28-Letter Corpus Frequency Chart
// ─────────────────────────────────────────────────────────────────────────────
export const MacroLedgerViz = () => {
  const W = 480, H = 320;
  const PL = 32, PR = 60, PT = 32, PB = 28;
  const gW = W - PL - PR, gH = H - PT - PB;
  const max = LETTER_FREQ_DATA[0].count;
  const rowH = gH / LETTER_FREQ_DATA.length;
  const barH = Math.max(rowH * 0.55, 4);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full"
         role="img" aria-label="Macro-Ledger: 28-letter frequency ranked bar chart. Alef leads at 59,613 occurrences.">
      <Defs/>
      <text x={W/2} y={PT-12} fill={T_GOLD} fontSize="13" fontWeight="900" textAnchor="middle">
        الجدول الكبير — LETTER FREQUENCY CORPUS
      </text>
      <text x={W/2} y={PT-2} fill={T_DIM} fontSize="9" textAnchor="middle">
        Total canonical Rasm characters: 331,259 · All 28 letters ranked
      </text>

      {LETTER_FREQ_DATA.map((d, i) => {
        const y    = PT + i * rowH + (rowH - barH) / 2;
        const bW   = (d.count / max) * gW;
        const col  = d.isMuq ? T_GOLD : T_TEAL;
        const fill = d.isMuq ? 'url(#gGoldH)' : 'url(#gBlueH)';
        return (
          <g key={d.letter}>
            <text x={PL - 6} y={y + barH / 2 + 4} fill={col} fontSize="11"
                  textAnchor="end" fontWeight={d.isMuq ? '900' : '400'}>{d.letter}</text>
            <rect x={PL} y={y} width={bW} height={barH} rx="2"
                  fill={fill} opacity={d.isMuq ? 1 : 0.65}/>
            {d.isMuq && (
              <rect x={PL} y={y} width={2} height={barH} fill={T_GOLD}/>
            )}
            <text x={PL + bW + 4} y={y + barH / 2 + 3.5} fill={d.isMuq ? T_GOLD : T_MUTED}
                  fontSize="8.5" fontWeight={d.isMuq ? '700' : '400'}>
              {d.count.toLocaleString()}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <rect x={PL} y={H - 14} width={8} height={8} rx={1} fill={T_GOLD}/>
      <text x={PL + 11} y={H - 7} fill={T_DIM} fontSize="8.5">= Muqattaat letter</text>
      <rect x={PL + 100} y={H - 14} width={8} height={8} rx={1} fill={T_TEAL} opacity="0.65"/>
      <text x={PL + 113} y={H - 7} fill={T_DIM} fontSize="8.5">= Standard letter</text>
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 2: ENTROPY HEATMAP — 114-surah Shannon density grid
// ─────────────────────────────────────────────────────────────────────────────
export const EntropyHeatmapViz = () => {
  const W = 480, H = 300;
  const COLS = 19, ROWS = 6; // 19 × 6 = 114
  const PL = 10, PT = 38, cellW = (W - PL * 2) / COLS, cellH = (H - PT - 20) / ROWS;
  const minE = 3.48, maxE = 4.20;

  const heatColor = (e) => {
    const t = (e - minE) / (maxE - minE);
    const r = Math.round(12  + t * 224);
    const g = Math.round(30  + t * 100);
    const b = Math.round(50  + (1 - t) * 180);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full"
         role="img" aria-label="Information density heatmap: Shannon entropy per surah. Muqattaat surahs outlined in gold.">
      <Defs/>
      <text x={W/2} y={16} fill={T_GOLD} fontSize="13" fontWeight="900" textAnchor="middle">
        خريطة الكثافة المعلوماتية — ENTROPY HEATMAP
      </text>
      <text x={W/2} y={29} fill={T_DIM} fontSize="9" textAnchor="middle">
        Gold border = Muqattaat surah · Color intensity = Shannon entropy (bits/char)
      </text>

      {ENTROPY_DATA.map((d, i) => {
        const col  = Math.floor(i / ROWS);
        const row  = i % ROWS;
        const x    = PL + col * cellW;
        const y    = PT + row * cellH;
        const fill = heatColor(d.entropy);
        const isMuq = d.isMuq;

        return (
          <g key={d.surah}>
            <rect x={x + 1} y={y + 1} width={cellW - 2} height={cellH - 2}
                  rx="2" fill={fill} opacity="0.9"/>
            {isMuq && (
              <rect x={x + 1} y={y + 1} width={cellW - 2} height={cellH - 2}
                    rx="2" fill="none" stroke={T_GOLD} strokeWidth="1.5"/>
            )}
            <text x={x + cellW / 2} y={y + cellH / 2 + 3.5}
                  fill={isMuq ? T_GOLD : 'rgba(255,255,255,0.6)'}
                  fontSize="7.5" textAnchor="middle" fontWeight={isMuq ? '700' : '400'}>
              {d.surah}
            </text>
          </g>
        );
      })}

      {/* Entropy scale bar */}
      <defs>
        <linearGradient id="entScale" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={heatColor(minE)}/>
          <stop offset="100%" stopColor={heatColor(maxE)}/>
        </linearGradient>
      </defs>
      <rect x={PL} y={H - 14} width={120} height={6} rx="2" fill="url(#entScale)"/>
      <text x={PL} y={H - 3} fill={T_MUTED} fontSize="7.5">3.48 bits</text>
      <text x={PL + 120} y={H - 3} fill={T_MUTED} fontSize="7.5" textAnchor="end">4.20 bits</text>
      <text x={PL + 60} y={H - 3} fill={T_DIM} fontSize="7.5" textAnchor="middle">entropy range</text>
      <text x={W - PL} y={H - 3} fill={T_GOLD} fontSize="7.5" textAnchor="end">
        Muqattaat μ = 4.042 · Non-Muq μ = 3.982 · Δ = +0.060 bits/char
      </text>
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 3: PCA SCATTER — PC1 × PC2 Eigenvector topology
// ─────────────────────────────────────────────────────────────────────────────
export const PCAScatterViz = () => {
  const W = 480, H = 300;
  const PL = 48, PR = 20, PT = 38, PB = 36;
  const gW = W - PL - PR, gH = H - PT - PB;

  // Clamp to ±4 to exclude extreme short-surah outliers for readability
  const clip = v => Math.max(-4, Math.min(4, v));
  const scaleX = v => PL + ((clip(v) + 4) / 8) * gW;
  const scaleY = v => PT + ((4 - clip(v)) / 8) * gH;

  const muqCentroid = { pc1: -0.937, pc2: -0.383 };
  const nonCentroid = { pc1:  0.320, pc2:  0.131 };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full"
         role="img" aria-label="PCA scatter: PC1 vs PC2 for all 114 surahs. Gold = Muqattaat. Euclidean distance between clusters = 1.3651 standard deviations.">
      <Defs/>
      <text x={W/2} y={16} fill={T_GOLD} fontSize="13" fontWeight="900" textAnchor="middle">
        الحمض النووي البنيوي — PCA EIGENVECTOR SPACE
      </text>
      <text x={W/2} y={29} fill={T_DIM} fontSize="9" textAnchor="middle">
        PC1 (18.84%) × PC2 (16.31%) · Gold = Muqattaat · Gray = Standard · Centroids marked ✕
      </text>

      {/* Grid lines */}
      {[-3,-2,-1,0,1,2,3].map(v => (
        <g key={v}>
          <line x1={scaleX(v)} y1={PT} x2={scaleX(v)} y2={PT+gH}
                stroke={v===0 ? T_BORDER : T_GRID} strokeWidth={v===0?1.5:0.5} strokeDasharray={v===0?'':''} opacity="0.6"/>
          <line x1={PL} y1={scaleY(v)} x2={PL+gW} y2={scaleY(v)}
                stroke={v===0 ? T_BORDER : T_GRID} strokeWidth={v===0?1.5:0.5} opacity="0.6"/>
          <text x={scaleX(v)} y={PT+gH+12} fill={T_MUTED} fontSize="7.5" textAnchor="middle">{v}</text>
          <text x={PL-6} y={scaleY(v)+3} fill={T_MUTED} fontSize="7.5" textAnchor="end">{v}</text>
        </g>
      ))}

      {/* Non-Muqattaat points */}
      {PCA_DATA.filter(d => !d.isMuq).map(d => (
        <circle key={d.surah} cx={scaleX(d.pc1)} cy={scaleY(d.pc2)} r="3.5"
                fill={T_BORDER} stroke={T_MUTED} strokeWidth="0.5" opacity="0.65"/>
      ))}

      {/* Muqattaat points */}
      {PCA_DATA.filter(d => d.isMuq).map(d => (
        <g key={d.surah}>
          <circle cx={scaleX(d.pc1)} cy={scaleY(d.pc2)} r="5"
                  fill={T_GOLD} stroke="#C49A35" strokeWidth="1" opacity="0.92"
                  filter="drop-shadow(0 0 4px rgba(224,184,74,0.6))"/>
          <text x={scaleX(d.pc1)} y={scaleY(d.pc2) - 7}
                fill={T_GOLD} fontSize="7" textAnchor="middle" opacity="0.8">{d.surah}</text>
        </g>
      ))}

      {/* Centroids */}
      {[
        { ...muqCentroid, col: T_GOLD,  label: 'Muq centroid' },
        { ...nonCentroid, col: T_TEAL,  label: 'Non-Muq centroid' },
      ].map(c => (
        <g key={c.label}>
          <line x1={scaleX(c.pc1)-8} y1={scaleY(c.pc2)} x2={scaleX(c.pc1)+8} y2={scaleY(c.pc2)}
                stroke={c.col} strokeWidth="2"/>
          <line x1={scaleX(c.pc1)} y1={scaleY(c.pc2)-8} x2={scaleX(c.pc1)} y2={scaleY(c.pc2)+8}
                stroke={c.col} strokeWidth="2"/>
        </g>
      ))}

      {/* Distance annotation */}
      <line x1={scaleX(muqCentroid.pc1)} y1={scaleY(muqCentroid.pc2)}
            x2={scaleX(nonCentroid.pc1)} y2={scaleY(nonCentroid.pc2)}
            stroke={T_BORDER} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.8"/>
      <text x={(scaleX(muqCentroid.pc1)+scaleX(nonCentroid.pc1))/2}
            y={(scaleY(muqCentroid.pc2)+scaleY(nonCentroid.pc2))/2 - 6}
            fill={T_TEAL} fontSize="8" textAnchor="middle" fontWeight="700">
        d = 1.3651σ
      </text>

      <text x={PL+gW/2} y={PT+gH+26} fill={T_MUTED} fontSize="8" textAnchor="middle">
        PC1 (18.84% variance)
      </text>
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 4: FFT SIGNAL — Spatial periodicity of ق ن ص م
// ─────────────────────────────────────────────────────────────────────────────
export const FFTSignalViz = () => {
  const W = 480, H = 300;
  const PL = 20, colW = (W - PL * 2) / 4;
  const PT = 36, chartH = 180, PB = H - PT - chartH;
  const maxZ = 17;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full"
         role="img" aria-label="Spatial FFT analysis: extreme periodic anomalies detected in Qaf, Nun, Sad, Mim distributions across the Rasm corpus.">
      <Defs/>
      <text x={W/2} y={16} fill={T_GOLD} fontSize="13" fontWeight="900" textAnchor="middle">
        الدورية المكانية — SPATIAL FFT SIGNAL ANALYSIS
      </text>
      <text x={W/2} y={29} fill={T_DIM} fontSize="9" textAnchor="middle">
        4-sigma threshold · Signal power z-scores per structural letter
      </text>

      {FFT_DATA.map((d, li) => {
        const cx = PL + li * colW + colW / 2;
        const barMaxH = chartH - 60;

        return (
          <g key={d.letter}>
            {/* Letter header */}
            <text x={cx} y={PT + 14} fill={d.col} fontSize="20" textAnchor="middle" fontWeight="900">
              {d.letter}
            </text>
            <text x={cx} y={PT + 27} fill={T_DIM} fontSize="8" textAnchor="middle">
              {d.count.toLocaleString()} occurrences
            </text>
            <text x={cx} y={PT + 38} fill={T_MUTED} fontSize="7.5" textAnchor="middle">
              {d.prob}% of corpus
            </text>

            {/* Top 4 z-score bars */}
            {d.peaks.slice(0, 4).map((pk, pi) => {
              const bH  = (pk.z / maxZ) * barMaxH;
              const bW  = colW * 0.55;
              const bX  = cx - bW / 2;
              const bY  = PT + 52 + (pi * (barMaxH / 4 + 4));
              const isTop = pi === 0;
              return (
                <g key={pi}>
                  <rect x={bX} y={bY - 6} width={(pk.z / maxZ) * (colW - 8)} height={10}
                        rx="3" fill={d.col} opacity={isTop ? 1 : 0.55}
                        filter={isTop ? `drop-shadow(0 0 4px ${d.col})` : ''}/>
                  <text x={bX + (pk.z / maxZ) * (colW - 8) + 3} y={bY + 2}
                        fill={isTop ? d.col : T_MUTED} fontSize="7.5" fontWeight={isTop?'700':'400'}>
                    {pk.z.toFixed(1)}σ
                  </text>
                  <text x={bX} y={bY + 14} fill={T_MUTED} fontSize="6.5">
                    {pk.period >= 1000 ? `${(pk.period/1000).toFixed(1)}k` : pk.period.toFixed(1)} chr
                  </text>
                </g>
              );
            })}

            {/* Anomaly count */}
            <text x={cx} y={PT + chartH - 6} fill={d.col} fontSize="8.5"
                  textAnchor="middle" fontWeight="700">
              {d.anomalies} anomalies &gt;4σ
            </text>

            {/* Separator */}
            {li < 3 && (
              <line x1={PL + (li+1)*colW} y1={PT} x2={PL + (li+1)*colW} y2={PT+chartH}
                    stroke={T_GRID} strokeWidth="1" opacity="0.4"/>
            )}
          </g>
        );
      })}

      {/* Bottom baseline */}
      <line x1={PL} y1={PT + chartH} x2={W - PL} y2={PT + chartH}
            stroke={T_BORDER} strokeWidth="1"/>
      <text x={W/2} y={H - 6} fill={T_MUTED} fontSize="7.5" textAnchor="middle">
        Null hypothesis rejected for all 4 letters · ن peak spans entire corpus (335,623 chars = global symmetry)
      </text>
    </svg>
  );
};
