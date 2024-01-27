# Use the official Node.js image with version 20.11.0 as the base image
FROM node:20.11.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your Angular app will run on
EXPOSE 4200

# Start the Angular application
CMD ["npm", "start"]
