import { useEffect, useState } from 'react'
import { Media, Arrow, ArrowMark, useEscape } from './ui.jsx'
import { brand, hero, intro, films, approach, packages, elopement, testimonials, faqs } from '../data/site.js'

/* ── HERO ─────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="bg">
        {hero.heroVideo ? (
          <video src={hero.heroVideo} poster={hero.heroPoster || undefined} autoPlay muted loop playsInline preload="auto" />
        ) : hero.heroPoster ? (
          <img src={hero.heroPoster} alt="" />
        ) : (
          <div className="ph"><div className="glow" /></div>
        )}
      </div>
      <div className="hero-inner">
        <div className="eyebrow label reveal"><i />{hero.eyebrow}<i /></div>
        <ArrowMark className="arrow-mark reveal" />
        <h1 className="display reveal">
          <span className="l1">{hero.line1}</span>
          <span className="l2">{hero.line2}</span>
        </h1>
        <p className="sub reveal">{hero.sub}</p>
        <a href="#inquire" className="btn reveal">{hero.cta}<Arrow /></a>
      </div>
      <div className="meta label">
        <span className="scroll-cue"><i />Scroll</span>
        <span className="region">{brand.region}</span>
      </div>
    </section>
  )
}

/* ── INTRO ────────────────────────────────────────────────── */
export function Intro() {
  const [a, b, c] = intro.images
  return (
    <section className="section intro" id="about">
      <div className="wrap grid">
        <div className="left reveal">
          <Media src={a} alt={intro.imageAlts[0]} className="a arch" light label="Still · 3:4" />
          <Media src={b} alt={intro.imageAlts[1]} className="b" label="Still · 3:4" />
          <span className="vert label">Est. {brand.established}</span>
        </div>
        <div className="center reveal">
          <span className="label clay">{intro.kicker}</span>
          <h2 className="display">
            Honest, <span className="it">unhurried</span><br />
            love stories with a{' '}
            <span className="circled">
              <span className="it">filmic</span>
              <svg viewBox="0 0 120 50" preserveAspectRatio="none" aria-hidden="true">
                <path d="M8 28 C 6 8, 110 2, 114 22 C 118 44, 20 50, 6 32 C 0 22, 30 8, 70 9" fill="none" stroke="currentColor" strokeWidth=".8" />
              </svg>
            </span>{' '}soul
          </h2>
          <div className="body">
            {intro.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="sig">— JM</div>
          <a href="#films" className="btn">See the films<Arrow /></a>
        </div>
        <div className="right reveal">
          <span className="label" style={{ color: 'var(--taupe)' }}>It's all for you</span>
          <Media src={c} alt={intro.imageAlts[2]} className="c" label="Still · 4:5" />
        </div>
      </div>
    </section>
  )
}

/* ── STATEMENT BAND ───────────────────────────────────────── */
export function Statement() {
  return (
    <section className="statement" aria-label="Brand statement">
      <div className="left display reveal">For lovers<br />who are</div>
      <div className="oval-wrap reveal"><Media className="oval" label="Portrait" alt="Couple portrait" /></div>
      <div className="display reveal">Wildly<br /><span className="it">in love</span></div>
    </section>
  )
}

/* ── FILMS + LIGHTBOX ─────────────────────────────────────── */
function toEmbed(url) {
  if (!url) return ''
  const yt = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1`
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1&dnt=1${vm[2] ? `&h=${vm[2]}` : ''}`
  return url
}

export function Films() {
  const [active, setActive] = useState(null)
  useEscape(() => setActive(null), !!active)
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
  }, [active])

  return (
    <section className="section dark" id="films">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <span className="label clay">Take a look around</span>
            <h2 className="display">The <span className="it">films</span></h2>
          </div>
          <p>A handful of recent stories. Turn the sound up — the vows do most of the work.</p>
        </div>
        <div className="films-grid">
          {films.map((f, i) => (
            <button className="film reveal" key={i} onClick={() => setActive(f)} aria-label={`Play ${f.couple} — ${f.type}`}>
              <div style={{ position: 'relative' }}>
                <Media src={f.image} alt={`${f.couple} wedding film still`} label={f.length} />
                <span className="play" aria-hidden="true">
                  <svg viewBox="0 0 12 14"><path d="M0 0 L12 7 L0 14z" fill="currentColor" /></svg>
                </span>
              </div>
              <div className="info">
                <h3>{f.couple}</h3>
                <span className="label sub">{f.venue}</span>
              </div>
              <span className="label sub">{f.type}</span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${active.couple} film`} onClick={() => setActive(null)}>
          <button className="close label" onClick={() => setActive(null)}>Close ✕</button>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(1200px, 100%)' }}>
            <div className="player">
              {active.embed ? (
                <iframe src={toEmbed(active.embed)} title={`${active.couple} — ${active.type}`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              ) : (
                <div className="empty">
                  <div>
                    <p className="label clay">Film coming soon</p>
                    <p style={{ fontFamily: 'var(--f-serif)', fontSize: 26, margin: 0 }}>Add a Vimeo or YouTube link to this film in <code>src/data/site.js</code></p>
                  </div>
                </div>
              )}
            </div>
            <p className="cap label">{active.couple} · {active.venue} · {active.type}</p>
          </div>
        </div>
      )}
    </section>
  )
}

/* ── APPROACH ─────────────────────────────────────────────── */
export function Approach() {
  return (
    <section className="section approach" id="approach">
      <div className="wrap grid">
        <div className="sticky reveal">
          <span className="label clay">How it feels</span>
          <h2 className="display">Natural,<br /><span className="it">nostalgic</span><br />& true</h2>
          <Media className="arch" light label="Behind the scenes" alt="Filmmaker at work" />
        </div>
        <div>
          {approach.map((s) => (
            <div className="step reveal" key={s.n}>
              <span className="n">{s.n}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── PACKAGES ─────────────────────────────────────────────── */
export function Packages() {
  return (
    <section className="section dark packages" id="investment">
      <div className="wrap">
        <div className="head reveal">
          <span className="label clay">Investment</span>
          <h2 className="display">Collections</h2>
          <p>Every wedding is quoted to fit. These are starting points — tell me about your day and I’ll shape something around it.</p>
        </div>
        <div className="pk-grid reveal">
          {packages.map((p) => (
            <article className={`pk ${p.featured ? 'featured' : ''}`} key={p.name}>
              {p.featured && <span className="badge label">Most loved</span>}
              <h3>{p.name}</h3>
              <div className="price">{p.price}</div>
              <div className="hours label">{p.hours}</div>
              <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
              <div className="note">{p.note}</div>
              <a href="#inquire" className="btn">Enquire<Arrow /></a>
            </article>
          ))}
        </div>
        <div className="elope reveal">
          <div>
            <h3>{elopement.title}</h3>
            <p>{elopement.body}</p>
          </div>
          <a href="#inquire" className="btn">Ask about elopements<Arrow /></a>
        </div>
      </div>
    </section>
  )
}

/* ── TESTIMONIALS ─────────────────────────────────────────── */
export function KindWords() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((x) => (x + 1) % testimonials.length), 7000)
    return () => clearInterval(t)
  }, [paused])
  const t = testimonials[i]
  return (
    <section className="section cream kind" id="kind-words" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="wrap reveal">
        <span className="label clay">Kind words</span>
        <div className="quote-mark" aria-hidden="true">“</div>
        <blockquote className="q" aria-live="polite"><span key={i}>{t.quote}</span></blockquote>
        <div className="label who">{t.names} · {t.venue}</div>
        <div className="dots" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((x, k) => (
            <button key={k} className={k === i ? 'on' : ''} role="tab" aria-selected={k === i} aria-label={x.names} onClick={() => setI(k)} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function Strip() {
  return (
    <div className="strip" aria-hidden="true">
      {['Detail', 'Portrait', 'Reception', 'Golden hour'].map((l, k) => (
        <Media key={l} label={l} light={k % 2 === 1} />
      ))}
    </div>
  )
}

/* ── FAQ ──────────────────────────────────────────────────── */
export function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="wrap grid">
        <div className="reveal">
          <span className="label clay">Good to know</span>
          <h2 className="display">Questions,<br /><span className="it">answered</span></h2>
        </div>
        <div className="reveal">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}<i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── FOOTER ───────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <ArrowMark className="arrow-mark" />
        <p className="display big">Cupid<span className="it">cinematic</span></p>
        <div className="links label">
          <a href={brand.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={brand.vimeo} target="_blank" rel="noreferrer">Vimeo</a>
          <a href={brand.youtube} target="_blank" rel="noreferrer">YouTube</a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </div>
        <div className="base label">
          <span>© {new Date().getFullYear()} {brand.name}{brand.abn ? ` · ABN ${brand.abn}` : ''}</span>
          <span>{brand.region}</span>
        </div>
      </div>
    </footer>
  )
}
