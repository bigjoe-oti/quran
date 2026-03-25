import React from 'react';
import { T } from '../constants/data';

export const Defs = () => (
  <defs>
    <linearGradient id="gGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#F5D06A"/>
      <stop offset="55%" stopColor="#E0B84A"/>
      <stop offset="100%" stopColor="#9A6E1A"/>
    </linearGradient>
    <linearGradient id="gTealV" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#22D3EE" stopOpacity=".9"/>
      <stop offset="100%" stopColor="#22D3EE" stopOpacity=".03"/>
    </linearGradient>
    <linearGradient id="gRedV" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#F43F6E" stopOpacity=".9"/>
      <stop offset="100%" stopColor="#F43F6E" stopOpacity=".05"/>
    </linearGradient>
    <linearGradient id="gBlueV" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#60A5FA" stopOpacity=".85"/>
      <stop offset="100%" stopColor="#60A5FA" stopOpacity=".05"/>
    </linearGradient>
    <linearGradient id="gPurpleV" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#C084FC" stopOpacity=".8"/>
      <stop offset="100%" stopColor="#C084FC" stopOpacity=".04"/>
    </linearGradient>
    <linearGradient id="gAmberV" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FBBF24" stopOpacity=".85"/>
      <stop offset="100%" stopColor="#FBBF24" stopOpacity=".04"/>
    </linearGradient>
    <radialGradient id="gTealR" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#22D3EE" stopOpacity=".12"/>
      <stop offset="100%" stopColor="#22D3EE" stopOpacity="0"/>
    </radialGradient>
    <radialGradient id="gGoldR" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#E0B84A" stopOpacity=".20"/>
      <stop offset="100%" stopColor="#E0B84A" stopOpacity="0"/>
    </radialGradient>
    <radialGradient id="gBgR" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#1C3060" stopOpacity=".6"/>
      <stop offset="100%" stopColor="#0C1628" stopOpacity="0"/>
    </radialGradient>
    <filter id="fGold" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="fGoldSt" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="7" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="fTeal" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="fRed" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="fBlue" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="fPurple" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="fSoft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.8" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <pattern id="pGrid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#1E3450" strokeWidth=".5"/>
    </pattern>
  </defs>
)
export default Defs;
