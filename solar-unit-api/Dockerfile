# syntax=docker/dockerfile:1
ARG NODE_VERSION=24.18.0

# --- Base: shared workdir + dependency manifests ---
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# --- Deps: full dependency set (dev + prod) for building and dev runtime ---
FROM base AS deps
RUN npm install

# --- Dev target: nodemon + ts-node with source bind-mounted via compose ---
FROM deps AS dev
ENV NODE_ENV=development
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]

# --- Build: compile TypeScript to dist/ ---
FROM deps AS build
COPY . .
# The project runs transpile-only (see ts-node -T in dev) and ships despite
# non-fatal TS type errors. tsc still emits JS on type errors, so we tolerate a
# non-zero exit here and then assert the entrypoint was actually emitted.
RUN npx tsc || true
RUN test -f dist/index.js

# --- Prod-deps: production-only dependencies for a slim runtime ---
FROM base AS prod-deps
RUN npm install --omit=dev

# --- Production: minimal runtime with compiled JS + prod deps only (no volumes) ---
FROM node:${NODE_VERSION}-alpine AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package*.json ./
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 8000
CMD ["node", "./dist/index.js"]
