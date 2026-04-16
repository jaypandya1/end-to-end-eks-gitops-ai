# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first (leverages Docker cache)
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy your compiled React/Vite files
COPY --from=builder /app/dist /usr/share/nginx/html

# COPY YOUR NEW CONFIG HERE:
# This replaces the default Nginx config with your custom one
COPY nginx.config /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]