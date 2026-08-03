import { useDrag } from '@/hooks/useDrag'
import StickerSVG from './StickerSVG'

/**
 * DraggableSticker
 * A floating, draggable project shape.
 */
export default function DraggableSticker({ project, zIndex, onOpen }) {
  const { pos, isDragging, elRef, onMouseDown, onTouchStart } = useDrag({
    initialX: project.x,
    initialY: project.y,
    onClick:  () => onOpen(project),
  })

  return (
    <div
      ref={elRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        position: 'absolute',
        top: `${pos.y}%`,
        left: `${pos.x}%`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 300 : zIndex,
        userSelect: 'none',
        touchAction: 'none',
        willChange: 'transform, top, left',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: `translate3d(0,0,0) rotate(${project.rot}deg) scale(${isDragging ? 1.03 : 1})`,
        transition: isDragging ? 'none' : 'transform 0.3s var(--ease-out), top 0.3s var(--ease-out), left 0.3s var(--ease-out)',
      }}
      className="hover:scale-105 transition-transform"
    >
      <div className="relative group">
        {/* Industrial grey duct tape overlay */}
        <div 
          style={{
            position: 'absolute',
            top: -14,
            left: '50%',
            transform: `translateX(-50%) rotate(${project.id % 2 === 0 ? -6 : 8}deg)`,
            width: '80px',
            height: '20px',
            backgroundColor: 'rgba(39, 39, 42, 0.85)', // zinc-800 dark grey
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            zIndex: 10,
            pointerEvents: 'none',
            clipPath: 'polygon(0% 15%, 5% 0%, 95% 4%, 100% 16%, 98% 85%, 94% 100%, 8% 95%, 0% 80%)', // Jagged edges
          }}
          className="before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(45deg,rgba(0,0,0,0.15)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0.15)_75%,transparent_75%,transparent)] before:bg-[length:6px_6px] before:opacity-40"
        />

        <StickerSVG 
          shape={project.shape} 
          color={project.color} 
          title={project.title}
          projectId={project.id}
        />
        
        {/* Hover label - Brutalist Monospace Tooltip */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white text-white text-[9px] px-2.5 py-1 whitespace-nowrap tracking-wider font-mono shadow-[3px_3px_0px_#ea580c] z-20">
          EXPLORE_PROJECT_0{project.id}
        </div>
      </div>
    </div>
  )
}
