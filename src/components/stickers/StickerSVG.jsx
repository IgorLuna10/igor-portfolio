import { useState, useEffect } from 'react'

/**
 * StickerSVG
 * Brutalist, anti-polish project cards with polygon shapes, hard offset shadows,
 * technical coordinates, grids, and overlapping typography.
 */
const STICKER_SHAPES = {
  1: "M2,2 L98,2 L98,98 L2,98 Z", // Square
  2: "M2,12 L98,2 L98,88 L2,98 Z", // Skewed
  3: "M14,2 L98,2 L98,98 L2,98 L2,14 Z", // Cut corner
  4: "M2,2 L98,2 L88,98 L12,98 Z", // Trapezoid
  5: "M8,2 L92,2 L98,98 L2,98 Z", // Inverted Trapezoid
  6: "M2,2 L98,10 L90,98 L10,90 Z" // Skewed offset
}

export default function StickerSVG({ shape, color, title, projectId = 1, isDragging }) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const clipId = `clip-${title.replace(/\s+/g, '-').toLowerCase()}`
  const sz = isMobile ? 150 : 250 

  // Brutalist Themes
  // 1: Black Card, White Border, Orange Text, Orange Shadow
  // 2: White Card, Black Border, Orange Text, Black Shadow
  // 3: Orange Card, Black Border, White Text, Black Shadow
  const themeIndex = (projectId % 3)
  
  let bg = "#000000"
  let borderCol = "#ffffff"
  let textPrimary = "#ffffff"
  let textSecondary = "#ea580c"
  let shadowCol = "#ea580c"
  
  if (themeIndex === 2) {
    bg = "#ffffff"
    borderCol = "#000000"
    textPrimary = "#000000"
    textSecondary = "#ea580c"
    shadowCol = "#000000"
  } else if (themeIndex === 0) {
    bg = "#ea580c"
    borderCol = "#ffffff"
    textPrimary = "#ffffff"
    textSecondary = "#000000"
    shadowCol = "#000000"
  }

  const cardPath = STICKER_SHAPES[projectId] || STICKER_SHAPES[1]
  const shadowOffset = isDragging ? 10 : 5

  return (
    <svg
      width={sz}
      height={sz}
      viewBox="0 0 100 100"
      style={{
        display: 'block',
        overflow: 'visible',
        transform: `translate3d(0, 0, 0)`,
        transition: 'transform 0.2s ease',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Clip content to the irregular polygon card shape */}
        <clipPath id={clipId}>
          <path d={cardPath} />
        </clipPath>

        {/* Diagonal stripes pattern for brutalist card background */}
        <pattern id={`stripe-pattern-${clipId}`} width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="10" stroke={themeIndex === 0 ? "rgba(0,0,0,0.06)" : "rgba(234,88,12,0.08)"} strokeWidth="2" />
        </pattern>
      </defs>

      {/* ── Vector Offset Shadow ── */}
      <path
        d={cardPath}
        fill={shadowCol}
        style={{
          transform: `translate(${shadowOffset}px, ${shadowOffset}px)`,
          transition: 'transform 0.15s ease',
        }}
      />

      {/* ── Main Polygonal Card Body ── */}
      <path
        d={cardPath}
        fill={bg}
        stroke={borderCol}
        strokeWidth="1.5"
      />

      {/* ── Card Content (Clipped to Polygon) ── */}
      <g clipPath={`url(#${clipId})`}>
        {/* Diagonal Stripe Fill */}
        <rect x="0" y="0" width="100" height="100" fill={`url(#stripe-pattern-${clipId})`} />

        {/* Top Header Stamp */}
        <text
          x="8"
          y="15"
          fontFamily="monospace"
          fontSize="4"
          fontWeight="bold"
          fill={textSecondary}
          style={{ letterSpacing: '0.05em' }}
        >
          [ 0{projectId} / 06 ]
        </text>

        {/* Top-Right Technical Coordinates */}
        <text
          x="92"
          y="15"
          textAnchor="end"
          fontFamily="monospace"
          fontSize="3"
          fill={textPrimary}
          opacity="0.6"
        >
          SYS.LOC.0{projectId}
        </text>

        {/* Center Title - Huge, Heavy-Impact Brutalist Typography */}
        {(() => {
          const cleanTitle = title.trim().toUpperCase()
          // If title is long, wrap or scale it down slightly
          const isLong = cleanTitle.length > 10
          const fontSize = isLong ? 12 : 16
          
          return (
            <text
              x="8"
              y="48"
              fontFamily="var(--font-display)"
              fontSize={fontSize}
              fontWeight="900"
              fill={textPrimary}
              style={{
                letterSpacing: '-0.02em',
                transformOrigin: 'left center',
              }}
            >
              {cleanTitle}
            </text>
          )
        })()}

        {/* Subtitle / Diagnostic bar */}
        <line x1="8" y1="58" x2="92" y2="58" stroke={textSecondary} strokeWidth="0.5" />

        {/* Tiny active LED dot */}
        <circle cx="12" cy="69" r="1.5" fill={color} />
        
        {/* Active text */}
        <text
          x="18"
          y="70"
          fontFamily="monospace"
          fontSize="3.2"
          fill={textPrimary}
          opacity="0.8"
        >
          ACTIVE_STATE // {color.toUpperCase()}
        </text>

        {/* Simulated industrial barcode in the bottom corner */}
        <g transform="translate(8, 80)" opacity="0.8">
          <line x1="0" y1="0" x2="0" y2="8" stroke={textPrimary} strokeWidth="0.8" />
          <line x1="1.5" y1="0" x2="1.5" y2="8" stroke={textPrimary} strokeWidth="0.3" />
          <line x1="2.5" y1="0" x2="2.5" y2="8" stroke={textPrimary} strokeWidth="1.2" />
          <line x1="4.5" y1="0" x2="4.5" y2="8" stroke={textPrimary} strokeWidth="0.3" />
          <line x1="6" y1="0" x2="6" y2="8" stroke={textPrimary} strokeWidth="0.8" />
          <line x1="7.5" y1="0" x2="7.5" y2="8" stroke={textPrimary} strokeWidth="0.3" />
          <line x1="9" y1="0" x2="9" y2="8" stroke={textPrimary} strokeWidth="1.2" />
          <line x1="11" y1="0" x2="11" y2="8" stroke={textPrimary} strokeWidth="0.3" />
          <line x1="12" y1="0" x2="12" y2="8" stroke={textPrimary} strokeWidth="0.8" />
          <line x1="14" y1="0" x2="14" y2="8" stroke={textPrimary} strokeWidth="0.3" />
          <line x1="15" y1="0" x2="15" y2="8" stroke={textPrimary} strokeWidth="1.2" />
          <line x1="17" y1="0" x2="17" y2="8" stroke={textPrimary} strokeWidth="0.3" />
        </g>

        {/* Right Corner Stamp */}
        <text
          x="92"
          y="85"
          textAnchor="end"
          fontFamily="monospace"
          fontSize="3"
          fill={textSecondary}
          fontWeight="bold"
        >
          [ OK ]
        </text>
      </g>
    </svg>
  )
}
