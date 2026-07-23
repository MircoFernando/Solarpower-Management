# syntax=docker/dockerfile:1
ARG NODE_VERSION=24.18.0

# --- Base: shared workdir + dependency manifests ---
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
COPY package*.json ./

# --- Deps: install full dependency set (dev + prod) ---
FROM base AS deps
RUN npm install

# --- Dev target: Vite dev server with HMR (source is bind-mounted via compose) ---
FROM deps AS dev
ENV NODE_ENV=development
COPY . .
EXPOSE 5173
# --host exposes the dev server outside the container network namespace
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# --- Build: produce the optimized static bundle ---
FROM deps AS build
# VITE_* values are statically inlined at build time, so they must be present here.
# Supplied as build-args (never hardcoded) by CI or `docker build --build-arg`.
ARG VITE_BACKEND_URL
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_STRIPE_PUBLISHABLE_KEY
ARG VITE_WEATHER_KEY
ARG VITE_WEATHER_API
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL} \
    VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY} \
    VITE_STRIPE_PUBLISHABLE_KEY=${VITE_STRIPE_PUBLISHABLE_KEY} \
    VITE_WEATHER_KEY=${VITE_WEATHER_KEY} \
    VITE_WEATHER_API=${VITE_WEATHER_API} \
    VITE_EMAILJS_SERVICE_ID=${VITE_EMAILJS_SERVICE_ID} \
    VITE_EMAILJS_TEMPLATE_ID=${VITE_EMAILJS_TEMPLATE_ID} \
    VITE_EMAILJS_PUBLIC_KEY=${VITE_EMAILJS_PUBLIC_KEY}
COPY . .
RUN npm run build

# --- Production: lightweight nginx serving the static SPA (no Node runtime, no volumes) ---
FROM nginx:1.27-alpine AS production
# SPA fallback so client-side routes resolve to index.html
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:css|js|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|ico|webp)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
EOF
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
