# syntax = docker/dockerfile:1

# Set the Node.js version
ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Next.js"

# Set working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install system dependencies required for build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    pkg-config \
    python-is-python3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm install --production

# Build stage
FROM base AS build

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Final stage: runtime image
FROM base

# Copy only the necessary files from the build stage
COPY --from=build /app/next.config.js ./
COPY --from=build /app/package.json ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
