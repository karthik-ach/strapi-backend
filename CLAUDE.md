# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start with auto-reload (development)
npm run start        # Start without auto-reload (production)
npm run build        # Build the admin panel
npm run seed:example # Seed example data (runs once; clears DB to re-seed)
npm run console      # Open Strapi interactive console
```

There is no lint or test script configured.

## Environment Setup

Copy `.env.example` to `.env` and fill in values. Required variables:

```
HOST=0.0.0.0
PORT=1337
APP_KEYS="key1,key2"
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
ENCRYPTION_KEY=...
```

Database defaults to SQLite (`.tmp/data.db`). Set `DATABASE_CLIENT=postgres` and corresponding `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` (or `DATABASE_URL`) to switch to PostgreSQL. The `pg` package is already included as a dependency.

## Architecture

Strapi v5 app (TypeScript) with a PostgreSQL-capable backend serving content via REST API on port 1337. The admin panel runs at `/admin`.

### Content Types

**Collection types** (multiple entries):
- `article` — blog content with draft/publish, `slug` (auto from title), cover image, dynamic zone `blocks` (rich-text, media, quote, slider components), `manyToOne` relations to `author` and `category`
- `author` — name, avatar, email; `oneToMany` inverse relation to articles
- `category` — categorizes articles
- `blog` — minimal (name only); separate from the article-based blog system

**Single types** (one entry each):
- `global` — site-wide settings: `siteName`, `siteDescription`, `favicon`, `defaultSeo` (shared.seo component)
- `about-us` — `title` (about.banner component) and `team` (repeatable about.team component)

### Components

- `shared.seo` — metaTitle, metaDescription, shareImage
- `shared.rich-text`, `shared.media`, `shared.quote`, `shared.slider` — used in article dynamic zone
- `about.banner`, `about.team` — used by the about-us single type

### Custom Routes

The `about-us` API has two additional public (no-auth) endpoints beyond CRUD:

- `GET /api/about-us/banner` → returns only the banner component
- `GET /api/about-us/team` → returns only the team array

These are defined in [src/api/about-us/routes/custom-about-us.ts](src/api/about-us/routes/custom-about-us.ts) and handled by [src/api/about-us/controllers/about-us.ts](src/api/about-us/controllers/about-us.ts).

### Controllers / Services / Routes Pattern

Each API follows Strapi's factory pattern. Controllers and services extend the core factory defaults — only override what needs customization. Routes auto-generate CRUD; add a second routes file (like `custom-about-us.ts`) for non-standard endpoints.

### Seed Data

`npm run seed:example` imports categories, authors, articles, global, and about data from `data/data.json` and uploads images from `data/uploads/`. It also sets public read permissions for those content types. The seed is idempotent via a `initHasRun` flag — it will not re-run unless you clear the database.

### Plugins

- `@strapi/plugin-users-permissions` — handles JWT auth, roles, and permissions
- `@strapi/plugin-cloud` — Strapi Cloud deployment support
