// ─────────────────────────────────────────────────────────────
// CUPID CINEMATIC — single source of truth for all site content.
// Edit this file only; components read everything from here.
//
// MEDIA: drop files into /public/media and reference them as
// "/media/filename.jpg". Any `image` left as null renders a
// styled placeholder frame, so the site never looks broken.
//
// VIDEO: `embed` accepts a Vimeo or YouTube URL. Do NOT use
// Google Drive links — Drive throttles and blocks streaming.
// `heroVideo` should be a short (8–15s), muted, ≤6 MB MP4 loop.
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: 'Cupid Cinematic',
  tagline: 'Wedding films that feel like memory, not footage.',
  region: 'Brisbane · Gold Coast · Sunshine Coast · Beyond',
  email: 'hello@cupidcinematic.com.au', // TODO: confirm
  phone: '', // TODO: optional
  instagram: 'https://instagram.com/', // TODO
  youtube: 'https://youtube.com/', // TODO
  vimeo: 'https://vimeo.com/', // TODO
  abn: '', // TODO: add once registered
  established: '2018',
}

export const hero = {
  eyebrow: 'Brisbane Wedding Films',
  line1: 'Cupid',
  line2: 'Cinematic',
  sub: 'for couples who would rather feel it than pose for it',
  heroVideo: '/media/hero-loop.mp4', // 12s cut from Wedding Reel (2019)
  heroPoster: '/media/hero-poster.jpg',
  cta: 'Check your date',
}

export const intro = {
  kicker: 'Hello, you two',
  headline: ['Honest,', 'unhurried', 'love stories', 'with a', 'filmic', 'soul'],
  body: [
    "I'm JM — a filmmaker with eight years behind the camera across commercial, documentary and live events. Weddings are where all of it comes together: real people, one chance, and a story that is already happening whether the camera is ready or not.",
    "I don't stage your day. I watch it closely, stay out of the way, and cut a film that sounds like your vows and moves like your people. Something you'll still want to press play on in twenty years.",
  ],
  images: [null, null, null],
  imageAlts: ['Couple embracing at golden hour', 'Bride laughing with bridesmaids', 'Hands with rings'],
}

export const films = [
  // From the Weddings folder on Drive. Stills are frames pulled from each film.
  // TODO: add venues and a Vimeo/YouTube `embed` for each.
  { couple: 'Gaselle & Paolo', venue: '', type: 'Cinematic Film', embed: '', image: '/media/films/gaselle-paolo.jpg', length: '10:17' },
  { couple: 'Stef & Gars', venue: '', type: 'Pre-Wedding Teaser', embed: '', image: '/media/films/stef-gars.jpg', length: '1:46' },
  { couple: 'Sohee & Lino', venue: '', type: 'Wedding Film', embed: '', image: '/media/films/sohee-lino.jpg', length: '5:45' },
  { couple: 'Sara & Ladd', venue: '', type: 'Highlight Film', embed: '', image: '/media/films/sara-ladd.jpg', length: '10:03' },
  { couple: 'Mikee & Aldwin', venue: '', type: 'Highlight Film', embed: '', image: '/media/films/mikee-aldwin.jpg', length: '4:17' },
  { couple: 'Rowena & James', venue: '', type: 'Save the Date', embed: '', image: '/media/films/rowena-james.jpg', length: '1:35' },
]

export const approach = [
  { n: 'I', title: 'Conversation first', body: 'A call (or coffee) to learn who you are, how you met, and what the day actually means to you. The film is built from this.' },
  { n: 'II', title: 'Quiet on the day', body: 'Minimal direction, natural light where possible, clean audio on vows and speeches. You and your guests forget I am there.' },
  { n: 'III', title: 'Story in the edit', body: 'Every film is cut around your own words — vows, letters, speeches — and colour graded by hand. No templates, no stock trends.' },
  { n: 'IV', title: 'Delivered with care', body: 'A private online gallery with your films in 4K, a social teaser within 7 days, and a final film within 8 weeks.' },
]

export const packages = [
  // TODO: validate pricing against your costs + local market before launch
  {
    name: 'The Vow',
    price: 'From $2,400',
    hours: '6 hours coverage',
    items: ['3–4 min highlight film', 'Ceremony edit (full)', '60s social teaser', 'Online gallery, 4K delivery'],
    note: 'For intimate weddings and smaller days.',
  },
  {
    name: 'The Story',
    price: 'From $3,600',
    hours: '9 hours coverage',
    items: ['5–7 min highlight film', 'Full ceremony + speeches edits', 'Drone coverage (venue permitting)', '60s social teaser', 'Raw audio of vows'],
    note: 'Most couples choose this.',
    featured: true,
  },
  {
    name: 'The Heirloom',
    price: 'From $5,200',
    hours: 'Full day + second shooter',
    items: ['12–20 min feature film', 'Highlight film', 'Full ceremony + speeches edits', 'Two filmmakers, drone', 'Keepsake USB in linen box'],
    note: 'For the couple who wants all of it.',
  },
]

export const elopement = {
  title: 'Elopements & intimate days',
  body: 'Two hours, a celebrant and a view. Films for small, brave weddings — from $1,450.',
}

export const testimonials = [
  // TODO: replace with real, verifiable reviews (Google / Easy Weddings). Never publish placeholder quotes.
  { quote: 'We cried the first time we watched it, and again every time since. He caught things we never saw on the day.', names: 'Amelia & Josh', venue: 'Maleny' },
  { quote: 'Calm, kind and somehow invisible. Our guests kept asking who the filmmaker was because he blended in so well.', names: 'Priya & Daniel', venue: 'Brisbane' },
  { quote: 'The film sounds like us. Our vows, our people, our weird jokes. It is the best money we spent on the wedding.', names: 'Hana & Reuben', venue: 'Noosa' },
]

export const faqs = [
  { q: 'How far ahead should we book?', a: 'Peak season (September–May) Saturdays usually book 9–14 months out. Weekday and winter dates are often available closer in.' },
  { q: 'Do you travel?', a: 'Yes. South East Queensland is included. Northern NSW and further afield are quoted on travel and accommodation only.' },
  { q: 'When will we get our film?', a: 'A social teaser within 7 days and your full films within 8 weeks. Rush delivery is available on request.' },
  { q: 'Do you work alongside our photographer?', a: 'Always. I coordinate with your photographer before the day so we share light and timing rather than compete for it.' },
  { q: 'How do we secure our date?', a: 'A signed agreement and a 30% retainer locks it in. The balance is due two weeks before the wedding.' },
]

export const inquiry = {
  headline: 'Tell me about your day',
  sub: 'Share a few details and I’ll reply within 48 hours with availability and a tailored quote.',
  success: 'Thank you — your note is on its way. I’ll be in touch within 48 hours.',
}
