// Editable project entries. Real details only: anything not provided stays null
// and renders as a labelled placeholder. Replace null with your own text, and
// add `src: 'images/your-file.jpg'` to an image to swap a placeholder for the real thing
// (drop the file in app/public/images).
const PH = null

export const FEATURED = [
  {
    slug: 'canopy',
    title: 'CANOPY',
    discipline: 'Event Branding / Visual Identity',
    year: PH, // e.g. '2026'
    summary: 'An event brand and visual identity.',
    accent: 'var(--blue)',
    onAccent: 'var(--ink)',
    motif: 'rings',
    role: PH,
    tools: PH,
    sections: { context: PH, challenge: PH, process: PH, concepts: PH, deliverables: PH, reflection: PH },
    images: [
      { label: 'Hero image', aspect: '16/10', wide: true },
      { label: 'Logo and mark', aspect: '1/1' },
      { label: 'Color and type system', aspect: '1/1' },
      { label: 'Applications', aspect: '4/5' },
      { label: 'Signage or environment', aspect: '4/5' },
      { label: 'Detail', aspect: '16/10', wide: true },
    ],
  },
  {
    slug: 'dear-emma',
    title: 'Dear Emma',
    discipline: 'Interactive Website / Digital Experience',
    year: PH,
    summary: 'An interactive website and digital experience.',
    accent: 'var(--blush)',
    onAccent: 'var(--paper)',
    motif: 'bars',
    role: PH,
    tools: PH,
    sections: { context: PH, challenge: PH, process: PH, concepts: PH, deliverables: PH, reflection: PH },
    images: [
      { label: 'Hero screen', aspect: '16/10', wide: true },
      { label: 'Interaction detail', aspect: '4/5' },
      { label: 'Mobile view', aspect: '9/16' },
      { label: 'Layout system', aspect: '16/10', wide: true },
      { label: 'Screen recording', aspect: '16/10', wide: true },
    ],
  },
  {
    slug: 'mesa-verde',
    title: 'Mesa Verde',
    discipline: 'Interactive Web Experience',
    year: PH,
    summary: 'An interactive web experience.',
    accent: 'var(--lime)',
    onAccent: 'var(--paper)',
    motif: 'dots',
    role: PH,
    tools: PH,
    sections: { context: PH, challenge: PH, process: PH, concepts: PH, deliverables: PH, reflection: PH },
    images: [
      { label: 'Hero screen', aspect: '16/10', wide: true },
      { label: 'Scroll sequence', aspect: '4/5' },
      { label: 'Interaction detail', aspect: '4/5' },
      { label: 'Mobile view', aspect: '9/16' },
      { label: 'Screen recording', aspect: '16/10', wide: true },
    ],
  },
]

// Earlier work brought over from the previous portfolio. Descriptions are the originals.
export const MORE = [
  {
    slug: 'anchor-gin',
    title: 'Anchor Gin',
    discipline: 'Packaging / Brand identity',
    summary:
      'A conceptual craft gin brand inspired by the maritime history of Brooklyn’s waterfront and the anchor as a symbol of stability, navigation, and identity.',
    tags: ['Packaging design', 'Brand identity', 'Label system'],
    accent: 'var(--blue)', onAccent: 'var(--ink)', motif: 'rings',
  },
  {
    slug: 'poland-spring',
    title: 'Poland Spring',
    discipline: 'Packaging redesign',
    summary:
      'A redesign of Poland Spring as a modern, environmentally conscious water brand, using a refined, minimal packaging system.',
    tags: ['Packaging redesign', 'Brand identity', 'Sustainable system'],
    accent: 'var(--lime)', onAccent: 'var(--paper)', motif: 'dots',
  },
  {
    slug: 'panettone',
    title: 'Panettone',
    discipline: 'Packaging / Seasonal identity',
    summary:
      'A contemporary reinterpretation of a traditional Italian holiday dessert, presented through a refined, structured packaging system.',
    tags: ['Packaging design', 'Seasonal identity', 'Structural exploration'],
    accent: 'var(--blush)', onAccent: 'var(--paper)', motif: 'bars',
  },
  {
    slug: 'ten-principles',
    title: 'Ten Principles of Good Design',
    discipline: 'Poster design / Typography',
    summary:
      'A typographic poster series on Dieter Rams’ ten principles of good design, set entirely in Helvetica. An animated version was also produced.',
    tags: ['Poster design', 'Typography', 'Animation'],
    accent: 'var(--ink)', onAccent: 'var(--paper)', motif: 'bars',
  },
].map((p) => ({
  year: null,
  role: null,
  tools: null,
  sections: { context: p.summary, challenge: PH, process: PH, concepts: PH, deliverables: p.tags.join(', '), reflection: PH },
  images: [
    { label: 'Hero image', aspect: '16/10', wide: true },
    { label: 'Detail', aspect: '1/1' },
    { label: 'Detail', aspect: '1/1' },
    { label: 'System overview', aspect: '16/10', wide: true },
  ],
  ...p,
}))

export const ALL = [...FEATURED, ...MORE]
export const bySlug = (slug) => ALL.find((p) => p.slug === slug)
