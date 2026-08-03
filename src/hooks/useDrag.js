import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * useDrag
 * Reusable drag logic for absolutely-positioned elements.
 * Position is expressed as percentages relative to the parent container.
 * Supports both Mouse and Touch events.
 *
 * @param {object} options
 * @param {number} options.initialX   — starting x% (0–88)
 * @param {number} options.initialY   — starting y% (0–88)
 * @param {function} options.onClick  — called when the element is clicked (not dragged)
 *
 * @returns {{ pos, isDragging, elRef, onMouseDown, onTouchStart }}
 */
export function useDrag({ initialX, initialY, onClick }) {
  const [pos, setPos] = useState({ x: initialX, y: initialY })
  const [isDragging, setIsDragging] = useState(false)
  const hasMoved = useRef(false)
  const dragStart = useRef(null)
  const elRef = useRef(null)

  const startDragging = (clientX, clientY) => {
    setIsDragging(true)
    hasMoved.current = false
    dragStart.current = {
      mx: clientX,
      my: clientY,
      px: pos.x,
      py: pos.y,
    }
  }

  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    startDragging(e.clientX, e.clientY)
  }, [pos])

  const onTouchStart = useCallback((e) => {
    const touch = e.touches[0]
    startDragging(touch.clientX, touch.clientY)
  }, [pos])

  useEffect(() => {
    if (!isDragging) return

    const onMove = (clientX, clientY) => {
      const dx = clientX - dragStart.current.mx
      const dy = clientY - dragStart.current.my

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        hasMoved.current = true
      }

      const parentW = elRef.current?.offsetParent?.offsetWidth  || 1000
      const parentH = elRef.current?.offsetParent?.offsetHeight || 700

      // Calculate new position in percentages
      // We use 80 as max to prevent stickers from going off screen too much on small devices
      const maxX = window.innerWidth < 768 ? 70 : 88
      const maxY = window.innerWidth < 768 ? 80 : 88

      setPos({
        x: Math.max(0, Math.min(maxX, dragStart.current.px + (dx / parentW) * 100)),
        y: Math.max(0, Math.min(maxY, dragStart.current.py + (dy / parentH) * 100)),
      })
    }

    const onMouseMove = (e) => onMove(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      // Prevent scrolling while dragging
      if (e.cancelable) e.preventDefault()
      onMove(e.touches[0].clientX, e.touches[0].clientY)
    }

    const onEnd = () => {
      setIsDragging(false)
      if (!hasMoved.current && typeof onClick === 'function') {
        onClick()
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onEnd)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onEnd)
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onEnd)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [isDragging, onClick])

  return { pos, isDragging, elRef, onMouseDown, onTouchStart }
}
