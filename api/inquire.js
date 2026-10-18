// Vercel Serverless Function — POST /api/inquire
// Sends inquiry emails via Resend (https://resend.com, free tier: 3,000/month).
//
// Required env vars (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   — from resend.com
//   INQUIRY_TO       — where inquiries land, e.g. hello@cupidcinematic.com.au
//   INQUIRY_FROM     — verified sender, e.g. "Cupid Cinematic <inquiries@cupidcinematic.com.au>"
//                      (until your domain is verified you can use "onboarding@resend.dev")

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  let b
  try {
    b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  } catch {
    return res.status(400).json({ error: 'Invalid request.' })
  }

  // honeypot — bots fill hidden fields; pretend success
  if (b.company) return res.status(200).json({ ok: true })

  const required = ['names', 'email', 'date', 'venue']
  const missing = required.filter((k) => !String(b[k] || '').trim())
  if (missing.length) return res.status(400).json({ error: `Please fill in: ${missing.join(', ')}.` })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) return res.status(400).json({ error: 'Please check your email address.' })
  if (String(b.story || '').length > 5000) return res.status(400).json({ error: 'Message is too long.' })

  const { RESEND_API_KEY, INQUIRY_TO, INQUIRY_FROM } = process.env
  if (!RESEND_API_KEY || !INQUIRY_TO) {
    console.error('Inquiry received but email is not configured:', { ...b, story: undefined })
    return res.status(500).json({ error: 'The form isn’t connected yet.' })
  }

  const rows = [
    ['Names', b.names], ['Email', b.email], ['Phone', b.phone], ['Wedding date', b.date],
    ['Venue', b.venue], ['Guests', b.guests], ['Collection', b.collection], ['Found via', b.heard],
  ]
  const html = `
    <div style="font-family:Georgia,serif;color:#16140f;max-width:560px">
      <h2 style="font-weight:400;letter-spacing:.06em">New inquiry — ${esc(b.names)}</h2>
      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px">
        ${rows.filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:8px 12px 8px 0;color:#8c7e6e;width:140px">${k}</td><td style="padding:8px 0">${esc(v)}</td></tr>`).join('')}
      </table>
      ${b.story ? `<p style="margin-top:24px;white-space:pre-wrap;font-size:16px;line-height:1.6">${esc(b.story)}</p>` : ''}
    </div>`

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: INQUIRY_FROM || 'Cupid Cinematic <onboarding@resend.dev>',
        to: INQUIRY_TO.split(',').map((s) => s.trim()),
        reply_to: b.email,
        subject: `Inquiry: ${b.names} — ${b.date} @ ${b.venue}`,
        html,
      }),
    })
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text())
      return res.status(502).json({ error: 'Couldn’t send just now.' })
    }
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error(e)
    return res.status(502).json({ error: 'Couldn’t send just now.' })
  }
}
