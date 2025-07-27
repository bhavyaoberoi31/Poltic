# Base image for dependencies
FROM node:20 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Development dependencies
FROM node:20 AS dev-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Client Development Stage
FROM node:20 AS client-development
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY ./ ./ 
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build the Next.js app
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY ./ ./  
RUN npm run build 

# Production image with Next.js server
FROM node:20-alpine AS client-production
WORKDIR /app
ENV NODE_ENV=production

# Copy built Next.js application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]