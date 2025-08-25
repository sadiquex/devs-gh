# FROM node:18-alpine

# # Set working directory
# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Install dependencies
# RUN npm ci --only=production

# # Copy source code
# COPY . .

# # Build the application
# RUN npm run build

# # Expose port
# EXPOSE 3000

# # Start the application
# CMD ["npm", "start"]


FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install  

COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]
