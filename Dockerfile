ARG NODE_VERSION=iron-slim

# build
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
ENV NODE_ENV=production

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

RUN npm run build

# runtime
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

COPY --from=builder app/public ./public
COPY --from=builder app/.next/standalone ./
COPY --from=builder app/.next/static ./.next/static

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXTAUTH_URL=http://localhost:${PORT}
EXPOSE ${PORT}

ARG SERVER_BACKEND_URL
ENV SERVER_BACKEND_URL=${SERVER_BACKEND_URL}

CMD ["node", "server.js"]
