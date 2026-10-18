# Cupid Cinematic

Wedding film site — Vite + React, static build, one serverless function for inquiries. Deploys to Vercel with zero config.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs /dist
```
The inquiry form needs the Vercel runtime; to test it locally use `npx vercel dev`.

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. Vercel → **Add New Project** → import the repo. Framework is auto-detected as **Vite** (also pinned in `vercel.json`).
3. Settings → **Environment Variables**:
   | Key | Value |
   |---|---|
   | `RESEND_API_KEY` | from resend.com (free tier) |
   | `INQUIRY_TO` | inbox for inquiries |
   | `INQUIRY_FROM` | `Cupid Cinematic <inquiries@yourdomain>` once the domain is verified in Resend; `onboarding@resend.dev` until then |
4. Deploy, then add your domain under Settings → Domains.

## Editing content
**Everything lives in `src/data/site.js`** — copy, films, packages, reviews, FAQ, contact details. Lines marked `TODO` must be replaced before launch.

### Media
- Put stills in `public/media/` and reference as `/media/name.jpg`. Any slot left `null` shows a styled placeholder.
- Export stills at 2000px long edge, WebP or JPG ~q80, under 400 KB each.
- **Hero loop:** 8–15 s, muted, 1920×1080, H.264, ≤ 6 MB → `public/media/hero-loop.mp4`, plus a poster frame JPG.
- **Films:** host on Vimeo (preferred — no ads, privacy controls) or YouTube and paste the URL into `embed`. Do not link Google Drive files — they throttle, show Google UI and break on traffic.
- `public/media/og.jpg` — 1200×630 share image.

## Structure
```
api/inquire.js            serverless email handler (Resend)
src/data/site.js          all content
src/components/           Nav, Sections, Inquire, ui helpers
src/styles.css            design tokens + all styles
vercel.json               build, SPA rewrite, cache headers
```
