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
