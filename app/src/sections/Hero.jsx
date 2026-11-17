import Monogram from '../components/Monogram.jsx'
import { Stamp, Swatches } from '../components/Bits.jsx'
import { Link } from '../lib/router.jsx'
import { SITE } from '../data/site.js'
import { motion, useReducedMotion } from 'framer-motion'

export default function Hero({ accentName, onPick }) {
  const reduce = useReducedMotion()
  const rise = (d) => reduce ? {} : { initial: { y: 36, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] } }
  return (
    <section id="top" aria-labelledby="hero-h" className="relative flex min-h-[100svh] flex-col justify-between px-gutter pb-10 pt-24 md:pt-28">
      <div className="flex items-start justify-between gap-6">
        <p className="label max-w-[24ch]">Brand identity + interactive design.<br />Senior at SVA, New York.</p>
        <Stamp className="-mt-1 h-24 w-24 shrink-0 text-ink md:h-36 md:w-36" />
      </div>

      <div className="my-10 md:my-12">
        <Monogram />
      </div>

      <div>
        <motion.h1 id="hero-h" {...rise(0.15)} className="max-w-[16ch] font-display text-[clamp(2.4rem,5.8vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.035em]" style={{ fontVariationSettings: '"wdth" 88' }}>
          Yi Li<span className="sr-only"> (GG)</span>. {SITE.headline}
        </motion.h1>
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <motion.p {...rise(0.3)} className="max-w-[46ch] text-lg leading-snug md:col-span-5 md:col-start-1">{SITE.intro}</motion.p>
          <motion.div {...rise(0.4)} className="flex flex-col gap-4 md:col-span-4 md:col-start-7">
            <Swatches current={accentName} onPick={onPick} />
            <p className="label">{SITE.invite}</p>
          </motion.div>
          <motion.div {...rise(0.5)} className="md:col-span-2 md:col-start-11 md:justify-self-end">
            <Link to="/" section="work" className="btn btn-solid" data-cursor="go">See the work</Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
