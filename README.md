# Rihaan's portfolio

Personal portfolio for a Computer Engineering student who builds autonomous exploration
systems, machine-learning research tools, 3D worlds and a Rust game engine. A single-page
site plus a case-study page for every project, with content kept in typed data files.

Live: [rihaanportfolio-blush.vercel.app](https://rihaanportfolio-blush.vercel.app/)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4 with a small token-based design system in `src/app/globals.css`
- Geist Sans and Geist Mono via `next/font`
- [Resend](https://resend.com) for the contact form
- ESLint (`eslint-config-next`) and Prettier (with the Tailwind class sorter)

Server Components by default. The only client components are the ones that need the
browser: navbar and theme toggle, the project category filter, the contact form, a
cursor-glow wrapper and one shared `IntersectionObserver` for reveal-on-scroll. There is no
animation library.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command                | What it does                                            |
| ---------------------- | ------------------------------------------------------- |
| `npm run build`        | Production build                                        |
| `npm run start`        | Serve the production build                              |
| `npm run lint`         | ESLint                                                  |
| `npm run typecheck`    | `tsc --noEmit` (run after a build so route types exist) |
| `npm run format`       | Format the codebase with Prettier                       |
| `npm run format:check` | Check formatting without writing                        |

## Editing content

Everything on the site comes from `src/lib/content/`. Components never contain copy.

| File            | What is in it                                                 |
| --------------- | ------------------------------------------------------------- |
| `profile.ts`    | Hero, about and contact copy, nav links, socials, "now" items |
| `projects.ts`   | Every project and its full case study                         |
| `skills.ts`     | Toolkit groups                                                |
| `experience.ts` | Timeline entries                                              |

`src/lib/data.ts` re-exports all of it and adds helpers (`getProject`, category labels).
Shapes are defined in `src/lib/types.ts`.

### Adding a project

Append an object to the `projects` array in `src/lib/content/projects.ts`. The homepage
card, the case-study page at `/projects/<slug>`, the sitemap entry and the Open Graph image
are all generated from it. Rules the file follows, and you should too:

- Set `featured: true` only for flagship work. Featured projects get the big cards in
  Selected Work, the rest appear in All Projects.
- Only add a statistic if it can be checked against the project's own README, docs or code,
  and keep the caveat that came with it.
- Use real screenshots. Put optimised images in `public/projects/<slug>/` and give each one
  alt text and its real width and height. Use `fit: "contain"` for portrait screenshots.
- Leave `demoHref` or `repoHref` out rather than pointing at something that does not exist.
  Use `demoNote` or `repoNote` (for example "Private repository") so the card says why.
- Links must be `https://`. A build-time check rejects anything else.

## Contact form

The form validates in the browser, then posts to `src/app/api/contact/route.ts`, which
validates again with the same rules (`src/lib/contact.ts`) and sends the message with
Resend.

It never reports success unless Resend accepted the message. If email is not configured it
returns an error and the form shows the direct `mailto:` address instead.

| Variable               | Required | Purpose                                                                                |
| ---------------------- | -------- | -------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | Yes      | Resend API key                                                                         |
| `CONTACT_TO_EMAIL`     | No       | Where messages go. Defaults to the email in `profile.ts`                               |
| `CONTACT_FROM_EMAIL`   | No       | Sender on a domain verified in Resend, e.g. `Portfolio <contact@yourdomain.com>`       |
| `NEXT_PUBLIC_SITE_URL` | No       | Canonical URL override. On Vercel it is detected automatically (see `src/lib/site.ts`) |

Without `CONTACT_FROM_EMAIL` the shared Resend testing sender is used. Resend only delivers
from that sender to the email address the Resend account was created with, so verify a domain
before relying on it for anyone else's messages.

Abuse protection is a hidden honeypot field plus strict server-side validation and size
limits. There is deliberately no in-memory rate limiter, because on serverless each instance
has its own memory and it would not be a real limit. If you need one, add a rate-limit rule
for `POST /api/contact` in the Vercel Firewall, or use a shared store such as Redis.
Message contents and sender addresses are never logged.

## Design notes

- Dark by default with a proper light palette. The theme is applied by a small script in
  `<head>` before first paint, so there is no flash, and it persists in `localStorage`.
- Reveal animations are CSS transitions toggled by one observer. The hidden state only
  applies once JavaScript has run, so the page is fully readable without it, and
  `prefers-reduced-motion` disables all movement.
- Images use `next/image` with fixed-ratio frames, so nothing shifts as they load.
- Colour tokens are CSS variables defined once for each theme in `globals.css`.

## Deploying

Push to GitHub and import the repository on [vercel.com/new](https://vercel.com/new). Vercel
detects Next.js with no configuration. Add `RESEND_API_KEY` (and optionally the two
`CONTACT_*` variables) in the project's Environment Variables, then redeploy.
