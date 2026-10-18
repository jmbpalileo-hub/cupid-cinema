import { useState } from 'react'
import { Arrow } from './ui.jsx'
import { brand, inquiry } from '../data/site.js'

const initial = { names: '', email: '', phone: '', date: '', venue: '', guests: '', collection: '', heard: '', story: '', company: '' }

export default function Inquire() {
  const [form, setForm] = useState(initial)
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [msg, setMsg] = useState('')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setState('sending')
    setMsg('')
    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setState('sent')
      setForm(initial)
    } catch (err) {
      setState('error')
      setMsg(`${err.message} You can also email ${brand.email}.`)
    }
  }

  return (
    <section className="section dark inquire" id="inquire">
      <div className="wrap grid">
        <div className="aside reveal">
          <span className="label clay">Inquire</span>
          <h2 className="display">Let’s <span className="it">begin</span></h2>
          <p>{inquiry.sub}</p>
          <div className="contact label">
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            {brand.phone && <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a>}
            <span style={{ opacity: .6 }}>{brand.region}</span>
          </div>
        </div>

        {state === 'sent' ? (
          <div className="reveal in" style={{ alignSelf: 'center' }}>
            <p className="display" style={{ fontSize: 'clamp(36px,4vw,56px)', margin: 0 }}>Thank <span className="it">you</span></p>
            <p className="status" style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: 22, opacity: .85 }}>{inquiry.success}</p>
          </div>
        ) : (
          <form className="form reveal" onSubmit={submit} noValidate={false}>
            <div className="field">
              <label className="label" htmlFor="names">Your names *</label>
              <input id="names" required value={form.names} onChange={set('names')} autoComplete="name" placeholder="Alex & Sam" />
            </div>
            <div className="field">
              <label className="label" htmlFor="email">Email *</label>
              <input id="email" type="email" required value={form.email} onChange={set('email')} autoComplete="email" />
            </div>
            <div className="field">
              <label className="label" htmlFor="date">Wedding date *</label>
              <input id="date" type="date" required value={form.date} onChange={set('date')} />
            </div>
            <div className="field">
              <label className="label" htmlFor="phone">Phone</label>
              <input id="phone" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" />
            </div>
            <div className="field">
              <label className="label" htmlFor="venue">Venue / location *</label>
              <input id="venue" required value={form.venue} onChange={set('venue')} />
            </div>
            <div className="field">
              <label className="label" htmlFor="guests">Guest count</label>
              <select id="guests" value={form.guests} onChange={set('guests')}>
                <option value="">Select</option>
                <option>Elopement (under 20)</option>
                <option>20–60</option>
                <option>60–120</option>
                <option>120+</option>
              </select>
            </div>
            <div className="field">
              <label className="label" htmlFor="collection">Collection of interest</label>
              <select id="collection" value={form.collection} onChange={set('collection')}>
                <option value="">Not sure yet</option>
                <option>The Vow</option>
                <option>The Story</option>
                <option>The Heirloom</option>
                <option>Elopement</option>
              </select>
            </div>
            <div className="field">
              <label className="label" htmlFor="heard">How did you find me?</label>
              <select id="heard" value={form.heard} onChange={set('heard')}>
                <option value="">Select</option>
                <option>Instagram</option>
                <option>Google</option>
                <option>Venue / vendor referral</option>
                <option>Friend or past couple</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field full">
              <label className="label" htmlFor="story">Tell me about you two</label>
              <textarea id="story" value={form.story} onChange={set('story')} placeholder="How you met, what matters most, the vibe of the day…" />
            </div>
            <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.company} onChange={set('company')} name="company" />
            <div className="submit">
              <button className="btn" type="submit" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending…' : 'Send inquiry'}<Arrow />
              </button>
              {state === 'error' && <span className="status err" role="alert">{msg}</span>}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
