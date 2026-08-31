# syntax=docker/dockerfile:1

# ---------- dependencies ----------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Both are read at build time: KTU_SA_WEB_URL decides the Content-Security-Policy
# in next.config.ts, and KTU_SA_WEB_API_URL is called by generateStaticParams and
# sitemap.ts. The CMS API must be reachable from the builder or the build fails.
ARG KTU_SA_WEB_URL
ARG KTU_SA_WEB_API_URL
ENV KTU_SA_WEB_URL=$KTU_SA_WEB_URL \
    KTU_SA_WEB_API_URL=$KTU_SA_WEB_API_URL \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

RUN npm run build

# ---------- runtime ----------
FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 --ingroup nodejs nextjs

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget --quiet --spider http://127.0.0.1:3000/en || exit 1

CMD ["node", "server.js"]
