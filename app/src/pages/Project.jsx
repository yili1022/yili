import { Link } from '../lib/router.jsx'
import Plate from '../components/Plate.jsx'
import { ALL, bySlug } from '../data/projects.js'
import { SITE } from '../data/site.js'

const BLOCKS = [
  ['context', 'Context'], ['challenge', 'Challenge'], ['process', 'Process'],
  ['concepts', 'Concepts'], ['deliverables', 'Deliverables'], ['reflection', 'Reflection'],
]

export default function Project({ slug }) {
  const p = bySlug(slug)
  if (!p) {
    return (
      <main id="main" className="px-gutter pb-24 pt-32">
        <h1 className="font-display text-5xl font-bold">That project isn’t here.</h1>
        <p className="mt-4"><Link to="/" section="work" className="btn">Back to the work</Link></p>
      </main>
    )
  }
  const i = ALL.indexOf(p)
  const next = ALL[(i + 1) % ALL.length]
  return (
    <main id="main" className="pb-0 pt-14">
      <header className="px-gutter pb-10 pt-12 md:pt-20" style={{ background: p.accent, color: p.onAccent }}>
        <Link to="/" section="work" className="label !text-current u-link" data-cursor="back">Back to work</Link>
        <h1 className="mt-8 font-display text-[clamp(4rem,15vw,15rem)] leading-[0.9]">{p.title}</h1>
        <p className="mt-6 max-w-[40ch] text-xl leading-snug">{p.summary}</p>
      </header>

      <div className="px-gutter py-10">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-b border-ink pb-8 md:grid-cols-4">
          {[['Discipline', p.discipline], ['Year', p.year], ['Role', p.role], ['Tools', p.tools]].map(([k, v]) => (
            <div key={k}>
              <dt className="label">{k}</dt>
              <dd className={v ? 'mt-1' : 'label mt-1 border border-dashed border-line px-2 py-1'}>{v || (SITE.showPlaceholders ? `Add ${k.toLowerCase()}` : '—')}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="px-gutter">
        {p.video ? (
          <video className="w-full bg-ink" controls playsInline preload="metadata" poster={p.video.poster} src={p.video.src} aria-label={`${p.title} animation`} />
        ) : (
          <Plate aspect={p.images[0].aspect} accent={p.accent} motif={p.motif} label={p.images[0].label} src={p.images[0].src} alt={`${p.title}: ${p.images[0].label}`} />
        )}
      </div>

      <div className="grid gap-x-12 gap-y-10 px-gutter py-16 md:grid-cols-12 md:py-24">
        {BLOCKS.map(([k, label]) => {
          const text = p.sections[k]
          if (!text && !SITE.showPlaceholders) return null
          return (
            <section key={k} aria-labelledby={`${k}-h`} className="md:col-span-6 md:[&:nth-child(even)]:col-start-7">
              <h2 id={`${k}-h`} className="font-display text-4xl">{label}</h2>
              {text ? (
                <p className="mt-3 max-w-[52ch] text-lg leading-relaxed">{text}</p>
              ) : (
                <p className="mt-3 max-w-[52ch] border border-dashed border-line p-4">
                  <span className="label block">Placeholder</span>
                  Write the {label.toLowerCase()} for {p.title} in <code className="font-mono text-sm">src/data/projects.js</code>.
                </p>
              )}
            </section>
          )
        })}
      </div>

      <div className="grid gap-4 px-gutter pb-20 md:grid-cols-2 md:gap-6">
        {(p.video ? [] : p.images.slice(1)).map((im, n) => (
          <div key={n} className={im.wide ? 'md:col-span-2' : ''}>
            <Plate aspect={im.aspect} accent={p.accent} motif={p.motif} label={im.label} src={im.src} alt={`${p.title}: ${im.label}`} />
          </div>
        ))}
      </div>

      <Link to={`/work/${next.slug}`} data-cursor="next" className="group block border-t-2 border-ink px-gutter py-10 transition-colors hover:bg-ink hover:text-paper">
        <span className="label !text-current">Next project</span>
        <span className="mt-2 block font-display text-[clamp(3.2rem,10vw,9rem)] leading-[0.95]">{next.title}</span>
      </Link>
    </main>
  )
}
