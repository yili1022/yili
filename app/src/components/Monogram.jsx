import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

const PATHS = {
  tl: 'M0 100 A100 100 0 0 1 100 0 L100 40 A60 60 0 0 0 40 100 Z',
  bl: 'M0 0 A100 100 0 0 0 100 100 L100 60 A60 60 0 0 1 40 0 Z',
  br: 'M0 100 A100 100 0 0 0 100 0 L60 0 A60 60 0 0 1 0 60 Z',
  bar: 'M0 60 H100 V100 H0 Z',
}
const CELLS = [
  ['tl', 0, 0], ['bar', 1, 0], ['bl', 0, 1], ['br', 1, 1],
]
const CYCLE = ['var(--ink)', 'var(--accent)', 'var(--lime)', 'var(--blush)', 'var(--blue)']
const START = [
  ['var(--ink)', 'var(--accent)', 'var(--ink)', 'var(--ink)'],
  ['var(--accent)', 'var(--ink)', 'var(--lime)', 'var(--blush)'],
]

function Tile({ kind, gx, gy, color, onCycle, index, label }) {
  const controls = useAnimationControls()
  const dragged = useRef(false)
  useEffect(() => {
    const f = () => controls.start({ rotate: [0, 360], scale: [1, 0.7, 1], transition: { duration: 0.9, delay: index * 0.06, ease: [0.76, 0, 0.24, 1] } })
    window.addEventListener('gg:burst', f)
    return () => window.removeEventListener('gg:burst', f)
  }, [controls, index])
  return (
    <motion.button
      type="button"
      aria-label={`${label}. Click to change color, or drag.`}
      data-cursor="drag"
      className="absolute touch-none"
      style={{ left: `calc(var(--t) * ${gx})`, top: `calc(var(--t) * ${gy})`, width: 'calc(var(--t) + 0.6px)', height: 'calc(var(--t) + 0.6px)', cursor: 'grab' }}
      drag
      dragSnapToOrigin
      dragElastic={0.3}
      animate={controls}
      whileHover={{ rotate: index % 2 ? -7 : 7, scale: 1.04 }}
      whileDrag={{ scale: 1.12, rotate: 9, zIndex: 20 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      onDragStart={() => { dragged.current = true }}
      onClick={() => { if (dragged.current) { dragged.current = false; return } onCycle() }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-hidden="true">
        <path d={PATHS[kind]} style={{ fill: color, transition: 'fill .3s' }} />
      </svg>
    </motion.button>
  )
}

export default function Monogram() {
  const [colors, setColors] = useState(START)
  const cycle = (g, i) =>
    setColors((c) => c.map((row, gi) => (gi === g ? row.map((v, vi) => (vi === i ? CYCLE[(CYCLE.indexOf(v) + 1) % CYCLE.length] : v)) : row)))
  return (
    <div className="gg-mark" role="group" aria-label="GG monogram, made of eight movable tiles">
      {[0, 1].map((g) =>
        CELLS.map(([kind, x, y], i) => (
          <Tile
            key={`${g}${i}`}
            kind={kind}
            gx={x + g * 2.3}
            gy={y}
            index={g * 4 + i}
            color={colors[g][i]}
            onCycle={() => cycle(g, i)}
            label={`${g ? 'Second' : 'First'} G, tile ${i + 1}`}
          />
        )),
      )}
    </div>
  )
}
