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

### Styling architecture

`src/styles/` is split by whether a file emits CSS:

- `_abstracts.scss` forwards `variables`, `media` and `mixins` — **declarations
  only, emits nothing**. Every `*.module.scss` starts with
  `@use 'src/styles/abstracts' as *;`.
- `layout.scss` pulls in `typography`, `mode` and `global`, which **do** emit
  rules. It is imported exactly once, from `gatsby-browser.js`.

Keep that separation. Previously every one of the 31 CSS modules did
`@import 'src/styles/layout'`, which re-emitted all the global rules inside
each module — and CSS Modules hashed those global class names, so selectors
like `.text-color` compiled to `.footer-module--text-color--ab123` and matched
nothing. Moving to `@use` removed that dead weight: **297 KB of CSS became
94 KB** with byte-identical computed styles, verified by diffing the
declarations reaching every element class-set in the rendered HTML.

Two elements did rely on those leaked globals and now carry the bare global
class alongside the module class, which is the convention already used
elsewhere in the codebase:

```jsx
<div className={`${styles.intro} intro`}>
<button className={`${styles.question} question`}>
```

The order inside `layout.scss` is deliberate. `mode` and `typography` both
style `body`, `.intro span` and `.menu-link`; the old chain imported `mode`
twice, so `mode` effectively won those ties. Loading `typography` before
`mode` reproduces that cascade without the duplicate.

### Known follow-ups

- `gatsby-plugin-sass` pins `sass-loader` at v10, which still calls Dart Sass's
  legacy JS API. That deprecation is upstream and cannot be fixed from here, so
  it is silenced narrowly via `sassOptions.silenceDeprecations:
  ['legacy-js-api']` in `gatsby-config.js`. Our own stylesheets use
  `@use`/`@forward`, so nothing else is suppressed. Revisit if the plugin ever
  ships a newer sass-loader.
- The dev server logs `warn [sanity] Document "708acabe-…" has type gallery`.
  It is an orphaned `gallery` document titled "Foodlace", left over from an
  abandoned approach; the type is not in the schema. Deleting it in the Studio
  clears the warning — it is data, not code.
- `overlayDrafts` is only enabled when `SANITY_READ_TOKEN` is set. Without a
  token the source plugin cannot read drafts, so enabling it unconditionally
  just warned and did nothing.
