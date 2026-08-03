/**
 * About Section
 */
export default function About() {
  return (
    <section id="about" className="bg-dark py-24 px-8 md:px-24">
      <div className="max-w-4xl mx-auto">
        <p className="font-display text-orange-600 text-xs tracking-[0.4em] mb-4">
          BIO / BACKGROUND
        </p>
        
        <h2 className="font-display text-6xl md:text-8xl text-white mb-12 tracking-tight">
          BUILDING <span className="italic font-serif text-orange-700">SYSTEMS</span> FOR THE FUTURE.
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-body text-slate-300 leading-relaxed text-lg italic">
              "I used to be a sailor, but I can't sail in Paris, so I need to code."
            </p>
          </div>
          
          <div className="space-y-6">
            <p className="font-body text-slate-400 leading-relaxed">
              Currently based in Paris, I am a Junior Developer interested in Backend Architecture, Computer Vision and Machine Learning.
            <br/><br/>  
              I spend my time building backend architecture, developing for the web, and hunting for an occasional good cup of coffee or a well-made cocktail. 
            <br/><br/>   
              While my long-term goal is to move my life and career to Hong Kong, I am currently based in Paris and actively looking for my next challenge here.
            </p>
            
            <div className="space-y-4 pt-4">
              <h3 className="font-display text-white text-lg tracking-widest">TECHNICAL SKILLS</h3>
              <ul className="grid grid-cols-1 gap-2">
                {[
                  "SaaS & Web Development",
                  "Python & JavaScript",
                  "PyTorch & TensorFlow",
                  "React & Vite",
                ].map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-orange-600"></div>
                    <span className="font-display text-slate-200 tracking-wider text-sm">{skill.toUpperCase()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
