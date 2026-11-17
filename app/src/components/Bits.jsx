import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const SWATCHES = [
  { name: 'Red', value: 'var(--blue)', on: '#f2e8d6', css: '#e63329' },
  { name: 'Cream', value: 'var(--lime)', on: '#151211', css: '#f2e8d6' },
  { name: 'Salmon', value: 'var(--blush)', on: '#151211', css: '#f08a7a' },
  { name: 'Gold', value: '#f2b33d', on: '#151211', css: '#f2b33d' },
]

export function Swatches({ current, onPick }) {
  return (
    <div role="group" aria-label="Site accent color" className="flex items-center gap-2">
      <span className="label mr-1">Accent</span>
      {SWATCHES.map((s) => (
        <button
          key={s.name}
          type="button"
          aria-label={s.name}
          aria-pressed={current === s.name}
          data-cursor="set"
          onClick={() => onPick(s)}
          className="h-8 w-8 border-[1.5px] border-ink/60 transition-transform hover:-translate-y-1 aria-pressed:-translate-y-1 aria-pressed:outline aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-ink"
          style={{ background: s.css }}
        />
      ))}
    </div>
  )
}

export function Stamp({ className = '' }) {
  const text = 'brand identity · interactive design · new york · '
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Brand identity, interactive design, New York">
      <defs><path id="circ" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" /></defs>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="58" fill="var(--accent)" />
      <g className="stamp-spin">
        <text fontFamily="DM Mono, monospace" fontSize="15" fill="currentColor">
          <textPath href="#circ" textLength="486" lengthAdjust="spacing">{text}</textPath>
        </text>
      </g>
      <text x="100" y="114" textAnchor="middle" fontFamily="Caveat Brush, cursive" fontSize="46" fill="var(--on-accent)">Yi Li</text>
    </svg>
  )
}

function Word({ children, progress, range }) {
  const o = useTransform(progress, range, [0.32, 1])
  return <motion.span style={{ opacity: o }} className="mr-[0.28em] inline-block">{children}</motion.span>
}

// Words light up one by one as the statement scrolls through the viewport.
export function WordReveal({ text, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.82', 'end 0.55'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) =>
        reduce ? (
          <span key={i} className="mr-[0.28em] inline-block" aria-hidden="true">{w}</span>
        ) : (
          <span key={i} aria-hidden="true"><Word progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1.6) / words.length)]}>{w}</Word></span>
        ),
      )}
    </p>
  )
}

export function Section({ id, label, children, className = '', dark = false }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`relative px-gutter py-20 md:py-28 ${dark ? 'on-dark bg-ink text-paper' : ''} ${className}`}>
      <h2 id={`${id}-h`} className={`label mb-8 ${dark ? '!text-paper/70' : ''}`}>{label}</h2>
      {children}
    </section>
  )
}

export function Wiggle({ text }) {
  return (
    <span className="wig" aria-label={text}>
      {text.split(' ').map((w, wi, arr) => (
        <span key={wi} aria-hidden="true">
          <span className="!inline whitespace-nowrap"><span className="!inline-block">{[...w].map((c, i) => <span key={i}>{c}</span>)}</span></span>
          {wi < arr.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
