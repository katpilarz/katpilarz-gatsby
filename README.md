# katpilarz-portfolio

Frontend for **katarzynapilarz.com.pl** — Gatsby 5 + Sanity.

Content comes from the Sanity dataset managed in the `katpilarz-sanity` repo
(project `hhd2cuzh`, dataset `production`).

## Requirements

- Node **>= 20** (see `.nvmrc`)
- **npm** — a `preinstall` guard rejects yarn/pnpm, so there is exactly one
  lockfile

## Getting started

```bash
cp .env.example .env.development
npm install
npm run develop      # http://localhost:8000
```

Other commands:

```bash
npm run build   # production build into public/
npm run serve   # serve the production build
npm run clean   # clear .cache and public
```

## Environment

Both variables are required; without them `gatsby-source-sanity` has no
project to pull from.

```
GATSBY_SANITY_PROJECT_ID=hhd2cuzh
GATSBY_SANITY_DATASET=production
```

## Layout

```
gatsby-config.js   plugins, canonical siteUrl, sitemap and robots
gatsby-node.js     builds /projects/:slug and /services/:slug pages
gatsby-ssr.js      pre-body theme script, font preload, Layout wrapper
src/hooks/         useMediaQuery, useTheme, useTypingEffect
src/components/    globalComponents, globalSections, home, project, service
src/pages/         index, projects, services, faqs, 404
src/templates/     project, service
src/styles/        layout.scss + imports/ partials
```

## Notes on the Gatsby 4 → 5 upgrade

Several unmaintained packages were replaced with small local equivalents
rather than carried forward:

| Removed | Replaced by |
| --- | --- |
| `react-media` (abandoned 2022) | `src/hooks/useMediaQuery.js` + `components/globalComponents/media.js` |
| `gatsby-plugin-dark-mode` (abandoned, peer-locked to React 16) | `src/hooks/useTheme.js` + the pre-body script in `gatsby-ssr.js` |
| `react-typing-effect` (abandoned 2022) | `src/hooks/useTypingEffect.js` + `components/globalComponents/typingEffect.js` |
| `react-portable-text` | `@portabletext/react` via `components/globalComponents/portableText.js` |
| `react-helmet` + `gatsby-plugin-react-helmet` | Gatsby Head API (`export const Head`) |
| `gatsby-plugin-web-font-loader` | `@fontsource-variable/outfit`, self-hosted |
| `gatsby-plugin-transition-link`, `@cyriacbr/react-split-text` | unused — deleted |
| `webpack-filter-warnings-plugin` (abandoned 2019) | no longer needed |
| `gatsby-plugin-offline` | removed; the service worker served stale content |

Also fixed in the same pass:

- **Canonical domain.** `siteMetadata`, robots.txt, the sitemap and the new
  `<link rel="canonical">` now all use `https://katarzynapilarz.com.pl`. They
  previously disagreed (`.eu` vs `.com.pl`).
- **Social share images.** The meta tags were named `og-image` and
  `twitter-image`, which no crawler reads. They are now `og:image` and
  `twitter:image`, with `og:image:alt` and `summary_large_image`.
- **Duplicate plugin registration.** `gatsby-plugin-sitemap` was listed twice.
- **`gatsby-source-filesystem`** had `name` and `path` set twice in a single
  options object, so the `images` source was silently overwritten by `fonts`.
  They are now two separate entries.
- **Undeclared dependencies.** `date-fns` and `dotenv` were used but not in
  `package.json`, resolving only transitively through Gatsby.
- **GraphQL sort syntax** migrated to the Gatsby 5 form
  (`sort: {publishedAt: DESC}`).
- Stale contact address in the header updated to `kat.pilarz@proton.me`.

### Known follow-ups

- **Sass `@import` is deprecated** and will be removed in Dart Sass 3. There
  are 41 `@import` statements across 35 files to migrate to `@use`/`@forward`.
  Non-breaking today, but it is a real refactor with visual-regression risk,
  so it was left out of this pass.
- `gatsby-plugin-sass` still calls the legacy Dart Sass JS API, which is
  scheduled for removal in Dart Sass 2. That one is upstream, not ours.
- The build logs `warn [sanity] Document "708acabe-…" has type gallery`. It is
  an orphaned `gallery` document titled "Foodlace" left over from an abandoned
  approach; the type is not in the schema. Deleting the document in the Studio
  clears the warning.
