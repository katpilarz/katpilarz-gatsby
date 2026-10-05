<p align="center">
  <a href="https://katarzynapilarz.com.pl">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/assets/hero-dark.webp">
      <img src=".github/assets/hero-light.webp" width="100%" alt="Homepage of katarzynapilarz.com.pl: the name Kasia Pilarz in large blue serif type, with project thumbnails floating over it and the tagline beneath">
    </picture>
  </a>
</p>

# Kasia Pilarz — portfolio

Source for [katarzynapilarz.com.pl](https://katarzynapilarz.com.pl), a portfolio
site built with **Gatsby 5** and **React 18**. Content is managed in **Sanity**
(headless CMS) and pulled in at build time through Gatsby's GraphQL data layer.
The site is hosted on **Netlify**.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Gatsby 5, React 18 |
| Content | Sanity via `gatsby-source-sanity`, Portable Text via `@portabletext/react` |
| Styling | Sass, CSS Modules |
| Motion | GSAP, Swiper |
| Images | `gatsby-plugin-image`, Sanity image CDN |
| Hosting | Netlify |

## Requirements

- **Node 20** or newer (pinned in `.nvmrc`)
- **npm**. A `preinstall` guard rejects yarn and pnpm, so there is only ever
  one lockfile.
- A **Sanity project** whose schema matches the GraphQL queries in this repo.
  The Studio (schema and content) is kept in a separate, private repository.

## Getting started

```bash
git clone https://github.com/katpilarz/katpilarz-gatsby.git
cd katpilarz-gatsby
nvm use                            # or install Node 20+ another way
npm install
cp .env.example .env.development   # then fill in the values (see below)
npm run develop                    # http://localhost:8000
```

While the dev server is running, GraphiQL is available at
`http://localhost:8000/___graphql` for exploring the data layer.

## Environment variables

Gatsby reads `.env.development` for `develop` and `.env.production` for `build`
and `serve`. Both are gitignored; only `.env.example`, with empty values, is
committed. **Never commit real values.**

| Variable | Required | Purpose |
| --- | --- | --- |
| `GATSBY_SANITY_PROJECT_ID` | yes | Sanity project to source content from (found at sanity.io/manage) |
| `GATSBY_SANITY_DATASET` | yes | Dataset within that project |
| `SANITY_READ_TOKEN` | no | Viewer token that lets `develop` show unpublished drafts. Keep it secret. |

Without the two required variables `gatsby-source-sanity` has no project to
pull from and the build fails.

Anything prefixed `GATSBY_` can be read by browser code and ends up in the
client bundle, so never put a secret behind that prefix.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run develop` | Dev server with hot reload on port 8000; also watches Sanity for content changes (`npm start` is an alias) |
| `npm run build` | Production build into `public/` |
| `npm run serve` | Serves the production build on port 9000 |
| `npm run clean` | Deletes `.cache/` and `public/`. Try this first when the dev server misbehaves. |

## Project structure

```
├── gatsby-config.js    plugins, site URL, sitemap, robots.txt
├── gatsby-node.js      creates /projects/:slug/ and /services/:slug/ pages
├── gatsby-browser.js   global styles, layout and error-boundary wrappers
├── gatsby-ssr.js       pre-paint theme script, font preload, layout wrapper
├── client-config.js    Sanity settings, read from the environment
├── netlify.toml        Netlify build settings
├── static/             copied as-is into public/ (favicons, fonts)
└── src/
    ├── assets/images/  favicon and web-manifest icons
    ├── components/     globalComponents, globalSections, home, page, project, service
    ├── hooks/          useMediaQuery, useTheme, useTypingEffect
    ├── pages/          index, projects, services, faqs, 404
    ├── templates/      project and service detail pages
    └── styles/         _abstracts.scss, layout.scss and imports/ partials
```

## Content

Pages are generated from Sanity documents at build time:

- **Projects** get a page at `/projects/<slug>/` once they have a slug and a
  `publishedAt` date. A project dated in the future stays hidden until a build
  runs after that date.
- **Services** get a page at `/services/<slug>/` once they have a slug.

Content is fetched at build time, so publishing a change in Sanity does not
update the live site until the next deploy.

## Styling conventions

Component styles are CSS Modules (`*.module.scss`) kept next to their
component. `src/styles/` is split by whether a file emits CSS:

- `_abstracts.scss` forwards variables, media-query helpers and mixins, and
  emits nothing. Every module starts with:

  ```scss
  @use 'src/styles/abstracts' as *;
  ```

- `layout.scss` holds the global rules (typography, light and dark mode,
  globals) and is imported exactly once, from `gatsby-browser.js`.

Don't import `layout.scss` into a module. It would copy every global rule into
that module, under hashed class names that match nothing.

## Deployment

Netlify builds and deploys the site from this repository. `netlify.toml` sets
the build command (`npm run build`), the publish directory (`public`) and the
Node version. Settings in that file take precedence over the Netlify dashboard.

The Sanity variables are not stored in the repository. Set
`GATSBY_SANITY_PROJECT_ID` and `GATSBY_SANITY_DATASET` (plus
`SANITY_READ_TOKEN`, if you use it) in the Netlify dashboard under
**Site configuration → Environment variables**.
