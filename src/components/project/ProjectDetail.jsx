import { useState, useEffect } from 'react'

/**
 * ProjectDetail
 * Full-screen modal overlay showing a project's details.
 */
export default function ProjectDetail({ project, onClose }) {
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 16)
    return () => clearTimeout(t)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 350)
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: visible ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0)',
        backdropFilter: visible ? 'blur(10px)' : 'none',
        transition: 'background 0.35s ease, backdrop-filter 0.35s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#050505',
          maxWidth: 600,
          width: '100%',
          position: 'relative',
          border: `1px solid ${project.color}`,
          borderRadius: 4,
          overflow: 'hidden',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.4s var(--ease-out), opacity 0.3s ease',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: 4,
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          }}
        />

        <div style={{ padding: isMobile ? '30px 20px' : '40px' }}>
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: isMobile ? 10 : 20,
              right: isMobile ? 10 : 20,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 28,
              color: '#ffffff',
              opacity: 0.5,
              padding: 0,
              lineHeight: 1,
              transition: 'opacity 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.opacity = 1)}
            onMouseOut={(e) => (e.target.style.opacity = 0.5)}
          >
            ×
          </button>

          {/* Header */}
          <div style={{ marginBottom: isMobile ? 20 : 30 }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 12,
                letterSpacing: '0.4em',
                color: project.color,
                margin: '0 0 10px',
              }}
            >
              PROJECT CASE STUDY
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: isMobile ? 32 : 56,
                fontWeight: 400,
                margin: 0,
                lineHeight: 1.1,
                color: '#ffffff',
                letterSpacing: '0.05em',
              }}
            >
              {project.title.toUpperCase()}
            </h2>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: `linear-gradient(90deg, ${project.color}, transparent)`,
              marginBottom: 30,
            }}
          />

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: isMobile ? 14 : 16,
              lineHeight: 1.8,
              color: '#cccccc',
              marginBottom: 35,
            }}
          >
            {project.longDescription}
          </p>

          {/* Technologies */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14,
                letterSpacing: '0.2em',
                color: project.color,
                marginBottom: 16,
              }}
            >
              TECHNOLOGIES USED
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: 14,
                    fontFamily: 'var(--font-display)',
                    padding: '6px 14px',
                    border: `1px solid ${project.color}66`,
                    color: '#ffffff',
                    letterSpacing: '0.1em',
                  }}
                >
                  {tech.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
