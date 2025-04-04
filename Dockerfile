# Stage 1: Build React App
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy only package files for better layer caching
COPY package*.json ./

# Optional: clean npm cache
RUN npm cache clean --force

# Install ajv v6 and ajv-keywords v3 to avoid breaking changes
RUN npm install ajv@6 ajv-keywords@3 --legacy-peer-deps

# Install other dependencies
RUN npm install --legacy-peer-deps --ignore-scripts

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config if you have one (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
