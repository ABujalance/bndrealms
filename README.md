# B&D Realms — Landing Page

Landing page for **B&D Realms** (Bujalance & Dominguez) modular dungeon systems.
A single-screen mailing-list signup that funnels into MailerLite, deployed as a
static site on GitHub Pages at [bndrealms.com](https://bndrealms.com).

Stack: **Vite + React + TypeScript + MUI**. No backend.

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Configure everything in one place

[`src/config/site.config.ts`](src/config/site.config.ts) is the single source of
truth — colors, fonts, hero background image, Etsy link, and MailerLite IDs. You
rarely need to touch the components.

### MailerLite signup

The form POSTs directly to MailerLite's **public embedded-form endpoint** — no API
token, nothing secret in the browser. Subscribers confirm via MailerLite's
**double opt-in** email (that's also the bot defense).

1. In MailerLite, create an **embedded form**.
2. From its embed snippet grab your **account id** and **form id**.
3. Put them in `siteConfig.mailerLite` (`accountId`, `formId`).

The endpoint sends `Access-Control-Allow-Origin: *`, so the app reads MailerLite's
real JSON response (`{ success, errors }`) and shows accurate success/error states.
To add Cloudflare Turnstile or server-side validation later, swap the body of
[`src/services/subscribe.ts`](src/services/subscribe.ts) to call a Cloudflare
Worker — nothing else changes.

### Hero image

Drop a render in [`public/images/`](public/images/) and point
`heroBackgroundImage` at it (default: `/images/dungeon-bg.jpg`). Until then the
page uses a dark gold-tinted gradient fallback.

### Copy / i18n

Text lives in [`src/i18n/`](src/i18n/) (`en.ts`, `es.ts`). English ships by
default; change `DEFAULT_LOCALE` in [`src/i18n/index.ts`](src/i18n/index.ts) to
switch. This is a preliminary layer — no runtime language switcher yet, but
adding one is just wiring `getStrings(locale)`.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes to GitHub Pages.

One-time setup:

1. **Repo → Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Point DNS for `bndrealms.com` at GitHub Pages (apex `A`/`AAAA` records, or a
   `CNAME` for `www`). The [`public/CNAME`](public/CNAME) file already pins the
   custom domain.
3. Tick **Enforce HTTPS** once the certificate provisions.
