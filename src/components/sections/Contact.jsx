/**
 * Contact Section
 */
export default function Contact() {
  return (
    <section id="contact" className="bg-mid py-24 px-8 md:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-display text-orange-600 text-xs tracking-[0.4em] mb-4">
          GET IN TOUCH
        </p>
        
        <h2 className="font-display text-5xl md:text-7xl text-white mb-8 tracking-tight">
          LET'S <span className="italic font-serif text-orange-700">CONNECT</span>
        </h2>
        
        <p className="font-body text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed">
          Currently open to collaborations in system architecture, ML research, and high-performance computing.
        </p>
        
        <a 
          href="mailto:igor.luna.it@gmail.com"
          className="inline-block font-display text-2xl md:text-3xl text-white border-b border-orange-600 pb-2 hover:text-orange-400 transition-colors tracking-widest mb-16"
        >
          igor.luna.it@gmail.com
        </a>

        <div className="flex flex-col items-center gap-4">
          <h3 className="font-display text-white text-sm tracking-[0.5em] mb-4">EXTERNAL LINKS</h3>
          <ul className="flex flex-col md:flex-row gap-8 md:gap-16">
            {[
              { name: 'GITHUB', url: 'https://github.com/IgorLuna10' },
              { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/igor-luna-27338b221/' }
            ].map((link) => (
              <li key={link.name}>
                <a 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group transition-colors"
                >
                  <div className="w-8 h-[1px] bg-orange-600 group-hover:w-12 transition-all"></div>
                  <span className="font-display text-slate-200 tracking-[0.3em] text-sm group-hover:text-orange-600">
                    {link.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
