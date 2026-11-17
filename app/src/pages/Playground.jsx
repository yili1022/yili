import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from '../lib/router.jsx'

function Card({ id, title, note, children, className = '' }) {
  return (
    <section aria-labelledby={id} className={`border-2 border-ink ${className}`}>
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink px-4 py-3">
        <h2 id={id} className="font-display text-xl font-bold">{title}</h2>
        <p className="label">{note}</p>
      </div>
      {children}
    </section>
  )
}

// Type that responds to the pointer using the font's width and weight axes.
function TypePull() {
  const [w, setW] = useState(500)
  const [wd, setWd] = useState(88)
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setW(Math.round(300 + ((e.clientX - r.left) / r.width) * 500))
    setWd(Math.round(75 + ((e.clientY - r.top) / r.height) * 25))
  }
  return (
    <Card id="pull" title="Type pull" note="Move over the letters. Variable weight and width.">
      <div onPointerMove={move} className="touch-none select-none overflow-hidden px-4 py-10 text-center" data-cursor="pull">
        <p aria-label="Yi Li" className="font-display text-[clamp(5rem,22vw,17rem)] leading-[0.9] tracking-[-0.04em]" style={{ fontWeight: w, fontVariationSettings: `"wdth" ${wd}` }}>Yi Li</p>
      </div>
      <div className="flex flex-wrap items-center gap-6 border-t-2 border-ink px-4 py-3">
        <label className="label flex items-center gap-3">Weight {w}<input type="range" min="300" max="800" value={w} onChange={(e) => setW(+e.target.value)} className="accent-[var(--ink)]" /></label>
        <label className="label flex items-center gap-3">Width {wd}<input type="range" min="75" max="100" value={wd} onChange={(e) => setWd(+e.target.value)} className="accent-[var(--ink)]" /></label>
      </div>
    </Card>
  )
}

const SHAPES = [
  { d: 'M0 100 A100 100 0 0 1 100 0 L100 40 A60 60 0 0 0 40 100 Z', c: 'var(--ink)' },
  { d: 'M0 60 H100 V100 H0 Z', c: 'var(--blue)' },
  { d: 'M0 0 A100 100 0 0 0 100 100 L100 60 A60 60 0 0 1 40 0 Z', c: 'var(--lime)' },
  { d: 'M50 0 A50 50 0 1 1 49.9 0 Z', c: 'var(--blush)' },
  { d: 'M0 100 A100 100 0 0 0 100 0 L60 0 A60 60 0 0 1 0 60 Z', c: 'var(--blue)' },
  { d: 'M0 50 A50 50 0 0 1 100 50 Z', c: 'var(--ink)' },
  { d: 'M20 0 H80 V100 H20 Z', c: 'var(--lime)' },
  { d: 'M0 0 H100 L50 100 Z', c: 'var(--blush)' },
]
const grid = (_, i) => ({ x: ((i % 4) - 1.5) * 112, y: (Math.floor(i / 4) - 0.5) * 120, r: 0 })
const rnd = () => ({ x: Math.random() * 240 - 120, y: Math.random() * 120 - 60, r: Math.random() * 360 })

function TileKit() {
  const stage = useRef(null)
  const reduce = useReducedMotion()
  const [pos, setPos] = useState(() => SHAPES.map(grid))
  return (
    <Card id="kit" title="Tile kit" note="Drag the shapes. Build anything.">
      <div ref={stage} className="relative h-[360px] overflow-hidden bg-[color-mix(in_srgb,var(--ink)_5%,var(--paper))] md:h-[460px]" style={{ backgroundImage: 'radial-gradient(var(--line) 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
        {SHAPES.map((s, i) => (
          <motion.button
            key={i}
            type="button"
            aria-label={`Shape ${i + 1}. Drag to move.`}
            data-cursor="drag"
            drag
            dragConstraints={stage}
            dragMomentum={false}
            whileDrag={{ scale: 1.1 }}
            animate={{ x: pos[i].x, y: pos[i].y, rotate: pos[i].r }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 14 }}
            className="absolute left-[calc(50%-48px)] top-[calc(50%-48px)] h-24 w-24 touch-none"
            style={{ cursor: 'grab' }}
          >
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true"><path d={s.d} fill={s.c} /></svg>
          </motion.button>
        ))}
      </div>
      <div className="flex gap-2 border-t-2 border-ink px-4 py-3">
        <button className="chip-btn" onClick={() => setPos(SHAPES.map(rnd))}>Scatter</button>
        <button className="chip-btn" onClick={() => setPos(SHAPES.map(grid))}>Reset</button>
      </div>
    </Card>
  )
}

function DimYum() {
  return (
    <Card id="dimyum" title="Dim Yum logo animation" note="Motion · brand identity">
      <video className="w-full bg-ink" controls playsInline preload="metadata" poster="images/dimyum-poster.jpg" src="videos/dimyum.mp4" aria-label="Dim Yum logo animation" />
      <p className="max-w-[60ch] px-4 py-4">Logo animation for Dim Yum, a brand built around dim sum, yumcha and cocktails.</p>
    </Card>
  )
}

export default function Playground() {
  return (
    <main id="main" className="px-gutter pb-24 pt-28 md:pt-32">
      <Link to="/" className="label u-link" data-cursor="back">Back home</Link>
      <h1 className="mt-6 max-w-[12ch] font-display text-[clamp(3.4rem,11vw,10rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">Playground</h1>
      <p className="mt-6 max-w-[48ch] text-lg">Small experiments that don’t belong to a client. Some of them are for testing an idea, and some are just for fun.</p>
      <div className="mt-12 grid gap-8">
        <TypePull />
        <div className="grid gap-8 lg:grid-cols-2">
          <TileKit />
          <DimYum />
        </div>
      </div>
    </main>
  )
}
