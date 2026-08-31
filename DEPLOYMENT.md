# Deploying the KTU SA website

How the Next.js site is deployed to Vercel today, and how to run the same build as a Docker container.

The CMS it reads from is a separate application in the [KtuSaHeadlessCMS](https://github.com/Justxs/KtuSaHeadlessCMS) repository — see `docs/DEPLOYMENT.md` there. The only coupling between them is `KTU_SA_WEB_API_URL`.

---

## Contents

1. [What the site needs to run](#1-what-the-site-needs-to-run)
2. [Environment variables](#2-environment-variables)
3. [The build depends on the CMS being up](#3-the-build-depends-on-the-cms-being-up)
4. [Deploying to Vercel](#4-deploying-to-vercel)
5. [Deploying with Docker](#5-deploying-with-docker)
6. [Caching and when content appears](#6-caching-and-when-content-appears)
7. [Post-deployment checks](#7-post-deployment-checks)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. What the site needs to run

- **Node.js ≥ 20.9** (`package.json` engines). The Docker image uses Node 22.
- **A reachable CMS API**, both at build time and at request time.
- **Outbound HTTPS** to `wsrv.nl`, which resizes every remote image, and to `storage.googleapis.com`, where the media lives.

The site is a Node server, not a static export. Three routes read `searchParams` for pagination — `/[lang]/articles`, `/[lang]/events`, `/[lang]/faq` — so they render per request. `next export` and static-only hosts are not an option.

---

## 2. Environment variables

Two, both required in production:

| Variable | Purpose | Example |
| --- | --- | --- |
| `KTU_SA_WEB_URL` | Public origin of the site. Used for canonical URLs, `sitemap.xml`, `robots.txt`, and to decide whether the CSP includes `upgrade-insecure-requests` | `https://ktusa.lt` |
| `KTU_SA_WEB_API_URL` | Base URL of the CMS API, including the `/api` suffix | `https://cms.ktusa.lt/api` |

`KTU_SA_WEB_API_URL` is validated at first use: it must be an absolute `http:` or `https:` URL, and a missing value throws `KTU_SA_WEB_API_URL is required` rather than falling back to a default. Trailing slashes are stripped.

Both are **build-time** values as well as runtime ones. `KTU_SA_WEB_URL` is read inside `next.config.ts` while the config is evaluated, and `KTU_SA_WEB_API_URL` is called during the build by `generateStaticParams` and `sitemap.ts`. Changing either means rebuilding — restarting the container is not enough.

Neither is prefixed `NEXT_PUBLIC_`, so neither reaches the browser. The API URL is only ever called from the server.

---

## 3. The build depends on the CMS being up

This catches people out, so it is worth being explicit: `npm run build` makes real HTTP calls to the CMS.

- `generateStaticParams` in `app/[lang]/articles/[articleId]`, `app/[lang]/events/[eventId]` and `app/[lang]/fsa/[fsaName]` walks the full list of items so those pages can be prerendered.
- `app/sitemap.ts` does the same to enumerate every URL.

If the CMS is unreachable, slow, or returns a shape that fails Zod validation, **the build fails**. Two practical consequences:

- Do not redeploy the website while the CMS is down or mid-migration.
- The build machine needs network access to the CMS. If the CMS ever moves behind a VPN or an IP allowlist, Vercel's builders must be allowed through, or the site has to build somewhere that can reach it.

---

## 4. Deploying to Vercel

The project is already connected to Vercel. Pushes to the production branch deploy to production; every other branch and pull request gets a preview deployment.

There is no `vercel.json` and none is needed — Next.js is zero-config on Vercel. `output: 'standalone'` in `next.config.ts` exists for the Docker image and is ignored by Vercel's own build pipeline.

### Project settings

| Setting | Value |
| --- | --- |
| Framework preset | Next.js |
| Root directory | `KTU-SA-WEB` |
| Build command | default (`next build`) |
| Install command | default (`npm install`) |
| Node.js version | 22.x |

The root directory matters: the repository has the application in a `KTU-SA-WEB/` subdirectory, not at the top level.

### Environment variables

Set both variables from [section 2](#2-environment-variables) under **Settings → Environment Variables**, for Production and Preview alike. Preview deployments can point at the same CMS — the API is read-only, so they cannot damage anything.

Give Preview its own `KTU_SA_WEB_URL` matching the preview domain, or previews will emit canonical tags pointing at production.

### Deploying

Merge into the production branch. To ship the current `main`:

```bash
git checkout production && git merge main && git push
```

Roll back from the Vercel dashboard by promoting a previous deployment — instant, and it does not rebuild.

### Analytics

`@vercel/analytics` and `@vercel/speed-insights` are wired into the app and report only on Vercel. In Docker they are inert: the scripts are still bundled but have nothing to talk to, and the CSP already allows `*.vercel-insights.com` either way.

---

## 5. Deploying with Docker

`Dockerfile` and `docker-compose.yml` in `KTU-SA-WEB/` build the same application into a self-contained Node image using Next's standalone output — roughly 200 MB rather than the gigabyte a full `node_modules` copy would cost.

### Build and run

From `KTU-SA-WEB/`, create `.env` (git-ignored):

```bash
KTU_SA_WEB_URL=https://ktusa.lt
KTU_SA_WEB_API_URL=https://cms.ktusa.lt/api
```

```bash
docker compose up --build --detach
```

Compose passes both values in as build arguments *and* as runtime environment variables, because the build needs them baked in and the server needs them again per request.

Without compose:

```bash
docker build \
  --build-arg KTU_SA_WEB_URL=https://ktusa.lt \
  --build-arg KTU_SA_WEB_API_URL=https://cms.ktusa.lt/api \
  --tag ktu-sa-web:latest .
```

```bash
docker run --detach --name ktu-sa-web -p 127.0.0.1:3000:3000 \
  --env KTU_SA_WEB_URL=https://ktusa.lt \
  --env KTU_SA_WEB_API_URL=https://cms.ktusa.lt/api \
  ktu-sa-web:latest
```

The container listens on 3000 as a non-root user and holds no state — no volumes, and it can be replaced at any time.

### Reverse proxy

Same shape as the CMS. Caddy:

```caddyfile
ktusa.lt {
    reverse_proxy 127.0.0.1:3000
}
```

nginx:

```nginx
server {
    listen 443 ssl http2;
    server_name ktusa.lt;

    ssl_certificate     /etc/letsencrypt/live/ktusa.lt/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ktusa.lt/privkey.pem;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

Note that the site sets its own security headers in `next.config.ts` — Content-Security-Policy, `X-Frame-Options`, `Referrer-Policy` and the rest. Do not add a second set in the proxy: duplicate CSP headers are intersected by browsers, and the usual result is a page with no styling and no explanation.

### Running both apps on one server

With both repositories checked out side by side, run each stack from its own directory. They do not need to share a Docker network — the site reaches the CMS over its public HTTPS URL, exactly as it does from Vercel.

If you would rather keep the traffic internal, put both services on one external network and set `KTU_SA_WEB_API_URL=http://cms:8080/api`. Two caveats if you do: the API URL then differs between build and runtime unless the builder can also resolve `cms`, and any media URL the CMS generates must still be publicly reachable by visitors' browsers.

---

## 6. Caching and when content appears

Every API response is fetched with `next: { revalidate: 3600 }`, so **published content can take up to an hour to appear**. That is deliberate: it keeps the CMS off the critical path for visitors and means a CMS outage degrades to stale content rather than a broken site.

Requests also carry a 10 second timeout and retry once on `408`, `429` or any `5xx`.

To publish something immediately, redeploy — a new build starts with an empty cache. On Vercel that is a push or a **Redeploy** from the dashboard; in Docker, `docker compose up --build --detach`.

If waiting an hour becomes a routine complaint, the fix is on-demand revalidation — a webhook from the CMS calling `revalidateTag` — not a shorter interval. That is not built yet.

---

## 7. Post-deployment checks

```bash
curl -s -o /dev/null -w 'root %{http_code}\n' https://<host>/
curl -s -o /dev/null -w 'lt   %{http_code}\n' https://<host>/lt
curl -s -o /dev/null -w '404  %{http_code}\n' https://<host>/lt/definitely-not-a-page
```

`/` redirects to the default locale, `/lt` returns `200`, and an unknown path must return **`404`, not `200`** — a soft 404 here means the not-found handling regressed.

Then:

- [ ] `https://<host>/sitemap.xml` lists article and event URLs, not just the static pages
- [ ] `https://<host>/robots.txt` points at the right sitemap host
- [ ] An article page shows its hero image — proves `wsrv.nl` and the media bucket both work
- [ ] Page 2 of `/lt/articles` loads and shows different articles
- [ ] Switching language keeps you on the same page
- [ ] The browser console is clean — no CSP violations, no hydration warnings

---

## 8. Troubleshooting

**The build fails with `KTU_SA_WEB_API_URL is required`.**
The variable is missing from the build environment. On Vercel, check it is set for the environment being built, not only Production. In Docker, it must be a `--build-arg`; a runtime `--env` alone is too late.

**The build fails while fetching articles or generating the sitemap.**
The CMS was unreachable or returned an unexpected shape. See [section 3](#3-the-build-depends-on-the-cms-being-up). Confirm with `curl 'https://<cms-host>/api/articles?page=1&pageSize=1'` from the build machine's network.

**Images are broken everywhere.**
`wsrv.nl` proxies every remote image, and the CSP allows `https://storage.googleapis.com` and `https://wsrv.nl` only. A CMS media URL on any other host is blocked — check `PublicBaseUrl` on the CMS side, and add the host to `img-src` in `next.config.ts` if it changed deliberately.

**Everything renders unstyled.**
Almost always a duplicated Content-Security-Policy header from the reverse proxy. Browsers intersect multiple CSP headers, so the strictest wins and inline styles die. Remove the proxy's copy; the app already sets one.

**Content published in the CMS is not showing.**
Wait an hour, or redeploy. See [section 6](#6-caching-and-when-content-appears). If it is still missing after a fresh build, the item is a draft rather than published.

**`npm run check` fails on `AGENTS.md` or `CLAUDE.md`.**
`next dev` regenerates those files at the repository root and they do not satisfy the formatter. Either commit them, add them to `.gitignore` and the oxfmt ignore list, or set `agentRules: false` in `next.config.ts`. They are excluded from the Docker build already.
