# Use an official Node.js runtime as the base image
FROM node:18.17.1-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies required for Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn \
    font-liberation \
    fontconfig

# Tell Puppeteer to use the installed Chrome instead of downloading its own
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Create and set permissions for the images directory
RUN mkdir -p /usr/src/app/src/backend/images && chown -R node:node /usr/src/app/src/backend/images

# Copy the rest of the application code
COPY --chown=node:node . .

# Use non-root user
USER node

# Expose the port the app runs on
EXPOSE 5001

# Command to run the application
CMD ["node", "src/backend/index.js"]