import { useRef } from 'react'
import { BigName, Stickers } from '../components/Lettering.jsx'
import { Stamp, Swatches } from '../components/Bits.jsx'
import { Link } from '../lib/router.jsx'
import { SITE } from '../data/site.js'
import { motion, useReducedMotion } from 'framer-motion'

export default function Hero({ accentName, onPick }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const rise = (d) => reduce ? {} : { initial: { y: 36, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] } }
  return (
    <section ref={ref} id="top" aria-labelledby="hero-h" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-gutter pb-14 pt-24 md:pt-28">
      <div className="flex items-start justify-between gap-6">
        <p className="label max-w-[24ch]">Brand identity + interactive design.<br />Senior at SVA, New York.</p>
        <Stamp className="-mt-1 h-24 w-24 shrink-0 text-ink md:h-36 md:w-36" />
      </div>

      <div className="my-6 md:my-8"><BigName /></div>

      <div>
        <motion.h1 id="hero-h" {...rise(0.15)} className="max-w-[20ch] font-display text-[clamp(2.6rem,5.6vw,5.6rem)] leading-[1.02]">
          <span className="sr-only">Yi Li. </span>{SITE.headline}
        </motion.h1>
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <motion.p {...rise(0.3)} className="max-w-[46ch] text-lg leading-snug md:col-span-5">{SITE.intro}</motion.p>
          <motion.div {...rise(0.4)} className="flex flex-col gap-4 md:col-span-4 md:col-start-7">
            <Swatches current={accentName} onPick={onPick} />
            <p className="font-hand text-2xl leading-none text-accent">{SITE.invite}</p>
          </motion.div>
          <motion.div {...rise(0.5)} className="md:col-span-2 md:col-start-11 md:justify-self-end">
            <Link to="/" section="work" className="btn btn-solid" data-cursor="go">See the work</Link>
          </motion.div>
        </div>
      </div>
      <Stickers boundsRef={ref} />
    </section>
  )
}
