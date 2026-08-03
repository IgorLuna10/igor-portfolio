import { projects } from '@/data/projects'

/**
 * Projects Section
 * Straightforward grid display of all projects.
 */
export default function Projects() {
  return (
    <section id="projects" className="bg-mid py-24 px-8 md:px-24 border-t border-orange-600/30">
      <div className="max-w-6xl mx-auto">
        <p className="font-display text-orange-600 text-xs tracking-[0.4em] mb-4">
          SELECTED WORKS
        </p>
        
        <h2 className="font-display text-6xl md:text-8xl text-white mb-16 tracking-tight">
          PROJECTS<span className="text-orange-600">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.map((project) => (
            <div key={project.id} className="group">
              <div 
                className="h-[1px] w-full bg-gradient-to-r from-orange-600 to-transparent mb-8" 
                aria-hidden="true" 
              />
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-4xl text-white group-hover:text-orange-500 transition-colors tracking-wide">
                  {project.title.toUpperCase()}
                </h3>
                <span className="font-display text-xs text-orange-600 mt-2">
                  0{project.id}
                </span>
              </div>

              <p className="font-body text-slate-300 text-sm leading-relaxed mb-6 italic">
                {project.description}
              </p>

              <p className="font-body text-slate-400 text-sm leading-relaxed mb-8">
                {project.longDescription}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="font-display text-sm text-slate-300 border border-slate-700 px-4 py-2 tracking-widest"
                  >
                    {tech.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
