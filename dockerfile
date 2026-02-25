# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy app source
COPY . .

# Stage 2: Run
FROM node:18-alpine

WORKDIR /app

# Copy only what is needed from builder
COPY --from=builder /app ./

# Expose port
EXPOSE 3000

# Command to run app
CMD ["node", "index.js"]