# Install dependencies only when needed
FROM node:alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./
RUN npm i --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
RUN apk add wget && \
    wget -qO - https://gobinaries.com/tj/node-prune | sh
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npx prisma generate
RUN npm run build && npm install --production --ignore-scripts
# Remove development dependencies
RUN npm prune --production
# Remove leftovers from dependencies (.md, .ts, tests)
RUN node-prune

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run","start"]
