import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from '../lib/router.jsx'
import { Section, WordReveal } from '../components/Bits.jsx'
import { ABOUT, SITE } from '../data/site.js'
import Plate from '../components/Plate.jsx'

export function Statement() {
  return (
    <section aria-label="Philosophy" className="on-dark bg-ink px-gutter py-28 text-paper md:py-44">
      <WordReveal text={SITE.philosophy} className="max-w-[20ch] font-display text-[clamp(2.2rem,6.4vw,6.4rem)] font-bold leading-[1] tracking-[-0.03em] md:max-w-[22ch]" />
    </section>
  )
}

export function About() {
  return (
    <Section id="about" label="About">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="max-w-[26ch] font-display text-[clamp(1.9rem,3.6vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.025em]">{ABOUT.lead}</p>
          <div className="mt-8 max-w-[58ch] space-y-5 text-lg leading-relaxed">
            {ABOUT.body.map((t) => <p key={t}>{t}</p>)}
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="relative mx-auto max-w-sm md:mx-0 md:ml-auto">
            <span className="tape -top-3 left-8 -rotate-6" aria-hidden="true" />
            <span className="tape -top-3 right-8 rotate-3" aria-hidden="true" />
            <div className="rotate-[1.2deg]">
              <Plate aspect="4/5" accent="var(--blush)" motif="rings" label="Portrait" />
            </div>
          </div>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="label">How I work</dt>
              <dd><ul className="mt-2 space-y-1">{ABOUT.approach.map((a) => <li key={a} className="border-b border-line py-1.5">{a}</li>)}</ul></dd>
            </div>
            <div>
              <dt className="label">Interested in</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {ABOUT.interests.map((i) => <span key={i} className="border-[1.5px] border-ink px-2.5 py-1 text-sm">{i}</span>)}
              </dd>
            </div>
            <div>
              <dt className="label">Right now</dt>
              <dd><ul className="mt-2 space-y-1">{ABOUT.now.map((a) => <li key={a}>{a}</li>)}</ul></dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  )
}

export function PlaygroundTeaser() {
  return (
    <section id="playground-teaser" aria-labelledby="pt-h" className="relative overflow-hidden bg-lime px-gutter py-20 md:py-28">
      <h2 id="pt-h" className="label label-ink mb-8">Playground</h2>
      <div className="grid items-end gap-10 md:grid-cols-12">
        <p className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.035em] md:col-span-8">Experiments, side quests and moving type.</p>
        <div className="md:col-span-4">
          <p className="mb-5 max-w-[38ch]">A separate room for things that aren’t client-shaped: a variable-type toy, a tile kit and the Dim Yum logo animation.</p>
          <Link to="/playground" className="btn btn-solid" data-cursor="go">Open the playground</Link>
        </div>
      </div>
      <motion.svg aria-hidden="true" viewBox="0 0 100 100" className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 md:h-80 md:w-80" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
        <path d="M0 100 A100 100 0 0 1 100 0 L100 40 A60 60 0 0 0 40 100 Z" fill="var(--ink)" opacity="0.9" />
      </motion.svg>
    </section>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(SITE.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { window.location.href = `mailto:${SITE.email}` }
  }
  const resume = SITE.resume
    ? { href: SITE.resume, label: 'Download resume', props: { download: true } }
    : { href: `mailto:${SITE.email}?subject=Resume%20request`, label: 'Request my resume', props: {} }
  return (
    <Section id="contact" label="Contact" dark>
      <p className="max-w-[14ch] font-display text-[clamp(2.6rem,8vw,8rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">Let’s make something.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a className="font-display text-[clamp(1.4rem,3.2vw,2.6rem)] font-semibold tracking-tight underline decoration-2 underline-offset-8" href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <button type="button" onClick={copy} className="chip-btn !border-paper !bg-ink !text-paper hover:!bg-paper hover:!text-ink sm:ml-4" aria-live="polite">{copied ? 'Copied' : 'Copy email'}</button>
      </div>
      <ul className="mt-12 flex flex-wrap gap-3">
        <li><a className="btn" href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li><a className="btn" href={SITE.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
        <li><a className="btn" href={SITE.github} target="_blank" rel="noreferrer">GitHub</a></li>
        <li><a className="btn btn-solid !border-paper !bg-paper !text-ink" href={resume.href} {...resume.props}>{resume.label}</a></li>
      </ul>
    </Section>
  )
}
