# Quran Muqattaat Analysis — الحروف المقطعة

A production-ready, high-performance web application for the deterministic mathematical analysis of the Quran's 14 initiatory letters (Al-Muqatta'at).

The platform visualises **35 verifiable findings** across 13 analytical tabs — free from numerological adjustments, selective counting, or arbitrary rules. Every data point traces directly to a peer-reviewed source or a reproducible computational engine.

---

## 🌟 Core Features

- **Interactive Master Topology** (`MasterCanvas`): A mathematically constrained concentric ring map unifying the 14 letters, 29 Surahs, physiological resonance, and transcendental symmetries.
- **Phonetic Architecture Engine**: Exhaustive enumeration of all **40,116,600** possible 14-letter subsets ($C(28,14)$) of the Arabic alphabet against the 16 Classical Makhraj (Sibawayhi, ~786 CE).
- **Computational Analysis Engine** *(new — Phase 2)*: Four data-driven modules backed by live Python engine executions:
  - `rasm_checksum.py` — 331,259-character 28-letter Rasm Uthmani frequency matrix
  - `pca_muqattaat.py` — PCA eigenvector analysis (114 × 14, scikit-learn)
  - `spatial_fft.py` — Spatial FFT periodicity detection (scipy.fft, 4-sigma threshold)
- **Bilingual Interface**: Deep synchronisation of English and Arabic (`Reem Kufi`) typographies across all 35 panels.
- **Deep Manuscript Aesthetics**: Sapphire `#0C1628` foundation with gold/cyan lighting, drop-shadow SVG filters, and glassmorphism bounding.

---

## 🚀 Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 6 |
| Architecture | Modular DDA — decoupled components, constants, utils, context |
| Styling | Vanilla CSS + Tailwind CSS v3 utility layer |
| Data | Hardcoded precision matrices from Python engines (zero API latency) |
| Analytics | Python 3 · NumPy · scikit-learn · SciPy · xml.etree |
| Deployment | Vercel (auto-deploy on `main` push) + Vercel Analytics |
| Typography | Righteous · Advent Pro · Reem Kufi · Crimson Pro |

---

## 📁 Project Architecture

```
src/
├── App.jsx                     # Root shell, tab router, panel grid
├── index.css                   # Design system, animations, theme tokens
├── main.jsx                    # Entry point + Vercel Analytics
├── components/
│   ├── Defs.jsx                # Global SVG filter/gradient definitions
│   ├── MasterCanvas.jsx        # Master Topology concentric ring viz
│   ├── MiscCharts.jsx          # ~18 specialised SVG chart components
│   ├── AnalyticsCharts.jsx     # 4 Computational Analysis viz (Phase 2)
│   ├── ControlChart.jsx        # Statistical control chart
│   ├── OutlierBarChart.jsx     # Outlier-highlighting bar chart
│   ├── ExactPolygon.jsx        # Regular polygon calculator viz
│   ├── AdvancedRadar.jsx       # Qaf/Nun radar chart
│   └── RotatingCuboctahedron.jsx  # Animated 3D cuboctahedron
├── constants/
│   ├── data.jsx                # All data constants (T, MUQLETT, PANELS data,
│   │                           #   LETTER_FREQ_DATA, ENTROPY_DATA, PCA_DATA,
│   │                           #   FFT_DATA, MAHAL_PCAX/Y, etc.)
│   └── panels.jsx              # PANELS array (35 items) + TABS definition
├── context/
│   └── TooltipContext.jsx      # Global tooltip state provider
└── utils/
    └── math.js                 # polar, stats, fmt, clamp, toRad, e, phi, pi, C, Q
```

---

## 📦 Local Deployment

```bash
git clone https://github.com/bigjoe-oti/quran
cd quran
npm install
npm run dev          # Development server → localhost:5173
npm run build        # Production bundle
```

### Python Analysis Engines (optional, for data regeneration)

```bash
pip install numpy scikit-learn scipy
python3 rasm_checksum.py    # 28-letter corpus matrix + Shannon entropy
python3 pca_muqattaat.py    # PCA eigenvector segregation analysis
python3 spatial_fft.py      # Spatial FFT periodicity detection
```

---

## 📐 Analytical Scope — 35 Findings, 13 Tabs

| Phase | Tabs | Panels | Focus |
|---|---|---|---|
| **Phase 1** | Master Topology → Orthogonal Spikes | 0–8 | Geometry, constants, anomalies, statistical outliers |
| **Phase 2** | Prime Networks → Frequencies & Effect | 9–30 | Systemic stability, phonetics, heritage, EEG evidence |
| **Phase 3** | Computational Analysis *(new)* | 31–34 | Rasm entropy, PCA eigenvectors, FFT spatial periodicity |

### Phase 3 — Computational Analysis Modules

| Module | Finding | Key Result |
|---|---|---|
| **الجدول الكبير** — Macro-Ledger | 28-letter frequency census | 14 Muqattaat letters = 63.4% of 331,259-char corpus |
| **خريطة الكثافة** — Entropy Heatmap | Shannon entropy per surah | Muqattaat μ = 4.042 vs 3.982 bits/char (+0.060 Δ) |
| **الحمض النووي** — PCA Structural DNA | Eigenvector segregation | Centroid distance = **1.3651σ** (2.73× significance threshold) |
| **الدورية المكانية** — Spatial FFT | Periodic signal detection | Nun (ن) at **16.97σ**, period = entire corpus (335,623 chars) |

---

## 📄 License & Attribution

Designed and Engineered by **Yousef Ali | J. Servo LLC (2026)**
[www.jservo.com](https://www.jservo.com)
