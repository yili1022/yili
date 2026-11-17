import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { Link, useRouter } from '../lib/router.jsx'
import { SITE } from '../data/site.js'

export function NycTime() {
  const [t, setT] = useState('')
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' }).format(new Date()))
    f()
    const id = setInterval(f, 20000)
    return () => clearInterval(id)
  }, [])
  return <span>New York · {t}</span>
}

const NAV = [
  { label: 'Work', to: '/', section: 'work' },
  { label: 'About', to: '/', section: 'about' },
  { label: 'Playground', to: '/playground' },
  { label: 'Contact', to: '/', section: 'contact' },
]

export function Header() {
  const { route } = useRouter()
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [route.path, route.section])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const k = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper">
      <a href="#main" className="sr-only-focusable btn btn-solid left-2 top-2 z-[60] bg-paper">Skip to content</a>
      <div className="flex h-14 items-center justify-between px-gutter">
        <Link to="/" className="flex items-baseline gap-2 font-display text-2xl leading-none" aria-label="Yi Li, home">
          Yi Li
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link key={n.label} {...n} className="u-link py-1 text-[15px] font-medium aria-[current=page]:underline aria-[current=page]:underline-offset-4">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span className="label hidden lg:inline"><NycTime /></span>
          <button className="chip-btn md:hidden" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu"
            aria-label="Mobile"
            className="fixed inset-x-0 bottom-0 top-14 flex flex-col justify-between bg-ink px-gutter pb-8 pt-6 text-paper md:hidden on-dark"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col">
              {NAV.map((n) => (
                <li key={n.label} className="border-b border-paper/20">
                  <Link {...n} onClick={() => { document.body.style.overflow = ''; setOpen(false) }} className="block py-4 font-display text-5xl font-bold tracking-tight">{n.label}</Link>
                </li>
              ))}
            </ul>
            <p className="label !text-paper/70"><NycTime /></p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-line px-gutter pb-10 pt-8">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-display text-3xl leading-none">Yi Li</p>
          <p className="label mt-2">Brand identity and interactive design, {SITE.school}.</p>
        </div>
        <ul className="label flex flex-wrap gap-x-5 gap-y-1">
          <li><a className="u-link" href={`mailto:${SITE.email}`}>Email</a></li>
          <li><a className="u-link" href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a className="u-link" href={SITE.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
          <li><a className="u-link" href={SITE.github} target="_blank" rel="noreferrer">GitHub</a></li>
        </ul>
      </div>
      <p className="label mt-8">© {new Date().getFullYear()} Yi Li. Try typing “hello”.</p>
    </footer>
  )
}

// A small dot that follows the pointer and grows into a label over [data-cursor] elements.
export function Cursor() {
  const reduce = useReducedMotion()
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 }), sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [label, setLabel] = useState('')
  const [fine, setFine] = useState(false)
  useEffect(() => {
    setFine(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])
  useEffect(() => {
    if (!fine) return
    const m = (e) => {
      x.set(e.clientX); y.set(e.clientY)
      const el = e.target.closest?.('[data-cursor]')
      setLabel(el ? el.dataset.cursor : '')
    }
    window.addEventListener('pointermove', m)
    return () => window.removeEventListener('pointermove', m)
  }, [fine, x, y])
  if (!fine || reduce) return null
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center rounded-full bg-ink font-mono text-[11px] text-paper"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: label ? 64 : 10, height: label ? 64 : 10, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      {label}
    </motion.div>
  )
}

export function Toast({ show, children }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.p
          role="status"
          className="label label-ink fixed bottom-4 left-4 z-[70] border border-ink bg-lime px-3 py-2"
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
