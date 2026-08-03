/**
 * Footer
 * Discrete single-line footer.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-black py-8 px-8 border-t border-orange-600/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        <p className="font-display text-[10px] text-slate-500 tracking-[0.5em] text-center md:text-left">
          IGOR LUNA © {year}
        </p>
        
        <div className="flex gap-8 justify-center">
          {[
            { name: 'GITHUB', url: 'https://github.com/IgorLuna10' },
            { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/igor-luna-27338b221/' }
          ].map((link) => (
            <a 
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-[10px] text-slate-500 tracking-[0.3em] hover:text-orange-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <p className="font-display text-[10px] text-slate-500 tracking-[0.2em] text-center md:text-right">
          BUILT WITH REACT
        </p>
      </div>
    </footer>
  )
}
