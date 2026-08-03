/**
 * StickerShapes.jsx
 *
 * STICKER_THEMES — colour sets for each sticker.
 * The actual clip-path shapes live as inline JSX in StickerSVG.jsx
 * (CLIP_PATHS array) so React renders them on first paint without
 * any DOM manipulation.
 */

/**
 * STICKER_THEMES
 * Six colour combos — alternating sage / raspberry pairings.
 * border : accent stroke colour for the inner ring.
 * shadow : drop-shadow colour for the filter.
 */
export const STICKER_THEMES = [
  { border: '#7a3040', shadow: 'rgba(122, 48, 64, 0.35)'  }, // wine
  { border: '#2d5a2a', shadow: 'rgba(45, 90, 42, 0.35)'   }, // forest
  { border: '#3a5e30', shadow: 'rgba(58, 94, 48, 0.30)'   }, // deep sage
  { border: '#8a3848', shadow: 'rgba(138, 56, 72, 0.35)'  }, // raspberry
  { border: '#4a7840', shadow: 'rgba(74, 120, 64, 0.30)'  }, // olive
  { border: '#9a4858', shadow: 'rgba(154, 72, 88, 0.35)'  }, // muted red
]

