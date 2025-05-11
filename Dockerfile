# Stage 1: Build the Next.js Application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /next-app

# Copy dependency files
COPY package.json .
COPY yarn.lock .

# Install dependencies
RUN yarn install

# Copy all source files
COPY . .

# Use the CACHEBUST argument to invalidate cache and trigger rebuild of the application to fetch new data
ARG CACHEBUST
RUN echo "Cachebust value: $CACHEBUST"

# Build the Next.js application
RUN yarn build

# Stage 2: Run the Next.js Application
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /next-app

# Copy build output and dependencies from the builder stage
COPY --from=builder /next-app/.next ./.next
COPY --from=builder /next-app/node_modules ./node_modules
COPY --from=builder /next-app/public ./public
COPY --from=builder /next-app/package.json ./package.json
COPY --from=builder /next-app/next.config.ts ./next.config.ts

# Set environment to production
ENV NODE_ENV=production

# Expose default Next.js Port
EXPOSE 3000

# Start the application on port 80
CMD ["yarn", "start"]
