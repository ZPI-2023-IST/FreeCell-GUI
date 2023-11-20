# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm cache clean --force
# Install project dependencies

RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your Next.js app will run on
EXPOSE 5005

# Command to run your Next.js app
CMD ["npm", "run", "dev"]
