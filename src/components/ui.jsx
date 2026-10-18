import { useEffect, useRef } from 'react'

/** Image/video slot. Renders the media if `src` is set, otherwise a styled placeholder. */
export function Media({ src, alt = '', label, light, className = '', style, video }) {
  return (
    <div className={`frame ${className}`} style={style}>
      {src ? (
        video ? (
          <video src={src} autoPlay muted loop playsInline preload="metadata" />
        ) : (
          <img src={src} alt={alt} loading="lazy" decoding="async" />
        )
      ) : (
        <div className={`ph ${light ? 'light' : ''}`} role="img" aria-label={alt || label || 'Placeholder image'}>
          {label && <span className="label">{label}</span>}
        </div>
      )}
    </div>
  )
}

export function Arrow() {
  return <span className="arrow" aria-hidden="true" />
}

/** Cupid's arrow with a heart — the brand mark. */
export function ArrowMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M8 20 H192" />
      <path d="M192 20 l-10 -6 M192 20 l-10 6" />
      <path d="M8 20 l10 -7 M14 20 l10 -7 M20 20 l10 -7 M8 20 l10 7 M14 20 l10 7 M20 20 l10 7" />
      <path d="M100 30 c-7-5 -12-8.5 -12-13 a6 6 0 0 1 12 -1.5 a6 6 0 0 1 12 1.5 c0 4.5 -5 8 -12 13z" />
    </svg>
  )
}

/** Adds .in to every .reveal element once it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
}

export function useEscape(onEsc, active) {
  const ref = useRef(onEsc)
  ref.current = onEsc
  useEffect(() => {
    if (!active) return
    const h = (e) => e.key === 'Escape' && ref.current()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [active])
}
