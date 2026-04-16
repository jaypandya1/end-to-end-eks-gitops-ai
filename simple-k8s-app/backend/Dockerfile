# Use a lightweight Node image
FROM node:20-alpine
WORKDIR /app

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of your application code
COPY . .

# Expose the port your API runs on (from your docker-compose.yml)
EXPOSE 3001

# Start the Node app directly
CMD ["node", "server.js"]