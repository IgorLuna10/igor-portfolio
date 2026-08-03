import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import Home   from '@/components/sections/Home'
import Projects from '@/components/sections/Projects'
import About  from '@/components/sections/About'
import Contact from '@/components/sections/Contact'

/**
 * App
 * Root component for Igor Luna Portfolio.
 */
export default function App() {
  return (
    <div className="bg-black text-white selection:bg-orange-600 selection:text-white">
      <NavBar />
      <main>
        <Home />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
