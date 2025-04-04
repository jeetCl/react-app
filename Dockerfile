# Stage 1: Build
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and lock files first (for better caching)
COPY package*.json ./
COPY .npmrc .npmrc

# Optional: clean npm cache (helps with weird issues)
RUN npm cache clean --force

# Manually install ajv v6 and ajv-keywords v3 to avoid breaking changes
RUN npm install ajv@6 ajv-keywords@3 --legacy-peer-deps

# Now copy the rest of the app
COPY . .

# Install remaining dependencies with legacy flag
RUN npm install --legacy-peer-deps

# Build the app
RUN npm run build

# Stage 2: Serve the build output
FROM nginx:alpine

# Copy only the frontend build output
COPY --from=build /app/packages/react-scripts/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
