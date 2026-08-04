# =========================================================
# Stage 1: Build static assets using Node.js & pnpm
# =========================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Enable Corepack for pnpm support
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package manifests first for optimal layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

# Install dependencies (use frozen lockfile for build reproducibility)
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Run type check and Vite build
RUN pnpm run build

# =========================================================
# Stage 2: Serve static files using Nginx Alpine
# =========================================================
FROM nginx:1.25-alpine AS runner

# Remove default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy custom optimized Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check instruction
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
