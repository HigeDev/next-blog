# === Build Stage ===
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Generate Prisma client and build Next.js
RUN npx prisma generate
RUN npm run build

# === Production Stage ===
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files
COPY package*.json ./
RUN npm install --omit=dev --no-cache

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# jika kamu pakai schema di runtime
# COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.js ./

EXPOSE 3000

CMD ["npm", "start"]
