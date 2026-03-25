export const toRad = d => d * Math.PI / 180;

export const polar = (cx, cy, r, deg) => ({
  x: cx + r * Math.cos(toRad(deg)),
  y: cy + r * Math.sin(toRad(deg))
});

export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export const fmt = (n, d = 7) => (+n).toFixed(d);

export const stats = arr => {
  const n    = arr.length;
  const mean = arr.reduce((a, b) => a + b, 0) / n;
  const std  = Math.sqrt(arr.reduce((s, v) => s + (v - mean) ** 2, 0) / n);
  return { n, mean, std, cv: std / mean * 100 };
};

export const e   = Math.E;
export const phi = 1.618033988749895;
export const pi  = Math.PI;

export const C = {
  e, phi, pi,
  ePhi:    e / phi,                         // 1.6799905609889009
  phiSum:  phi + 1 / phi,                   // 2.23606797749979
  piO25:   pi / 25.5,                       // 0.12319971190548208
  ia14:    (12 * 180) / 14,                 // 154.28571428571428°
  ia19:    (17 * 180) / 19,                 // 161.05263157894737°
};
C.ia19div = 360 / C.ia19;

export const Q = {
  totalSurahs:114, muqSurahs:29, uniqueLetters:14, arabicAlpha:28,
  totalLetters:325384, muqTotal:40071, alifTotal:17009, nunS68:391, qafS50:221,
};
