# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.17.1

FROM node:${NODE_VERSION}-alpine AS base

# Set the working directory
WORKDIR /usr/src/app

# Use production node environment by default
ENV NODE_ENV production

# Install dependencies necessary for node-gyp
RUN apk add --no-cache python3 make g++

# Create a stage for installing dependencies
FROM base AS deps

# Download dependencies as a separate step to take advantage of Docker's caching
# Leverage a cache mount to /root/.npm to speed up subsequent builds
# Leverage bind mounts to package.json and package-lock.json to avoid copying them
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Create a stage for the application
FROM base AS app

# Copy node_modules from deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy application files
COPY . .

# Create a non-root user and switch to it
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nodejs -u 1001 \
    && chown -R nodejs:nodejs /usr/src/app
USER nodejs

# Expose the port that the application listens on
EXPOSE 5000

# Run the application
CMD ["node", "src/index.js"]