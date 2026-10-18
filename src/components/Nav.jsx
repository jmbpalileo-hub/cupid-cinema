import { useEffect, useState } from 'react'

const left = [
  ['Films', '#films'],
  ['Approach', '#approach'],
  ['Investment', '#investment'],
]
const right = [
  ['Kind Words', '#kind-words'],
  ['FAQ', '#faq'],
  ['Inquire', '#inquire'],
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`nav ${solid && !open ? 'solid' : ''}`}>
        <div className="wrap">
          <ul>
            {left.map(([t, h]) => (
              <li key={h}><a className="label" href={h}>{t}</a></li>
            ))}
          </ul>
          <a href="#top" className="logo" aria-label="Cupid Cinematic home" onClick={close}>
            <span className="display">Cupid</span>
            <span className="it">cinematic</span>
          </a>
          <ul className="right">
            {right.map(([t, h]) => (
              <li key={h}><a className="label" href={h}>{t}</a></li>
            ))}
          </ul>
          <button className={`menu-btn ${open ? 'open' : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            <span /><span />
          </button>
        </div>
      </header>
      <nav className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        {[...left, ...right].map(([t, h]) => (
          <a key={h} href={h} onClick={close} tabIndex={open ? 0 : -1}>{t}</a>
        ))}
      </nav>
    </>
  )
}
