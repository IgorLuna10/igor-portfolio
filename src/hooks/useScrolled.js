import { useState, useEffect } from 'react'

/**
 * useScrolled
 * Returns true once the page has scrolled past `threshold` pixels.
 * Used to trigger the nav bar frosted-glass effect.
 */
export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
