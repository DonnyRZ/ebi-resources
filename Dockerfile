# syntax=docker/dockerfile:1

# =============================================================================
# EBI Resources - Production Dockerfile
# Next.js (App Router) with output: 'standalone' + npm + Prisma on Alpine
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: deps - install node_modules and generate Prisma client
# -----------------------------------------------------------------------------
FROM node:20-alpine AS deps
# openssl & libc6-compat are required by Prisma engines on Alpine (musl).
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app

# Install dependencies based on the lockfile for reproducible builds.
COPY package.json package-lock.json ./
RUN npm ci

# Copy Prisma schema (if present) and generate the client.
# The wildcard keeps the build working even before the app worker adds prisma/.
COPY prisma ./prisma
RUN if [ -f prisma/schema.prisma ]; then npx prisma generate; fi

# -----------------------------------------------------------------------------
# Stage 2: builder - build the Next.js application
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app

# Reuse installed deps (incl. generated Prisma client) from the deps stage.
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

# Requires `output: 'standalone'` in next.config.* -> emits .next/standalone.
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 3: runner - minimal production runtime, non-root user
# -----------------------------------------------------------------------------
FROM node:20-alpine AS runner
# openssl is still needed at runtime for Prisma query engine.
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create a dedicated non-root user/group to run the server.
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy public assets. Kept optional-safe via the standalone copy below.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy the standalone server output. This already contains a pruned
# node_modules and the server.js entrypoint.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Static assets are NOT included in standalone and must be copied separately.
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
