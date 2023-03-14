FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json file
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Expose the server port
EXPOSE 3000

# Initiate the start
CMD npm run dev