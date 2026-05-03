# Use the official Playwright image
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables if needed
# ENV CI=true

# Command to run tests
CMD ["npx", "playwright", "test", "--project=chromium"]
