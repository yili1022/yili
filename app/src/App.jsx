import { useEffect, useState } from 'react'
import { RouterProvider, useRouter } from './lib/router.jsx'
import { Cursor, Footer, Header, Toast } from './components/Chrome.jsx'
import Hero from './sections/Hero.jsx'
import Work from './sections/Work.jsx'
import { About, Contact, PlaygroundTeaser, Statement } from './sections/Rest.jsx'
import Project from './pages/Project.jsx'
import Playground from './pages/Playground.jsx'
import { bySlug } from './data/projects.js'
import { SITE } from './data/site.js'

function Home() {
  const [accent, setAccent] = useState('Ultramarine')
  const pick = (s) => {
    const r = document.documentElement.style
    r.setProperty('--accent', s.value)
    r.setProperty('--on-accent', s.on)
    setAccent(s.name)
  }
  return (
    <main id="main">
      <Hero accentName={accent} onPick={pick} />
      <Work />
      <Statement />
      <About />
      <PlaygroundTeaser />
      <Contact />
    </main>
  )
}

function Routes() {
  const { route } = useRouter()
  const m = route.path.match(/^\/work\/([\w-]+)$/)
  useEffect(() => {
    const p = m && bySlug(m[1])
    document.title = p ? `${p.title} — Yi Li (GG)` : route.path === '/playground' ? 'Playground — Yi Li (GG)' : 'Yi Li (GG) — Brand and interaction designer'
  }, [route.path, m])
  if (m) return <Project slug={m[1]} />
  if (route.path === '/playground') return <Playground />
  return <Home />
}

export default function App() {
  const [toast, setToast] = useState(false)
  useEffect(() => {
    console.log('%cYi Li (GG)', 'font:700 20px system-ui', '— hello. Email: ' + SITE.email)
    let buf = ''
    const k = (e) => {
      if (/input|textarea/i.test(e.target.tagName)) return
      buf = (buf + e.key.toLowerCase()).slice(-2)
      if (buf === 'gg') {
        window.dispatchEvent(new Event('gg:burst'))
        setToast(true); setTimeout(() => setToast(false), 2200)
      }
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])
  return (
    <RouterProvider>
      <Header />
      <Routes />
      <Footer />
      <Cursor />
      <Toast show={toast}>You found it. GG.</Toast>
    </RouterProvider>
  )
}
