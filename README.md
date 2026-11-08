# wafaabbassi.dev — portfolio v2

Astro 5 + TypeScript, React islands for the interactive bits, content collections for case studies and notes, and a small read-only MCP endpoint served as a Vercel function. Dark theme by default, light theme available, reduced-motion aware, no tracking.

## Structure

```
src/
  data/profile.ts        ← everything the site says about you (edit this first)
  data/resume.ts         ← structured resume → /resume.json and the MCP get_resume tool
  content/work/*.md      ← case studies (frontmatter + markdown body)
  content/notes/*.md     ← posts (draft: true hides a post)
  layouts/Base.astro     ← head, JSON-LD, nav, footer, theme/nav/reveal scripts
  components/            ← Nav, Footer, Ticker, islands/Counter.tsx, islands/HeroCanvas.tsx
  pages/index.astro      ← home
  pages/work/            ← /work and /work/[slug]
  pages/notes/           ← /notes and /notes/[slug]
  pages/connect.astro    ← how to add the MCP connector
  pages/resume.json.ts   ← static JSON resume
  pages/api/mcp.ts       ← MCP server (on-demand, Vercel function)
public/
  llms.txt, AGENTS.md, robots.txt, favicon.svg, og/default.png
```

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-checks (astro check) and builds
npm run preview
```

Node 20 or newer.

## Before the first deploy

1. In `astro.config.mjs`, set `site` to your real domain.
2. In `src/data/profile.ts`, set `site`, `links.github`, and review every field; `robots.txt`, `llms.txt` and `AGENTS.md` in `public/` contain the domain as plain text, so update those too.
3. Replace `public/og/default.png` if you want a different link-preview image (1200×630).
4. Decide whether to keep the personal email public, or point the contact buttons at a form (Formspree, Vercel + Resend, etc.).

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com → Add New Project → import the repository. Framework preset: **Astro**. Leave build command and output as detected. Deploy.
3. Add your domain under Project → Settings → Domains and follow the DNS instructions (an `A`/`ALIAS` record for the apex, a `CNAME` for `www`).
4. Check: `/`, `/work`, `/notes`, `/resume.json`, `/llms.txt`, `/connect`, and the MCP endpoint:

```bash
curl -s -X POST https://YOUR-DOMAIN/api/mcp \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

curl -s -X POST https://YOUR-DOMAIN/api/mcp \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"check_availability","arguments":{}}}'
```

5. Add it to Claude as a custom connector (Settings → Connectors → Add custom connector → the `/api/mcp` URL) and ask "What has Wafa shipped?" to see it work end to end.

## Adding content

- **Case study:** copy a file in `src/content/work/`, change the frontmatter (title, summary, context, period, role, order, problem, didWhat, outcome, stack) and write the body in Markdown. It appears on the home page and `/work`, gets its own page, and is served by the MCP `get_case_studies` tool automatically.
- **Note:** copy a file in `src/content/notes/`. Set `draft: false` to publish.
- **Stats, ticker, FAQ, skills, availability:** `src/data/profile.ts`.

## Design notes

- Only two interactive islands (counters, hero canvas); everything else is static HTML. Lighthouse should stay in the high 90s.
- The hero canvas pauses off-screen and renders a single static frame when the visitor prefers reduced motion. The ticker stops animating under the same setting.
- View transitions via Astro's `ClientRouter`; scripts re-initialise on `astro:page-load`.
- JSON-LD: Person on every page, FAQPage on the home page, Article/BlogPosting on detail pages.

## Later ideas

- OG images per case study (Astro + Satori, or a Vercel OG route).
- A `/cv` page that prints to PDF from the same `resume.ts` data.
- GitHub activity widget once the public repositories exist.
- An EN/NL language switch if you target Dutch-speaking employers.
