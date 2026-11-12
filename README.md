# Ratul Kole - Developer Portfolio

A neo-brutalist personal portfolio showcasing my skills, projects, and academic background.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

## Features

- **Neo-brutalist design**: thick borders, hard offset shadows, loud flat colors and oversized type.
- **Data-driven content**: every project, skill and link lives in [`data/portfolio.ts`](data/portfolio.ts) — edit one file to update the site.
- **Live stats**: LeetCode solved count and GitHub contribution calendar are fetched on the server and refreshed every 6 hours (Incremental Static Regeneration) — no redeploy needed.
- **Dark mode**: brutalist inverted theme (black page, cream borders); follows the device setting until toggled.
- **Share-ready**: Open Graph / Twitter metadata and a generated preview image (`app/opengraph-image.tsx`).
- **Responsive & accessible**: mobile menu, active-section nav, keyboard focus styles, and `prefers-reduced-motion` support.

## Tech Stack

- **Next.js 16** (App Router, ISR on Vercel)
- **React 19** + **TypeScript**
- **Tailwind CSS 4** (design tokens in [`app/globals.css`](app/globals.css))

## Project Structure

```
app/            layout, page and global styles (Tailwind theme)
components/     Header, Hero, Marquee, About, Education, Skills, Projects, Contact, Footer
data/           portfolio.ts — all site content
public/assets/  images, logos and resume
```

## Getting Started

Requires [Node.js](https://nodejs.org/) 20.9 or newer.

```bash
git clone https://github.com/ratulexe/ratul-portfolio.git
cd ratul-portfolio
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint
```

## Deployment

- **Vercel / Netlify**: import the repo — the framework is detected automatically.
- Live stats need a Node.js host (Vercel, Netlify), so GitHub Pages is no longer supported.

### Live GitHub stats (official API)

The contribution graph uses GitHub's official GraphQL API when a token is set, and a public mirror otherwise.

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
   Repository access: **Public repositories**. No extra permissions. Pick an expiry (and a reminder to renew it).
2. Vercel → **Project → Settings → Environment Variables** → add `GITHUB_TOKEN` with the token (Production + Preview), then redeploy.
3. Locally (optional): copy `.env.example` to `.env.local` and paste the token there. `.env.local` is git-ignored.

To check it works, hover the **Live** badge on the GitHub card: it says *"Fetched live from GitHub's official API"*.

### Custom domain (e.g. `ratulkole.dev`)

1. Buy the domain from any registrar (Cloudflare, Namecheap, Porkbun…). `.dev` domains are HTTPS-only, which Vercel handles automatically.
2. In Vercel: **Project → Settings → Domains → Add**, enter the domain, and add the DNS records Vercel shows at your registrar.
3. Change `siteUrl` in [`data/portfolio.ts`](data/portfolio.ts) to the new address and push — share previews and canonical links follow it.
4. Optional: in Vercel, set `ratulkole.vercel.app` to redirect to the new domain.

## Contact

- **Email:** ratulk.cse.24.jisu@gmail.com
- **LinkedIn:** [Ratul Kole](https://www.linkedin.com/in/ratul-kole-0aaab1311/)
- **GitHub:** [@ratulexe](https://github.com/ratulexe)
