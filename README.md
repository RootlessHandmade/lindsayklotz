# lindsayklotz.com

Personal blog — Design · Learning · Innovation

## Stack
- **Next.js 14** (App Router)
- **Markdown** for posts (`content/posts/*.md`)
- **CSS Modules** for scoped styling
- **Vercel** for deployment

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Writing a post

Create a new `.md` file in `content/posts/`:

```markdown
---
title: "Your post title"
date: "2026-05-14"
excerpt: "A one-sentence summary shown on cards."
tags: ["Design", "Learning"]
readTime: 5
---

Your content here...
```

That's it. The post appears automatically on the homepage and blog page.

## Deployment

Push to GitHub → Vercel auto-deploys on every commit to `main`.

## Brand tokens

All brand colors and fonts live in `app/globals.css` as CSS variables:

| Token | Value |
|-------|-------|
| `--pink` | `#FF3CAC` |
| `--mint` | `#4DFFD2` |
| `--ink` | `#0D0D0D` |
| `--paper` | `#F7F5F2` |
| `--font-display` | Syne 800 |
| `--font-body` | Space Grotesk 400/500 |
