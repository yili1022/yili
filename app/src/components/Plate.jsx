// Image slot. Shows the real image when `src` is set, otherwise a labelled
// placeholder with the aspect ratio written on it so nothing is a mystery box.
const MOTIFS = {
  rings: (
    <>
      <circle cx="80" cy="100" r="78" fill="var(--ink)" />
      <circle cx="80" cy="100" r="56" fill="var(--paper)" />
      <circle cx="80" cy="100" r="34" fill="var(--ink)" />
      <circle cx="80" cy="100" r="14" fill="var(--paper)" />
    </>
  ),
  bars: (
    <>
      {[14, 34, 54, 74, 94, 114, 134].map((x, i) => (
        <rect key={x} x={x} y={100 - (28 + ((i * 23) % 56))} width="14" height={28 + ((i * 23) % 56)} fill={i % 3 === 0 ? 'var(--paper)' : 'var(--ink)'} />
      ))}
      <circle cx="120" cy="28" r="14" fill="var(--paper)" />
    </>
  ),
  dots: (
    <>
      {Array.from({ length: 24 }, (_, i) => {
        const c = i % 8, r = Math.floor(i / 8)
        return <circle key={i} cx={20 + c * 17} cy={22 + r * 28} r={(i * 7) % 5 === 0 ? 11 : 6} fill={(i + r) % 2 ? 'var(--ink)' : 'var(--paper)'} />
      })}
    </>
  ),
}

export default function Plate({ aspect = '16/10', label, accent = 'var(--blue)', motif = 'rings', src, alt = '', className = '', note = true }) {
  const ratio = aspect.replace('/', ':')
  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: aspect, background: accent }}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <>
          <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {MOTIFS[motif]}
          </svg>
          {note && (
            <span className="label label-ink absolute bottom-2 left-2 bg-paper px-1.5 py-0.5">
              {label ? `${label} · ` : ''}placeholder {ratio}
            </span>
          )}
        </>
      )}
    </div>
  )
}
