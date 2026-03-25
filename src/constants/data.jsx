import React from 'react';
import { pi, phi, C, Q } from '../utils/math';







// Because PANELS uses inline JSX mapping, we dynamically map the Misc attributes.



export const T = {
  bg:      '#0C1628',   // deep sapphire (not black — warmer, readable)
  panel:   '#152038',   // panel surfaces — clearly lighter than bg
  card:    '#1C2D48',   // card interiors
  border:  '#2A4060',   // visible borders
  borderBr:'#3A5A80',   // bright borders / active highlights
  gold:    '#E0B84A',   // warm gold — more visible on sapphire
  goldLt:  '#F5D06A',   // highlight gold
  teal:    '#22D3EE',   // bright cyan-teal
  red:     '#F43F6E',   // rose-red
  blue:    '#60A5FA',   // sky blue
  purple:  '#C084FC',   // lavender
  green:   '#34D399',   // mint
  amber:   '#FBBF24',   // amber accent
  text:    '#F4F8FC',   // near-white with blue tint — very readable
  dim:     '#B6CBE0',   // readable medium text
  muted:   '#5A7A96',   // readable muted text
  grid:    '#1E3450',   // grid lines
  gridBr:  '#2A4A6A',   // bright grid lines
};
export const MUQSURAHS = [2,3,7,10,11,12,13,14,15,19,20,26,27,28,29,30,31,32,36,38,40,41,42,43,44,45,46,50,68];
export const HAMIN     = new Set([40,41,42,43,44,45,46]);
export const MUQLETT   = ['ا','ل','م','ص','ر','ك','ه','ي','ع','ط','س','ح','ق','ن'];

export const RING_GUIDE = [
  { ring:'Ring A', color:T.gold,   title:'28-Letter Arabic Alphabet', desc:'Outer ring — 28 positions. Gold nodes are the 14 Muqattaat letters (exactly half the alphabet). Dimmed nodes are the excluded letters.', arabicDesc:'الحلقة الخارجية — ٢٨ موضعاً. العقد الذهبية تمثل ١٤ حرفاً مقطعاً (نصف الأبجدية بالضبط).' },
  { ring:'Ring B', color:T.teal,   title:'Letter Frequency Spikes', desc:'Radial bars proportional to occurrence count. Qaf (ق) and Nun (ن) are visible extreme outliers — their spikes break the baseline dramatically.', arabicDesc:'الحلقة المتوسطة — يمثل طول العمود التكرار. الشذوذ الإحصائي لحرفي (ق) و (ن) واضح جداً ويكسر خط الأساس.' },
  { ring:'Ring C', color:T.blue,   title:'29 Muqattaat Surahs', desc:'One node per Muqattaat surah. Blue large = 7 consecutive Ha-Mim surahs (40-46). Red = Surah 19 (Maryam), the multivariate outlier.', arabicDesc:'الحلقة الداخلية — العقد الزرقاء تمثل الحواميم السبع المتتالية، والعقدة الحمراء تمثل سورة مريم الشاذة إحصائياً.' },
  { ring:'Ring D', color:T.purple, title:'14-Gon Inner Structure', desc:'A regular 14-gon whose interior angle (154.286°) is algebraically derived from the Alif/Lam ratio — itself convergent with e/phi.', arabicDesc:'الروابط — مضلع منتظم بـ ١٤ ضلعاً، زاويته الداخلية (١٥٤.٢٨٦°) مستمدة جبرياً من نسبة الألف إلى اللام.' },
  { ring:'Core',   color:T.gold,   title:'Arabic Initiatory Letters — الم', desc:'The three most common Muqattaat letters. Their ratio A/L = e/phi within 0.00056%. The foundation of the entire mathematical structure.', arabicDesc:'المركز — (الم) أساس البنية الرياضية، النسبة بينها تطابق النسبة الذهبية والعدد النيبيري بدقة متناهية.' },
];


export const FINDING_C_DATA = {
  muq:    { pos:25, neg:4,  total:29 },   // Muqattaat surahs
  nonMuq: { pos:18, neg:67, total:85 },   // Non-Muqattaat surahs
  oddsRatio: 23.26,
  pFisher:   6.03e-10,
  // Non-Muqattaat positive surahs (DeepSeek verified)
  nonMuqPositive: [8,16,17,18,24,25,33,34,39,47,52,54,55,59,62,72,97,98],
  // Muqattaat exceptions (no book-ref in v2)
  muqExceptions: [
    { s:19, reason:`Opens with mercy narrative — dhikr rahmat Rabbik` },
    { s:29, reason:`Opens with test — do people think they'll be left saying 'we believe'` },
    { s:30, reason:`Opens with geopolitical — 'The Romans have been defeated'` },
    { s:68, reason:`Opens defending the Prophet — 'You are not a madman'` },
  ],
};

export const MAKHRAJ_DATA = [
  { id:'M01', name:'Jawf (Vowel Space)',    letters:['ا'],         muq:['ا'],         status:'FULL'    },
  { id:'M02', name:'Deep Throat',           letters:['ه'],         muq:['ه'],         status:'FULL'    },
  { id:'M03', name:'Mid Throat',            letters:['ع','ح'],     muq:['ع','ح'],     status:'FULL'    },
  { id:'M04', name:'Near Throat',           letters:['غ','خ'],     muq:[],            status:'ABSENT'  },
  { id:'M05', name:'Back Tongue Q',         letters:['ق'],         muq:['ق'],         status:'FULL'    },
  { id:'M06', name:'Back Tongue K',         letters:['ك'],         muq:['ك'],         status:'FULL'    },
  { id:'M07', name:'Mid Tongue',            letters:['ج','ش','ي'], muq:['ي'],         status:'PARTIAL' },
  { id:'M08', name:'Lateral',               letters:['ض'],         muq:[],            status:'ABSENT'  },
  { id:'M09', name:'Front Edge',            letters:['ل'],         muq:['ل'],         status:'FULL'    },
  { id:'M10', name:'Tip Nasal',             letters:['ن'],         muq:['ن'],         status:'FULL'    },
  { id:'M11', name:'Tip Rhotic',            letters:['ر'],         muq:['ر'],         status:'FULL'    },
  { id:'M12', name:'Tip + Teeth Base',      letters:['ط','د','ت'], muq:['ط'],         status:'PARTIAL' },
  { id:'M13', name:'Sibilants',             letters:['ص','ز','س'], muq:['ص','س'],     status:'PARTIAL' },
  { id:'M14', name:'Interdentals',          letters:['ظ','ذ','ث'], muq:[],            status:'ABSENT'  },
  { id:'M15', name:'Labio-dental',          letters:['ف'],         muq:[],            status:'ABSENT'  },
  { id:'M16', name:'Bilabial',              letters:['ب','م','و'], muq:['م'],         status:'PARTIAL' },
];

export const MK_STATUS_COL = { FULL:'#34D399', PARTIAL:'#E0B84A', ABSENT:'#F43F6E' };

export const TAG_COLORS = {
  PHONETIC:     {bg:`${T.green}18`,   border:`${T.green}55`,   text:T.green},
  EXACT:        {bg:`${T.green}18`,   border:`${T.green}55`,   text:T.green},
  STATISTICAL:  {bg:`${T.blue}18`,    border:`${T.blue}55`,    text:T.blue},
  VERIFIED:     {bg:`${T.gold}18`,    border:`${T.gold}55`,    text:T.gold},
  INTERTEXTUAL: {bg:`${T.amber}18`,   border:`${T.amber}55`,   text:T.amber},
  PHASE2:       {bg:`${T.green}18`,   border:`${T.green}55`,   text:T.green},
  MULTIVARIATE: {bg:`${T.purple}18`,  border:`${T.purple}55`,  text:T.purple},
  GEOMETRIC:    {bg:`${T.teal}18`,    border:`${T.teal}55`,    text:T.teal},
};

export const MAHAL_SURAHS = [2,3,7,10,11,12,13,14,15,19,20,26,27,28,29,30,31,32,36,38,40,41,42,43,44,45,46,50,68];
export const MAHAL_SIGMAS = [-0.315,-0.671,-0.61,0.031,-0.126,0.582,-0.298,-0.228,-0.569,1.918,-0.503,0.223,-0.963,-0.48,-0.049,-0.605,-0.102,-0.78,0.282,-0.208,-0.044,-0.498,-0.307,0.109,-0.763,-0.626,-0.606,3.262,2.945];
export const MAHAL_PCAX   = [1.06,8.75,-5.06,13.15,6.08,12.32,12.07,14.45,5.47,102.36,13.62,-79.83,-11.13,-48.97,5.96,-15.68,2.16,-30.43,23.75,-26.24,-58.65,-32.37,-47.26,-74.92,-32.78,-41.35,-28.82,166.71,145.56];
export const MAHAL_PCAY   = [-20.03,-16.18,-12.15,-14.51,-14.79,-15.49,-17.51,-17.64,-13.28,-2.85,-12.28,24.27,-7.45,8.61,-21.73,-9.23,-17.45,-8.93,3.54,-6.04,24.87,20.33,15.71,21.38,12.24,15.88,17.88,11.31,51.54];
// === LETTER_FREQ_DATA ===
export const LETTER_FREQ_DATA = [
  {letter:"ا", count:59613, isMuq:true},
  {letter:"ل", count:38639, isMuq:true},
  {letter:"ن", count:27382, isMuq:true},
  {letter:"م", count:27071, isMuq:true},
  {letter:"ي", count:25862, isMuq:true},
  {letter:"و", count:25486, isMuq:false},
  {letter:"ه", count:17306, isMuq:true},
  {letter:"ر", count:12627, isMuq:true},
  {letter:"ب", count:11603, isMuq:false},
  {letter:"ت", count:10520, isMuq:false},
  {letter:"ك", count:10497, isMuq:true},
  {letter:"ع", count:9405, isMuq:true},
  {letter:"ف", count:8747, isMuq:false},
  {letter:"ق", count:7034, isMuq:true},
  {letter:"س", count:6124, isMuq:true},
  {letter:"د", count:5991, isMuq:false},
  {letter:"ذ", count:4932, isMuq:false},
  {letter:"ح", count:4364, isMuq:true},
  {letter:"ج", count:3317, isMuq:false},
  {letter:"خ", count:2497, isMuq:false},
  {letter:"ش", count:2124, isMuq:false},
  {letter:"ص", count:2072, isMuq:true},
  {letter:"ض", count:1686, isMuq:false},
  {letter:"ز", count:1599, isMuq:false},
  {letter:"ث", count:1414, isMuq:false},
  {letter:"ط", count:1273, isMuq:true},
  {letter:"غ", count:1221, isMuq:false},
  {letter:"ظ", count:853, isMuq:false},
];

// === ENTROPY_DATA ===
export const ENTROPY_DATA = [
  {surah:1, entropy:3.80831, isMuq:false},
  {surah:2, entropy:4.11579, isMuq:true},
  {surah:3, entropy:4.07534, isMuq:true},
  {surah:4, entropy:4.08203, isMuq:false},
  {surah:5, entropy:4.08765, isMuq:false},
  {surah:6, entropy:4.16108, isMuq:false},
  {surah:7, entropy:4.12476, isMuq:true},
  {surah:8, entropy:4.08463, isMuq:false},
  {surah:9, entropy:4.08610, isMuq:false},
  {surah:10, entropy:4.09085, isMuq:true},
  {surah:11, entropy:4.11886, isMuq:true},
  {surah:12, entropy:4.12049, isMuq:true},
  {surah:13, entropy:4.13431, isMuq:true},
  {surah:14, entropy:4.13094, isMuq:true},
  {surah:15, entropy:4.02773, isMuq:true},
  {surah:16, entropy:4.11676, isMuq:false},
  {surah:17, entropy:4.14019, isMuq:false},
  {surah:18, entropy:4.18551, isMuq:false},
  {surah:19, entropy:4.11085, isMuq:true},
  {surah:20, entropy:4.14987, isMuq:true},
  {surah:21, entropy:4.09193, isMuq:false},
  {surah:22, entropy:4.11642, isMuq:false},
  {surah:23, entropy:4.10479, isMuq:false},
  {surah:24, entropy:4.11941, isMuq:false},
  {surah:25, entropy:4.08662, isMuq:false},
  {surah:26, entropy:4.04338, isMuq:true},
  {surah:27, entropy:4.10687, isMuq:true},
  {surah:28, entropy:4.08392, isMuq:true},
  {surah:29, entropy:4.03295, isMuq:true},
  {surah:30, entropy:4.14720, isMuq:true},
  {surah:31, entropy:4.12261, isMuq:true},
  {surah:32, entropy:4.06551, isMuq:true},
  {surah:33, entropy:4.03507, isMuq:false},
  {surah:34, entropy:4.11988, isMuq:false},
  {surah:35, entropy:4.15458, isMuq:false},
  {surah:36, entropy:4.07354, isMuq:true},
  {surah:37, entropy:4.04509, isMuq:false},
  {surah:38, entropy:4.15188, isMuq:true},
  {surah:39, entropy:4.14877, isMuq:false},
  {surah:40, entropy:4.11271, isMuq:true},
  {surah:41, entropy:4.10148, isMuq:true},
  {surah:42, entropy:4.13031, isMuq:true},
  {surah:43, entropy:4.10808, isMuq:true},
  {surah:44, entropy:4.03653, isMuq:true},
  {surah:45, entropy:4.04896, isMuq:true},
  {surah:46, entropy:4.08736, isMuq:true},
  {surah:47, entropy:4.06898, isMuq:false},
  {surah:48, entropy:4.16233, isMuq:false},
  {surah:49, entropy:4.02148, isMuq:false},
  {surah:50, entropy:4.21184, isMuq:true},
  {surah:51, entropy:4.07516, isMuq:false},
  {surah:52, entropy:4.10759, isMuq:false},
  {surah:53, entropy:4.05388, isMuq:false},
  {surah:54, entropy:4.22923, isMuq:false},
  {surah:55, entropy:3.94901, isMuq:false},
  {surah:56, entropy:4.02933, isMuq:false},
  {surah:57, entropy:4.10444, isMuq:false},
  {surah:58, entropy:4.06074, isMuq:false},
  {surah:59, entropy:4.04987, isMuq:false},
  {surah:60, entropy:4.03108, isMuq:false},
  {surah:61, entropy:4.03374, isMuq:false},
  {surah:62, entropy:3.98756, isMuq:false},
  {surah:63, entropy:4.04758, isMuq:false},
  {surah:64, entropy:4.10370, isMuq:false},
  {surah:65, entropy:4.15465, isMuq:false},
  {surah:66, entropy:4.07655, isMuq:false},
  {surah:67, entropy:4.15770, isMuq:false},
  {surah:68, entropy:4.13134, isMuq:true},
  {surah:69, entropy:4.11961, isMuq:false},
  {surah:70, entropy:4.08042, isMuq:false},
  {surah:71, entropy:4.02203, isMuq:false},
  {surah:72, entropy:4.03689, isMuq:false},
  {surah:73, entropy:4.11828, isMuq:false},
  {surah:74, entropy:4.16666, isMuq:false},
  {surah:75, entropy:4.02872, isMuq:false},
  {surah:76, entropy:4.09717, isMuq:false},
  {surah:77, entropy:3.99638, isMuq:false},
  {surah:78, entropy:3.99828, isMuq:false},
  {surah:79, entropy:4.05682, isMuq:false},
  {surah:80, entropy:4.17022, isMuq:false},
  {surah:81, entropy:4.05941, isMuq:false},
  {surah:82, entropy:4.00681, isMuq:false},
  {surah:83, entropy:3.99195, isMuq:false},
  {surah:84, entropy:4.00624, isMuq:false},
  {surah:85, entropy:4.05069, isMuq:false},
  {surah:86, entropy:3.98874, isMuq:false},
  {surah:87, entropy:4.08521, isMuq:false},
  {surah:88, entropy:4.10693, isMuq:false},
  {surah:89, entropy:4.09716, isMuq:false},
  {surah:90, entropy:3.98501, isMuq:false},
  {surah:91, entropy:3.90029, isMuq:false},
  {surah:92, entropy:4.03443, isMuq:false},
  {surah:93, entropy:4.00372, isMuq:false},
  {surah:94, entropy:4.06402, isMuq:false},
  {surah:95, entropy:3.92798, isMuq:false},
  {surah:96, entropy:3.87366, isMuq:false},
  {surah:97, entropy:3.83041, isMuq:false},
  {surah:98, entropy:4.01382, isMuq:false},
  {surah:99, entropy:3.93602, isMuq:false},
  {surah:100, entropy:4.11571, isMuq:false},
  {surah:101, entropy:3.88207, isMuq:false},
  {surah:102, entropy:3.84232, isMuq:false},
  {surah:103, entropy:3.55435, isMuq:false},
  {surah:104, entropy:3.89232, isMuq:false},
  {surah:105, entropy:3.89418, isMuq:false},
  {surah:106, entropy:3.92592, isMuq:false},
  {surah:107, entropy:3.79968, isMuq:false},
  {surah:108, entropy:3.74614, isMuq:false},
  {surah:109, entropy:3.59249, isMuq:false},
  {surah:110, entropy:3.94283, isMuq:false},
  {surah:111, entropy:3.86758, isMuq:false},
  {surah:112, entropy:3.48364, isMuq:false},
  {surah:113, entropy:3.98264, isMuq:false},
  {surah:114, entropy:3.64155, isMuq:false},
];

// === PCA_DATA ===
export const PCA_DATA = [
  {surah:1, pc1:1.081, pc2:3.179, pc3:1.806, isMuq:false},
  {surah:2, pc1:-0.836, pc2:0.003, pc3:-0.370, isMuq:true},
  {surah:3, pc1:-0.897, pc2:0.007, pc3:-0.320, isMuq:true},
  {surah:4, pc1:-0.669, pc2:-0.001, pc3:-0.053, isMuq:false},
  {surah:5, pc1:-0.783, pc2:-0.088, pc3:-0.425, isMuq:false},
  {surah:6, pc1:-1.096, pc2:-0.000, pc3:0.161, isMuq:false},
  {surah:7, pc1:-0.835, pc2:-0.991, pc3:-0.285, isMuq:true},
  {surah:8, pc1:-1.552, pc2:0.349, pc3:0.190, isMuq:false},
  {surah:9, pc1:-0.877, pc2:0.403, pc3:-0.828, isMuq:false},
  {surah:10, pc1:-1.248, pc2:-0.507, pc3:-0.250, isMuq:true},
  {surah:11, pc1:-1.218, pc2:-0.377, pc3:0.120, isMuq:true},
  {surah:12, pc1:-0.387, pc2:-1.081, pc3:-0.225, isMuq:true},
  {surah:13, pc1:-0.197, pc2:0.185, pc3:-0.573, isMuq:true},
  {surah:14, pc1:-0.442, pc2:0.042, pc3:0.264, isMuq:true},
  {surah:15, pc1:-0.966, pc2:-1.250, pc3:-0.341, isMuq:true},
  {surah:16, pc1:-1.187, pc2:0.447, pc3:-0.105, isMuq:false},
  {surah:17, pc1:-0.211, pc2:-1.197, pc3:0.562, isMuq:false},
  {surah:18, pc1:-0.334, pc2:-0.417, pc3:-0.237, isMuq:false},
  {surah:19, pc1:-0.716, pc2:-0.951, pc3:0.552, isMuq:true},
  {surah:20, pc1:-0.681, pc2:-0.578, pc3:0.231, isMuq:true},
  {surah:21, pc1:-0.751, pc2:-0.944, pc3:-0.367, isMuq:false},
  {surah:22, pc1:-0.709, pc2:0.910, pc3:0.005, isMuq:false},
  {surah:23, pc1:-1.128, pc2:-0.743, pc3:-0.553, isMuq:false},
  {surah:24, pc1:-1.038, pc2:1.182, pc3:0.042, isMuq:false},
  {surah:25, pc1:0.074, pc2:-1.217, pc3:0.318, isMuq:false},
  {surah:26, pc1:-1.819, pc2:-0.848, pc3:0.728, isMuq:true},
  {surah:27, pc1:-0.922, pc2:-0.445, pc3:-0.435, isMuq:true},
  {surah:28, pc1:-1.193, pc2:-0.581, pc3:-0.149, isMuq:true},
  {surah:29, pc1:-0.863, pc2:-0.428, pc3:-0.684, isMuq:true},
  {surah:30, pc1:-1.225, pc2:0.126, pc3:0.001, isMuq:true},
  {surah:31, pc1:-0.076, pc2:0.730, pc3:0.144, isMuq:true},
  {surah:32, pc1:-1.611, pc2:-1.173, pc3:-0.534, isMuq:true},
  {surah:33, pc1:-0.707, pc2:-0.498, pc3:-0.157, isMuq:false},
  {surah:34, pc1:-1.176, pc2:-0.650, pc3:0.096, isMuq:false},
  {surah:35, pc1:-0.022, pc2:0.126, pc3:0.247, isMuq:false},
  {surah:36, pc1:-1.336, pc2:-0.030, pc3:-0.639, isMuq:true},
  {surah:37, pc1:-0.751, pc2:-0.712, pc3:-0.226, isMuq:false},
  {surah:38, pc1:0.284, pc2:-1.139, pc3:0.014, isMuq:true},
  {surah:39, pc1:-0.740, pc2:0.193, pc3:-0.725, isMuq:false},
  {surah:40, pc1:-0.510, pc2:-0.491, pc3:0.389, isMuq:true},
  {surah:41, pc1:-0.968, pc2:-0.638, pc3:-0.545, isMuq:true},
  {surah:42, pc1:-0.720, pc2:0.906, pc3:-0.026, isMuq:true},
  {surah:43, pc1:-1.515, pc2:-0.482, pc3:-0.387, isMuq:true},
  {surah:44, pc1:-2.239, pc2:-0.804, pc3:0.115, isMuq:true},
  {surah:45, pc1:-1.206, pc2:0.478, pc3:-0.415, isMuq:true},
  {surah:46, pc1:-0.856, pc2:-0.728, pc3:-0.481, isMuq:true},
  {surah:47, pc1:-0.775, pc2:0.782, pc3:-0.431, isMuq:false},
  {surah:48, pc1:-0.892, pc2:0.635, pc3:0.074, isMuq:false},
  {surah:49, pc1:-0.472, pc2:-0.114, pc3:-0.277, isMuq:false},
  {surah:50, pc1:-0.776, pc2:-0.261, pc3:-0.406, isMuq:true},
  {surah:51, pc1:-0.958, pc2:-0.694, pc3:-0.717, isMuq:false},
  {surah:52, pc1:-1.432, pc2:0.384, pc3:-0.016, isMuq:false},
  {surah:53, pc1:-0.582, pc2:-0.157, pc3:-0.703, isMuq:false},
  {surah:54, pc1:-0.281, pc2:-1.509, pc3:1.278, isMuq:false},
  {surah:55, pc1:0.312, pc2:-2.724, pc3:1.275, isMuq:false},
  {surah:56, pc1:-0.702, pc2:-0.757, pc3:-0.079, isMuq:false},
  {surah:57, pc1:-0.455, pc2:0.196, pc3:-0.390, isMuq:false},
  {surah:58, pc1:-0.601, pc2:0.780, pc3:-0.938, isMuq:false},
  {surah:59, pc1:0.301, pc2:0.071, pc3:-1.296, isMuq:false},
  {surah:60, pc1:-1.339, pc2:-0.182, pc3:-0.109, isMuq:false},
  {surah:61, pc1:-0.008, pc2:0.622, pc3:-0.266, isMuq:false},
  {surah:62, pc1:-0.663, pc2:1.029, pc3:-1.133, isMuq:false},
  {surah:63, pc1:-0.555, pc2:-0.083, pc3:-1.276, isMuq:false},
  {surah:64, pc1:0.063, pc2:0.953, pc3:0.282, isMuq:false},
  {surah:65, pc1:-0.107, pc2:0.073, pc3:-0.831, isMuq:false},
  {surah:66, pc1:-0.732, pc2:-0.356, pc3:0.103, isMuq:false},
  {surah:67, pc1:-0.346, pc2:-0.179, pc3:0.698, isMuq:false},
  {surah:68, pc1:-1.192, pc2:0.213, pc3:1.313, isMuq:true},
  {surah:69, pc1:-0.824, pc2:0.959, pc3:-0.558, isMuq:false},
  {surah:70, pc1:-1.708, pc2:1.062, pc3:-0.001, isMuq:false},
  {surah:71, pc1:0.334, pc2:-1.387, pc3:0.266, isMuq:false},
  {surah:72, pc1:0.462, pc2:-1.684, pc3:-0.631, isMuq:false},
  {surah:73, pc1:0.596, pc2:-0.637, pc3:-0.094, isMuq:false},
  {surah:74, pc1:0.068, pc2:-1.072, pc3:0.999, isMuq:false},
  {surah:75, pc1:0.227, pc2:-1.372, pc3:-0.753, isMuq:false},
  {surah:76, pc1:0.279, pc2:-0.690, pc3:0.774, isMuq:false},
  {surah:77, pc1:-1.777, pc2:0.389, pc3:1.603, isMuq:false},
  {surah:78, pc1:0.999, pc2:-2.721, pc3:-0.108, isMuq:false},
  {surah:79, pc1:1.104, pc2:-0.904, pc3:-0.551, isMuq:false},
  {surah:80, pc1:-0.652, pc2:0.259, pc3:-0.271, isMuq:false},
  {surah:81, pc1:2.011, pc2:-1.182, pc3:0.065, isMuq:false},
  {surah:82, pc1:-0.106, pc2:-0.847, pc3:2.343, isMuq:false},
  {surah:83, pc1:-1.593, pc2:-0.762, pc3:0.834, isMuq:false},
  {surah:84, pc1:1.391, pc2:-1.602, pc3:-0.907, isMuq:false},
  {surah:85, pc1:-0.298, pc2:1.617, pc3:-0.720, isMuq:false},
  {surah:86, pc1:1.559, pc2:-0.441, pc3:-0.569, isMuq:false},
  {surah:87, pc1:2.174, pc2:0.750, pc3:1.487, isMuq:false},
  {surah:88, pc1:-0.437, pc2:1.789, pc3:1.298, isMuq:false},
  {surah:89, pc1:0.835, pc2:0.204, pc3:1.438, isMuq:false},
  {surah:90, pc1:1.370, pc2:-0.136, pc3:-1.383, isMuq:false},
  {surah:91, pc1:2.039, pc2:-1.447, pc3:-5.117, isMuq:false},
  {surah:92, pc1:0.955, pc2:0.114, pc3:0.339, isMuq:false},
  {surah:93, pc1:0.328, pc2:1.442, pc3:1.932, isMuq:false},
  {surah:94, pc1:2.187, pc2:-2.550, pc3:6.983, isMuq:false},
  {surah:95, pc1:1.687, pc2:-0.220, pc3:-0.454, isMuq:false},
  {surah:96, pc1:0.351, pc2:-0.924, pc3:1.404, isMuq:false},
  {surah:97, pc1:2.001, pc2:2.214, pc3:-1.139, isMuq:false},
  {surah:98, pc1:-0.354, pc2:0.770, pc3:0.084, isMuq:false},
  {surah:99, pc1:2.537, pc2:-0.122, pc3:-1.729, isMuq:false},
  {surah:100, pc1:2.421, pc2:1.117, pc3:0.482, isMuq:false},
  {surah:101, pc1:-1.050, pc2:-0.405, pc3:-1.760, isMuq:false},
  {surah:102, pc1:-1.309, pc2:1.543, pc3:1.360, isMuq:false},
  {surah:103, pc1:8.012, pc2:-0.925, pc3:0.758, isMuq:false},
  {surah:104, pc1:-0.127, pc2:6.044, pc3:-1.382, isMuq:false},
  {surah:105, pc1:1.238, pc2:5.355, pc3:3.301, isMuq:false},
  {surah:106, pc1:1.154, pc2:3.829, pc3:-1.020, isMuq:false},
  {surah:107, pc1:-0.943, pc2:3.476, pc3:2.386, isMuq:false},
  {surah:108, pc1:4.217, pc2:-0.172, pc3:4.621, isMuq:false},
  {surah:109, pc1:-2.118, pc2:-1.187, pc3:0.875, isMuq:false},
  {surah:110, pc1:5.252, pc2:-0.891, pc3:-0.319, isMuq:false},
  {surah:111, pc1:2.971, pc2:3.486, pc3:-1.570, isMuq:false},
  {surah:112, pc1:3.749, pc2:5.960, pc3:-2.299, isMuq:false},
  {surah:113, pc1:3.032, pc2:-3.087, pc3:-2.967, isMuq:false},
  {surah:114, pc1:5.727, pc2:-3.013, pc3:-1.136, isMuq:false},
];

// PCA variance: PC1=18.84% PC2=16.31% PC3=12.26%
export const PCA_VARIANCE = [18.84,16.31,12.26];

// === FFT_DATA (hardcoded from spatial_fft.py execution) ===
export const FFT_DATA = [
  {letter:"ق", count:7034, prob:2.10, anomalies:1139, topPeriod:2.10, topZ:10.65, 
   peaks:[{period:2.10,z:10.65},{period:5.85,z:10.00},{period:3.74,z:9.65},{period:2.75,z:9.64},{period:2.14,z:9.53}],
   col:"#F43F6E"},
  {letter:"ن", count:27382, prob:8.16, anomalies:1152, topPeriod:335623, topZ:16.97,
   peaks:[{period:335623,z:16.97},{period:3.89,z:12.80},{period:11573,z:12.45},{period:30511,z:11.84},{period:3.49,z:10.67}],
   col:"#60A5FA"},
  {letter:"ص", count:2072, prob:0.62, anomalies:1100, topPeriod:4.53, topZ:11.12,
   peaks:[{period:4.53,z:11.12},{period:4936,z:11.06},{period:2.20,z:10.81},{period:2.53,z:10.19},{period:2.21,z:9.92}],
   col:"#C084FC"},
  {letter:"م", count:27071, prob:8.07, anomalies:1134, topPeriod:8605.72, topZ:12.83,
   peaks:[{period:8606,z:12.83},{period:2.67,z:12.68},{period:2.69,z:11.20},{period:4.27,z:10.84},{period:7.19,z:10.70}],
   col:"#34D399"},
];
