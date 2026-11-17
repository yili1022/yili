import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from '../lib/router.jsx'
import Plate from '../components/Plate.jsx'
import { Section } from '../components/Bits.jsx'
import { FEATURED, MORE } from '../data/projects.js'

function Row({ p, onHover, active }) {
  return (
    <li className="border-t border-ink first:border-t-2 last:border-b">
      <Link
        to={`/work/${p.slug}`}
        data-cursor="open"
        onPointerEnter={() => onHover(p.slug)}
        onPointerLeave={() => onHover(null)}
        onFocus={() => onHover(p.slug)}
        onBlur={() => onHover(null)}
        className="group relative block overflow-hidden"
      >
        <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-snap group-hover:scale-y-100 group-focus-visible:scale-y-100" style={{ background: p.accent }} />
        <span className="relative flex flex-col gap-4 px-0 py-6 transition-[padding,color] duration-500 group-hover:px-4 md:flex-row md:items-end md:justify-between md:py-8" style={active ? { color: p.onAccent } : undefined}>
          <span className="block">
            <span className="block font-display text-[clamp(2.8rem,9.5vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">{p.title}</span>
            <span className="label mt-3 block" style={active ? { color: 'inherit' } : undefined}>{p.discipline}{p.year ? ` · ${p.year}` : ''}</span>
          </span>
          <span className="max-w-[34ch] text-base md:pb-2 md:text-right">{p.summary}</span>
        </span>
        {/* mobile: preview is always visible */}
        <span className="block px-0 pb-6 md:hidden">
          <Plate aspect="16/10" accent={p.accent} motif={p.motif} label={p.title} />
        </span>
      </Link>
    </li>
  )
}

function MoreRow({ p }) {
  return (
    <li className="border-t border-line last:border-b">
      <Link to={`/work/${p.slug}`} data-cursor="open" className="group grid items-baseline gap-2 py-5 md:grid-cols-12 md:gap-6">
        <span className="font-display text-3xl font-bold leading-none tracking-tight md:col-span-5 md:text-4xl"><span className="u-link">{p.title}</span></span>
        <span className="label md:col-span-3">{p.discipline}</span>
        <span className="max-w-[56ch] text-[15px] leading-snug md:col-span-4">{p.summary}</span>
      </Link>
    </li>
  )
}

export default function Work() {
  const [hover, setHover] = useState(null)
  const x = useMotionValue(0), y = useMotionValue(0), r = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 26 }), sy = useSpring(y, { stiffness: 220, damping: 26 }), sr = useSpring(r, { stiffness: 160, damping: 14 })
  const t = useRef()
  const move = (e) => {
    if (e.pointerType === 'touch') return
    x.set(e.clientX + 28); y.set(e.clientY - 120)
    r.set(Math.max(-9, Math.min(9, e.movementX * 0.6)))
    clearTimeout(t.current); t.current = setTimeout(() => r.set(0), 90)
  }
  const cur = FEATURED.find((p) => p.slug === hover)
  return (
    <Section id="work" label="Selected work" className="!pb-12">
      <div onPointerMove={move}>
        <ul>
          {FEATURED.map((p) => <Row key={p.slug} p={p} active={hover === p.slug} onHover={setHover} />)}
        </ul>
      </div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[300px] md:block"
        style={{ x: sx, y: sy, rotate: sr }}
        animate={{ opacity: cur ? 1 : 0, scale: cur ? 1 : 0.85 }}
        transition={{ duration: 0.25 }}
      >
        {cur && <Plate aspect="4/3" accent={cur.accent} motif={cur.motif} label={cur.title} />}
      </motion.div>

      <h3 className="label mb-4 mt-20">More work</h3>
      <ul>{MORE.map((p) => <MoreRow key={p.slug} p={p} />)}</ul>
    </Section>
  )
}
