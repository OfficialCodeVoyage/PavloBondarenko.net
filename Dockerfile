# syntax = docker/dockerfile:1

# Set the Node.js version
ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Next.js"

# Set working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install system dependencies required for builds
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    pkg-config \
    python-is-python3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Stage 1: Build the application
FROM base AS build

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies (including devDependencies for the build process)
RUN npm install

# Copy the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Final image for production
FROM base

# Copy only necessary files from the build stage
COPY --from=build /app/next.config.mjs ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules

# Expose the port Next.js will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
