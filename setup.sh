# Build a starter React app with TypeScript and Vite
# npm create vite@latest movie-surfer-app -- --template react-ts

# Install Jest for unit testing and ts-jest for TypeScript support
npm install --save-dev jest @types/jest ts-jest

# Install React Testing Library for testing React components and Jest DOM for
# custom matchers and assertions
npm install --save-dev @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event @types/testing-library__react

# Install Cypress for end-to-end testing and Cypress Image Snapshot for visual 
# regression testing
npm install --save-dev cypress cypress-image-snapshot

# Install Dotenv for environment variables and Axios for making API requests
npm install --save-dev dotenv axios

# Install React Router for routing and React Query for server state management
# and React Query Devtools for debugging
npm install --save-dev react-router-dom @tanstack/react-query \
  @tanstack/react-query-devtools 

# Install Material UI for UI components and Tailwind CSS for styling
npm install --save-dev @mui/material @emotion/react @emotion/styled \
  tailwindcss postcss autoprefixer


