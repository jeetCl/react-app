# Stage 1: Build
FROM node:18-alpine as build

# Set working dir
WORKDIR /app

# Copy entire repo
COPY . .

# Install workspace dependencies
RUN npm install --legacy-peer-deps

# Build using your monorepo script
RUN npm run build

# Stage 2: Serve the build output
FROM nginx:alpine

# Copy only the frontend build (adjust path if different)
COPY --from=build /app/packages/react-scripts/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
