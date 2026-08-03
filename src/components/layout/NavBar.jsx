import { useState, useEffect } from 'react'
import { useScrolled } from '@/hooks/useScrolled'
 
/**
 * NavBar
 * Minimal sticky navigation with mobile hamburger menu.
 */
export default function NavBar() {
  const scrolled = useScrolled(50)
  const [isOpen, setIsOpen] = useState(false)
 
  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'ABOUT', href: '#about' },
    { name: 'CONTACT', href: '#contact' },
  ]
 
  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
 
  // Prevent scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])
 
  return (
    <nav className="fixed top-0 left-0 w-full h-0 z-[500] pointer-events-none">
      {/* ── Background Layer ── */}
      {/* Uses inset-0 on top so it starts from the very top of the screen (behind safe area too) */}
      <div
        className={`absolute left-0 w-full transition-all duration-500 pointer-events-none ${
          isOpen
            ? 'bg-black opacity-100'
            : scrolled
              ? 'bg-black/90 backdrop-blur-md opacity-100 border-b border-orange-600/10'
              : 'bg-transparent opacity-0'
        }`}
        style={{
          top: 0,
          height: isOpen
            ? '100vh'
            : scrolled
              ? 'calc(5rem + env(safe-area-inset-top))'
              : 'calc(7rem + env(safe-area-inset-top))',
        }}
      />
 
      {/* ── Navbar Content ── */}
      {/* paddingTop pushes content below the notch/Dynamic Island */}
      <div
        className={`max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center relative z-10 transition-all duration-500 ${
          isOpen || scrolled ? 'h-20 md:h-24' : 'h-28 md:h-32'
        }`}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          className="font-display text-2xl md:text-3xl text-white tracking-widest uppercase pointer-events-auto"
          onClick={() => setIsOpen(false)}
        >
          IGORLUNA<span className="text-orange-600">.</span>
        </a>
 
        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-display text-sm text-white tracking-[0.3em] hover:text-orange-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
 
        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 pointer-events-auto relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-7 h-0.5 bg-white transition-all duration-300 absolute ${isOpen ? 'rotate-45' : '-translate-y-2'}`} />
          <span className={`w-7 h-0.5 bg-white transition-all duration-300 absolute ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-7 h-0.5 bg-white transition-all duration-300 absolute ${isOpen ? '-rotate-45' : 'translate-y-2'}`} />
        </button>
      </div>
 
      {/* ── Mobile Menu Overlay Links ── */}
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-12 mt-10">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-display text-4xl text-white tracking-[0.4em] transition-all duration-500 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${isOpen ? i * 100 : 0}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
 
        {/* Decorative background text */}
        <div className="absolute bottom-10 left-0 w-full text-center opacity-5 pointer-events-none">
          <p className="font-display text-[15vw] leading-none text-white tracking-widest">NAVIGATE</p>
        </div>
      </div>
    </nav>
  )
}
