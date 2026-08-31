# KTU SA Website

Public-facing website for the **Kaunas University of Technology Student Union (KTU SA)**. Built with Next.js, React, and Material UI, the site serves news, events, contacts, documents, and other information in Lithuanian and English.

Deploying it? See **[DEPLOYMENT.md](DEPLOYMENT.md)** — Vercel and Docker.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack dev server)
- **UI:** [React 19](https://react.dev/), [MUI 9](https://mui.com/) (Material UI + Emotion)
- **Language:** TypeScript 7
- **Internationalisation:** [next-intl](https://next-intl.dev/) – locales: `lt`, `en`
- **Carousel:** Embla Carousel
- **Animations:** Motion (Framer Motion)
- **Linting:** Oxlint with type-aware TypeScript and React rules
- **Formatting:** Oxfmt

## Prerequisites

| Tool    | Version |
| ------- | ------- |
| Node.js | ≥ 20.9  |
| npm     | ≥ 10    |

## Getting Started

```bash
# 1. Clone the repository
git clone <repository-url>
cd KTU-SA-Site/KTU-SA-WEB

# 2. Install dependencies
npm install

# 3. Create a .env.local file (see "Environment Variables" below)
cp .env.example .env.local

# 4. Start the development server (Turbopack)
npm run dev
```

The app will be available at **http://localhost:3000**.

## Environment Variables

Create a `.env.local` file in the `KTU-SA-WEB/` directory (or copy the provided example):

```bash
cp .env.example .env.local
```

| Variable             | Description                          | Default                      |
| -------------------- | ------------------------------------ | -----------------------------|
| `KTU_SA_WEB_URL`     | Public base URL (required in production) | `http://localhost:3000`   |
| `KTU_SA_WEB_API_URL` | Required backend API base URL        | `http://localhost:5000/api`  |

### `.env.example`

```env
# Public URL of the website (used for SEO, sitemap, robots.txt)
KTU_SA_WEB_URL=http://localhost:3000

# Backend API base URL (required – all data is fetched from here)
KTU_SA_WEB_API_URL=http://localhost:5000/api
```

> **Note:** `.env.local` is git-ignored by default in Next.js. Never commit real credentials or production URLs.

## Available Scripts

| Command                    | Description                                            |
| -------------------------- | ------------------------------------------------------ |
| `npm run dev`              | Start the Turbopack development server                 |
| `npm run build`            | Create a production build                              |
| `npm start`                | Serve the production build                             |
| `npm run lint`             | Format and lint the project with automatic fixes       |
| `npm run lint:check`       | Check formatting and linting without changing files    |
| `npm run typecheck`        | Generate Next.js types and run TypeScript               |
| `npm run validate-locales` | Validate that locale JSON files have matching keys      |
| `npm run check`            | Run formatting, linting, types, and locale validation   |

## Project Structure

```
KTU-SA-WEB/
├── app/                  # Next.js App Router pages
│   ├── [lang]/           # Locale-scoped routes (lt / en)
│   │   ├── about-us/
│   │   ├── articles/
│   │   ├── contacts/
│   │   ├── documents/
│   │   ├── events/
│   │   ├── faq/
│   │   ├── fsa/
│   │   └── ...
│   ├── global-error.tsx  # Last-resort application error boundary
│   ├── robots.ts         # robots.txt generation
│   └── sitemap.ts        # Sitemap generation
├── components/           # Reusable UI components
├── constants/            # Static data & configuration
├── i18n/                 # Internationalisation setup (routing, request)
├── lib/                  # API clients, image loaders, SEO helpers
├── locales/              # Translation files (en.json, lt.json)
├── public/               # Static assets (images, icons, fonts)
├── styles/               # Global CSS
├── theme/                # MUI theme customisation (colours, styles)
└── utils/                # Utility functions (dates, strings)
```

## Path Aliases

Configured in `tsconfig.json`:

| Alias      | Maps to        |
| ---------- | -------------- |
| `@api/*`   | `./lib/api/*`  |
| `@*`       | `./*`          |

## Internationalisation

The site supports **Lithuanian (`lt`)** and **English (`en`)**. Translation strings live in `locales/lt.json` and `locales/en.json`. Run `npm run validate-locales` to verify both files have matching keys.

## Code Quality

- **Oxlint** runs type-aware correctness, Next.js, React, accessibility, import, and deprecation rules from `.oxlintrc.json`.
- **Oxfmt** handles formatting using `.oxfmtrc.json`.
- Run `npm run check` before committing. Use `npm run lint` when you want formatting and lint fixes applied automatically.
