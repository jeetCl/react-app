# Stage 1: Build React App
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy only package files for layer caching
COPY package*.json ./

# Optional: clean npm cache
RUN npm cache clean --force

# Install specific versions to avoid breaking changes
RUN npm install ajv@6 ajv-keywords@3 --legacy-peer-deps

# Skip postinstall scripts (which cause workspace errors)
ENV NPM_CONFIG_IGNORE_SCRIPTS=true

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps || true

# Copy rest of the app
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Optional: copy custom nginx config
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
