# Use the official Node.js image from the Docker Hub
FROM node:22

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN rm -rf node_modules package-lock.json
RUN npm cache clean --force
RUN npm install
# RUN npm install @rollup/rollup-linux-x64-gnu --save-optional
# RUN npm audit fix --force

# Copy the rest of the application files
COPY . .

# Start the application
EXPOSE 3000
# RUN npm run build
CMD ["npm", "run", "dev"]
