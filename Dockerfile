# Use the official Node.js 18 image as the base image
FROM node:18
WORKDIR /frontend
#WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY frontend/package*.json ./

COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app to the container
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

# docker build -t frontend .

# docker run -p 3000:3000 frontend
