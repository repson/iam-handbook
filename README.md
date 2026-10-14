# IAM Handbook

An open, evolving knowledge base for **identity and access management**, written in English. Start with the fundamentals and add new discoveries over time.

The website is generated from independent Markdown documents using Astro. It is a static site designed for GitHub Pages: no database, API keys, or server runtime is required.

Expected GitHub Pages URL: **https://repson.github.io/iam-handbook/**. This is the configured destination, not a deployment-status indicator.

## What is included

- 24 introductory articles across eight connected areas.
- A guided learning path, glossary, roadmap, and contribution guide.
- Automatically generated topic pages, article navigation, and table of contents.
- Local full-text search with keyboard navigation (`Ctrl/Cmd + K`).
- Responsive navigation, light and dark themes, print styles, and self-hosted fonts.
- Canonical URLs, social metadata, a sitemap, and a custom 404 page.
- A GitHub Actions workflow that validates changes and deploys `main` to Pages.

## Repository structure

```text
content/                    # Published knowledge-base articles (Markdown)
  fundamentals/
  identity-modeling/
  architecture/
  processes/
  capabilities/
  patterns/
  use-cases/
  standards/
guides/                     # Learning path, roadmap, and contribution guide
templates/article.md        # Copy this to start an article
src/
  components/               # Reusable site components
  layouts/                  # Shared site layout
  lib/                      # Topic definitions and content helpers
  pages/                    # Static routes generated from Markdown
  scripts/                  # Search, theme, and mobile navigation
  styles/                   # Site design and reading styles
scripts/                    # Markdown link transformation
tests/                      # Checks against the generated static site
.github/workflows/          # Validation and GitHub Pages deployment
```

## Run locally

Use **Node.js 24 or later**. A `.nvmrc` file is included.

```bash
npm ci
npm run dev
```

Open the local URL printed by Astro, including `/iam-handbook/` (normally `http://127.0.0.1:4321/iam-handbook/`).

```bash
npm run verify     # Type-check, build, and check generated pages and links
npm run preview    # Preview the production output
```

The built site is written to `dist/`. Run `npm run build` before running `npm test` by itself, because tests inspect the generated output.

## Add an article

1. Copy `templates/article.md` to the relevant folder under `content/`.
2. Give the file a lowercase, hyphenated name. The path becomes the URL.
3. Update the frontmatter and write the article.
4. Remove `draft: true` or set it to `false` when ready to publish.
5. Run `npm run verify`, inspect the page, and commit the change.

```yaml
---
title: A clear article title
description: What the reader will understand after reading.
category: fundamentals
order: 6
level: Foundational
updated: 2026-10-14
tags: [identity, example]
draft: false
---
```

`category` must be one of the eight folder names shown above. `level` can be `Foundational`, `Intermediate`, or `Advanced`. Use `order` to arrange articles within a topic. The date represents the last substantive review, not an automated build date.

Titles, metadata, category names, ordering, and dates are validated during the build. Sidebar links, topic pages, search, reading times, and previous/next navigation are generated automatically. To introduce another topic, update the definitions in `src/lib/categories.ts`.

Use ordinary relative Markdown links:

```markdown
[Authentication and authorization](../fundamentals/authentication-and-authorization.md)
```

These links work on GitHub and are transformed to site routes during the build. Broken local links and heading fragments fail verification. Keep file paths lowercase and use hyphens. Avoid Markdown HTML or scripts from untrusted sources; article content is maintained as trusted source code.

Drafts are excluded from the website, navigation, and search. A committed draft is still visible in a public GitHub repository.

## Publish on GitHub Pages

For `repson/iam-handbook`:

1. Open **Settings → Pages** in the GitHub repository.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push the project to `main`, or run **Check and deploy the handbook** manually from the Actions tab.
4. Once the deployment succeeds, open `https://repson.github.io/iam-handbook/`.

Pull requests run the same checks without publishing. A successful push to `main` builds and deploys the entire site, including content edits. GitHub Pages availability depends on repository visibility and your GitHub plan.

The workflow derives the owner and project path from the repository. For another project repository, the deployment adapts automatically. For local builds, change `astro.config.mjs` or supply `SITE_URL` and `BASE_PATH`.

For a custom domain or a `<owner>.github.io` root repository, set the appropriate public origin and use `BASE_PATH=/`. Update both local configuration and workflow variables. A custom domain also needs DNS and GitHub Pages settings; add `public/CNAME` only when using one.

## Editorial direction

Keep explanations vendor-neutral and approachable. Separate established definitions from illustrative design choices. Prefer standards, original research, and official documentation as sources. The introductory content is not a substitute for a full production integration specification.

See `guides/roadmap.md` for planned coverage and `guides/contribute.md` for the writing workflow. All articles, guides, and site code use the repository's MIT license.

## Technical references

- [Astro content collections](https://docs.astro.build/en/guides/content-collections/).
- [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).
- [GitHub Pages deployment with Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
