# === Build Stage ===
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package files
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Generate Prisma client & Build Next.js
RUN npx prisma generate
RUN npm run build

# === Production Stage ===
FROM node:20-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy only necessary files for standalone Next.js
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# If needed at runtime:
# COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "server.js"]
