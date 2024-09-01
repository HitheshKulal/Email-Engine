# Use a specific Node.js version as a base image
FROM node:20.17.0

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
