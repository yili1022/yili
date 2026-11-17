import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

const CYCLE = ['var(--ink)', 'var(--accent)', 'var(--blush)', 'var(--lime)']

function Letter({ ch, index, label }) {
  const controls = useAnimationControls()
  const [ci, setCi] = useState(index % 2 ? 1 : 0)
  const dragged = useRef(false)
  useEffect(() => {
    const f = () => controls.start({ rotate: [0, -18, 14, -8, 0], y: [0, -60, 0], transition: { duration: 0.9, delay: index * 0.08 } })
    window.addEventListener('yl:burst', f)
    return () => window.removeEventListener('yl:burst', f)
  }, [controls, index])
  return (
    <motion.button
      type="button"
      aria-label={`${label}. Drag it, or click to change its color.`}
      data-cursor="drag"
      className="touch-none select-none font-display leading-[0.8]"
      style={{ color: CYCLE[ci], cursor: 'grab', transition: 'color .25s' }}
      drag
      dragSnapToOrigin
      dragElastic={0.35}
      animate={controls}
      whileHover={{ rotate: index % 2 ? 5 : -5, y: -8 }}
      whileDrag={{ scale: 1.12, rotate: 8, zIndex: 20 }}
      transition={{ type: 'spring', stiffness: 240, damping: 14 }}
      onDragStart={() => { dragged.current = true }}
      onClick={() => { if (dragged.current) { dragged.current = false; return } setCi((c) => (c + 1) % CYCLE.length) }}
    >
      {ch}
    </motion.button>
  )
}

export function BigName() {
  return (
    <div role="group" aria-label="Yi Li, set in four movable letters" className="flex items-end gap-[0.04em] text-[clamp(8rem,31vw,27rem)]">
      {['Y', 'i', 'L', 'i'].map((c, i) => (
        <span key={i} className={i === 1 ? 'mr-[0.18em]' : ''}><Letter ch={c} index={i} label={`Letter ${c}`} /></span>
      ))}
    </div>
  )
}

/* ---------- hand-drawn stickers (original doodles) ---------- */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 5, strokeLinecap: 'round', strokeLinejoin: 'round' }
const STICKERS = [
  { id: 'sun', w: 120, color: 'var(--accent)', pos: { top: '9%', left: '58%' }, rot: -8, svg: (
    <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="22" fill="currentColor" stroke="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <path key={a} {...S} d="M50 14 L50 4" transform={`rotate(${a + (a % 90 ? 4 : -3)} 50 50)`} />)}</svg>) },
  { id: 'star', w: 96, color: 'var(--blush)', pos: { top: '46%', left: '76%' }, rot: 12, svg: (
    <svg viewBox="0 0 100 100"><path d="M50 8 L61 38 L93 40 L68 60 L77 92 L50 74 L23 92 L32 60 L7 40 L39 38 Z" fill="currentColor" stroke="none" /></svg>) },
  { id: 'squig', w: 150, color: 'var(--ink)', pos: { top: '30%', left: '36%' }, rot: -4, svg: (
    <svg viewBox="0 0 150 50"><path {...S} d="M6 30 C 20 4, 30 4, 40 26 S 62 48, 74 24 S 96 2, 108 26 S 130 46, 144 18" /></svg>) },
  { id: 'arrow', w: 130, color: 'var(--accent)', pos: { top: '62%', left: '47%' }, rot: 14, svg: (
    <svg viewBox="0 0 130 60"><path {...S} d="M6 34 C 40 8, 80 8, 120 30 M120 30 L100 14 M120 30 L98 42" /></svg>) },
  { id: 'tag', w: 118, color: 'var(--ink)', pos: { top: '18%', left: '80%' }, rot: 9, tag: 'hello!' },
  { id: 'blob', w: 84, color: 'var(--lime)', pos: { top: '72%', left: '84%' }, rot: 0, svg: (
    <svg viewBox="0 0 100 100"><path d="M52 6 C 78 4, 96 28, 92 54 C 88 82, 60 96, 36 88 C 12 80, 4 52, 14 30 C 22 14, 38 8, 52 6 Z" fill="currentColor" stroke="none" /></svg>) },
]

export function Stickers({ boundsRef }) {
  const [seed, setSeed] = useState(0)
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block" aria-hidden="false">
        {STICKERS.map((s) => (
          <motion.div
            key={`${s.id}${seed}`}
            data-cursor="toss"
            drag
            dragConstraints={boundsRef}
            dragElastic={0.2}
            dragMomentum
            dragTransition={{ power: 0.35, timeConstant: 260 }}
            whileDrag={{ scale: 1.15, rotate: s.rot + 10 }}
            whileHover={{ rotate: s.rot - 6, scale: 1.06 }}
            initial={{ rotate: s.rot, scale: 0 }}
            animate={{ rotate: s.rot, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 12, delay: 0.5 }}
            className="pointer-events-auto absolute touch-none"
            style={{ ...s.pos, width: s.w, color: s.color, cursor: 'grab' }}
          >
            {s.tag ? (
              <span className="block border-2 border-current px-3 py-1 text-center font-hand text-3xl font-bold leading-tight">{s.tag}</span>
            ) : s.svg}
          </motion.div>
        ))}
      </div>
      <button type="button" className="chip-btn absolute bottom-3 right-[var(--gutter)] z-10 hidden sm:block" onClick={() => setSeed((n) => n + 1)}>Reset stickers</button>
    </>
  )
}
