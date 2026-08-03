import { useState, useEffect, useRef } from 'react'
import { projects } from '@/data/projects'
import DraggableSticker from '@/components/stickers/DraggableSticker'
import ProjectDetail from '@/components/project/ProjectDetail'

/**
 * Home (Scrapboard)
 * Hero section with floating project shapes, coordinate hud, rulers and analog elements.
 */
export default function Home() {
  const [activeProject, setActiveProject] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, pctX: 0, pctY: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [timeStr, setTimeStr] = useState('')
  const containerRef = useRef(null)

  // Track mobile state to bypass mouse tracking on touch screens
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Keep digital GMT clock updated
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
      const timeVal = now.toLocaleTimeString('en-US', options)
      
      const offsetMinutes = now.getTimezoneOffset()
      const offsetHours = -offsetMinutes / 60
      const tzVal = `GMT${offsetHours >= 0 ? '+' : ''}${offsetHours}`
      
      setTimeStr(`${timeVal} ${tzVal}`)
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  // Mouse move handler for coordinates and crosshair lines
  const handleMouseMove = (e) => {
    if (isMobile) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const pctX = (x / rect.width) * 100
    const pctY = (y / rect.height) * 100
    setMousePos({ x: Math.round(x), y: Math.round(y), pctX, pctY })
  }

  // Calculate follow label coordinates to keep it within container boundaries
  const tagLeft = mousePos.pctX > 80 ? 'auto' : `calc(${mousePos.pctX}% + 16px)`
  const tagRight = mousePos.pctX > 80 ? `calc(${100 - mousePos.pctX}% + 16px)` : 'auto'
  const tagTop = mousePos.pctY > 90 ? 'auto' : `calc(${mousePos.pctY}% + 16px)`
  const tagBottom = mousePos.pctY > 90 ? `calc(${100 - mousePos.pctY}% + 16px)` : 'auto'

  return (
    <>
      <section
        id="home"
        ref={containerRef}
        className="bg-board"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          minHeight: '100vh',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* ── Technical Framing Rulers (Analog drafting borders) ── */}
        {/* Top Ruler */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '12px',
            borderBottom: '1px solid rgba(234, 88, 12, 0.25)',
            backgroundImage: `
              linear-gradient(90deg, rgba(234, 88, 12, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234, 88, 12, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 8px, 10px 4px',
            backgroundPosition: 'bottom, bottom',
            backgroundRepeat: 'repeat-x',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Bottom Ruler */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '12px',
            borderTop: '1px solid rgba(234, 88, 12, 0.25)',
            backgroundImage: `
              linear-gradient(90deg, rgba(234, 88, 12, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234, 88, 12, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 8px, 10px 4px',
            backgroundPosition: 'top, top',
            backgroundRepeat: 'repeat-x',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Left Ruler */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '12px',
            height: '100%',
            borderRight: '1px solid rgba(234, 88, 12, 0.25)',
            backgroundImage: `
              linear-gradient(180deg, rgba(234, 88, 12, 0.5) 1px, transparent 1px),
              linear-gradient(180deg, rgba(234, 88, 12, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '8px 50px, 4px 10px',
            backgroundPosition: 'right, right',
            backgroundRepeat: 'repeat-y',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Right Ruler */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '12px',
            height: '100%',
            borderLeft: '1px solid rgba(234, 88, 12, 0.25)',
            backgroundImage: `
              linear-gradient(180deg, rgba(234, 88, 12, 0.5) 1px, transparent 1px),
              linear-gradient(180deg, rgba(234, 88, 12, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '8px 50px, 4px 10px',
            backgroundPosition: 'left, left',
            backgroundRepeat: 'repeat-y',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* ── Monospace Corner Metadata Panels ── */}
        {/* Top Left */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            fontFamily: 'monospace',
            fontSize: '9px',
            color: 'rgba(234, 88, 12, 0.65)',
            lineHeight: '1.4',
            zIndex: 2,
            pointerEvents: 'none',
            letterSpacing: '0.1em',
          }}
          className="hidden sm:block"
        >
          <p>LOC // 48.8566° N, 2.3522° E (PARIS)</p>
          <p>BOARD // ANALOG_DRAFT_V2.6</p>
        </div>

        {/* Top Right */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            fontFamily: 'monospace',
            fontSize: '9px',
            color: 'rgba(234, 88, 12, 0.65)',
            textAlign: 'right',
            lineHeight: '1.4',
            zIndex: 2,
            pointerEvents: 'none',
            letterSpacing: '0.1em',
          }}
          className="hidden sm:block"
        >
          <p>CLK // {timeStr || '00:00:00 GMT'}</p>
          <p>STS // OPERATIONAL</p>
        </div>

        {/* Bottom Left */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            fontFamily: 'monospace',
            fontSize: '9px',
            color: 'rgba(234, 88, 12, 0.65)',
            lineHeight: '1.4',
            zIndex: 2,
            pointerEvents: 'none',
            letterSpacing: '0.1em',
          }}
          className="hidden sm:block"
        >
          <p>MD  // INTERACTIVE_CANVAS</p>
          <p>SCL // 1.0X_RES_100VH</p>
        </div>

        {/* Bottom Right */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            fontFamily: 'monospace',
            fontSize: '9px',
            color: 'rgba(234, 88, 12, 0.65)',
            textAlign: 'right',
            lineHeight: '1.4',
            zIndex: 2,
            pointerEvents: 'none',
            letterSpacing: '0.1em',
          }}
          className="hidden sm:block"
        >
          <p>
            CURSOR // {isHovered ? `X:${mousePos.x}px Y:${mousePos.y}px` : 'IDLE'}
          </p>
          <p className="flex items-center gap-1.5 justify-end">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600 anim-flash inline-block" />
            GRID_ACTIVE
          </p>
        </div>

        {/* ── Interactive Hairline Crosshairs (Desktop only) ── */}
        {isHovered && !isMobile && (
          <>
            {/* Horizontal Line */}
            <div
              style={{
                position: 'absolute',
                top: `${mousePos.pctY}%`,
                left: 0,
                width: '100%',
                height: '1px',
                borderTop: '1px dashed rgba(234, 88, 12, 0.15)',
                pointerEvents: 'none',
                zIndex: 1,
                transform: 'translateY(-50%)',
              }}
            />
            {/* Vertical Line */}
            <div
              style={{
                position: 'absolute',
                left: `${mousePos.pctX}%`,
                top: 0,
                height: '100%',
                width: '1px',
                borderLeft: '1px dashed rgba(234, 88, 12, 0.15)',
                pointerEvents: 'none',
                zIndex: 1,
                transform: 'translateX(-50%)',
              }}
            />
            {/* Floating Coordinate Tag */}
            <div
              style={{
                position: 'absolute',
                left: tagLeft,
                right: tagRight,
                top: tagTop,
                bottom: tagBottom,
                fontFamily: 'monospace',
                fontSize: '9px',
                color: '#ffffff',
                backgroundColor: '#ea580c',
                padding: '3px 6px',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '2px',
                pointerEvents: 'none',
                zIndex: 15,
                letterSpacing: '0.05em',
                boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
              }}
            >
              [ X:{mousePos.x} Y:{mousePos.y} ]
            </div>
          </>
        )}

        {/* ── Giant Overlapping Background Watermark ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            userSelect: 'none',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            zIndex: 0,
          }}
        >
          <p
            style={{
              fontFamily: '"Arial Black", Impact, "Bebas Neue", sans-serif',
              fontSize: 'clamp(140px, 24vw, 340px)',
              letterSpacing: '-0.05em',
              fontWeight: 900,
              color: 'rgba(234, 88, 12, 0.16)',
              lineHeight: 0.8,
            }}
          >
            IGOR
            <br />
            LUNA
          </p>
        </div>

        {/* ── Overlapping Brutalist Intro Paragraph ── */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '5%',
            transform: 'translateY(-50%)',
            maxWidth: '1000px',
            zIndex: 1, // Placed dynamically in the layered stack
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          className="px-4 sm:px-8 md:px-12"
        >
          <h1
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: 'clamp(28px, 6vw, 76px)',
              lineHeight: '1.02',
              fontWeight: '900',
              color: '#ffffff',
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
            }}
          >
            IGOR LUNA IS A <span style={{ color: '#ea580c' }}>DEVELOPER</span> BASED IN PARIS, FRANCE. 
            BUILDING <span style={{ color: '#00ffff' }}>SYSTEM ARCHITECTURES</span>, 
            MACHINE LEARNING AND <span style={{ color: '#ea580c' }}>COMPUTER VISION</span>.
          </h1>
        </div>

        {/* ── Sticker canvas ── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            zIndex: 1,
          }}
        >
          {projects.map((project) => (
            <DraggableSticker
              key={project.id}
              project={project}
              zIndex={project.id}
              onOpen={setActiveProject}
            />
          ))}
        </div>

        {/* ── Hint label ── */}
        <p
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-display)',
            fontSize: 10,
            letterSpacing: '0.45em',
            color: 'var(--slate-600)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            zIndex: 2,
          }}
        >
          DRAG · CLICK TO EXPLORE PROJECTS
        </p>
      </section>

      {/* ── Detail modal ── */}
      {activeProject && (
        <ProjectDetail
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  )
}
