import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'

const Ctx = createContext(null)
export const useRouter = () => useContext(Ctx)

function parse() {
  const h = window.location.hash.replace(/^#/, '') || '/'
  const [path, qs] = h.split('?')
  return { path: path || '/', section: new URLSearchParams(qs || '').get('s') }
}
export const hrefFor = (to, section) => `#${to}${section ? `?s=${section}` : ''}`

const BARS = ['var(--ink)', 'var(--blue)', 'var(--lime)', 'var(--blush)', 'var(--ink)']

export function RouterProvider({ children }) {
  const reduce = useReducedMotion()
  const [route, setRoute] = useState(parse)
  const [phase, setPhase] = useState('idle') // idle | in | out
  const lenis = useRef(null)
  const routeRef = useRef(route)
  routeRef.current = route

  // smooth scrolling on fine pointers only
  useEffect(() => {
    if (reduce || window.matchMedia('(pointer: coarse)').matches) return
    const l = new Lenis({ lerp: 0.12 })
    lenis.current = l
    let id
    const raf = (t) => { l.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); l.destroy(); lenis.current = null }
  }, [reduce])

  const scrollToId = useCallback((id, instant) => {
    const el = id ? document.getElementById(id) : null
    if (lenis.current) {
      if (el) lenis.current.scrollTo(el, { offset: -56, immediate: !!instant })
      else lenis.current.scrollTo(0, { immediate: true })
    } else if (el) el.scrollIntoView({ behavior: instant || reduce ? 'auto' : 'smooth' })
    else window.scrollTo(0, 0)
  }, [reduce])

  useEffect(() => {
    const f = () => setRoute(parse())
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])

  // after any route change: scroll to section or top
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; if (!route.section) return }
    const t = setTimeout(() => scrollToId(route.section, true), 30)
    return () => clearTimeout(t)
  }, [route.path, route.section, scrollToId])

  const go = useCallback((to, section) => {
    const cur = routeRef.current
    if (to === cur.path) {
      // same page: just scroll, and keep the hash in sync
      history.replaceState(null, '', hrefFor(to, section))
      scrollToId(section)
      return
    }
    const apply = () => { window.location.hash = hrefFor(to, section) }
    if (reduce) { apply(); return }
    setPhase('in')
    setTimeout(() => { apply(); setPhase('out'); setTimeout(() => setPhase('idle'), 700) }, 560)
  }, [reduce, scrollToId])

  return (
    <Ctx.Provider value={{ route, go, scrollToId }}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
        {BARS.map((c, i) => (
          <motion.div
            key={i}
            className="absolute top-0 h-full"
            style={{ left: `${i * 20}%`, width: '20.2%', background: c, originY: phase === 'out' ? 0 : 1 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase === 'in' ? 1 : 0 }}
            transition={{ duration: 0.42, delay: i * 0.04, ease: [0.76, 0, 0.24, 1] }}
          />
        ))}
      </div>
    </Ctx.Provider>
  )
}

export function Link({ to, section, className, children, onClick, ...rest }) {
  const { go, route } = useRouter()
  const current = route.path === to && !section ? 'page' : undefined
  return (
    <a
      href={hrefFor(to, section)}
      className={className}
      aria-current={current}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        onClick?.(e)
        go(to, section)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
