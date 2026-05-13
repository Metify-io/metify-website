---
name: testing-metify-website
description: Test the metify.ai Astro website end-to-end. Use when verifying UI changes, form submissions, or third-party integrations (Calendly, HubSpot, license server).
---

# Testing metify-website

## Dev Server

```bash
cd ~/metify-website   # or wherever the repo is cloned
npm install
npm run dev           # starts on http://localhost:4321
```

The site is an Astro static site with Tailwind CSS 4. Dev server supports hot reload.

## Vercel Preview Deployments

PR branches auto-deploy to Vercel preview URLs (visible in PR comments from the Vercel bot). These previews may have **deployment protection** requiring Vercel login. If you cannot access the preview, test locally on the PR branch instead — the code is identical.

Production: https://www.metify.ai

## Key UI Flows to Test

### 1. Calendly Popup (Book a Demo)
- **Hero section**: Click "Book a Demo" button → Calendly popup overlay should appear (not navigate to `/contact`)
- **CTA section** (bottom green banner): Click "Book Demo" → same Calendly popup
- The popup uses dark theme colors (`background_color=1a1a1a`, `text_color=ffffff`, `primary_color=5fe72d`)
- Calendly widget.js loads async — there's a guard that falls back to `window.open()` if the script hasn't loaded yet
- URL should NOT change when popup opens
- Popup should close cleanly via X button

### 2. Trial Form (`/trial`)
- Submit with a valid work email → green success message: "Thank you! Check your email for your trial license key."
- Submit with a blocked email (gmail.com, etc.) → red error: "Please use a valid email."
- Button should show "Submitting..." during request
- Form resets on success but preserves fields on error
- Backend: Vercel serverless function at `/api/trial` proxies to `licenses.metify.io/l/api/v1/webform/`
- Requires `LICENSE_SERVER_API_TOKEN` env var in Vercel (sensitive, production + preview only)

### 3. Contact Form (`/contact`)
- Submit with valid data → green success message
- Submits to HubSpot Forms API (portal 7609233)
- Footer "Contact Us" link and navbar "CONTACT US" should navigate to `/contact` (not popup)

## Regression Checks

- Footer links (Contact Us, Resources, etc.) should navigate normally
- Navigation bar links should all work
- "DOWNLOAD FREE TRIAL" button in header should go to `/trial`

## Devin Secrets Needed

- `LICENSE_SERVER_API_TOKEN` — Required in Vercel env vars for trial form to work. This is a DRF token for the `webform-service` user on `licenses.metify.io`. Only needed for production/preview, not local testing of the frontend UI.

## Notes

- Forms use native HTML styled to match the dark theme (no HubSpot embed)
- Third-party scripts (Calendly, HubSpot) load async — test with slow network throttling if checking fallback behavior
- The site uses `astro.config.mjs` with `site: 'https://www.metify.ai'` for canonical URLs
