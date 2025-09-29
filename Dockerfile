# Use Node.js 20 alpine for smaller image size
FROM node:20-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Create non-root user for security
RUN adduser -D -s /bin/sh nodeuser

# Change ownership of the app directory to the nodeuser
RUN chown -R nodeuser:nodeuser /app
USER nodeuser

# Expose port 8080 (Cloud Run will provide actual port via PORT env var)
EXPOSE 8080

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["npm", "start"]