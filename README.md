# React Starter Template

This starter template provides a quick setup for a React project with Vite, Tailwind CSS, Prettier, environment variables, path aliases, and absolute imports.

## Getting Started

### Prerequisites

Make sure you have Node.js (version 12 or higher) and Yarn installed on your machine.

### Installation

1. Create a new React project with Vite:
   ```bash
   yarn create vite my-react-starter --template react
   ```

2. Navigate to the project directory:
   ```bash
   cd my-react-starter
   ```

3. Install additional dependencies:
   ```bash
   yarn add -D tailwindcss postcss autoprefixer prettier dotenv daisyui@latest
   ```

4. Initialize Tailwind CSS:
   ```bash
   npx tailwindcss init -p
   ```

5. Configure Tailwind CSS:
   Update `tailwind.config.js`:
   ```javascript
   module.exports = {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [require("daisyui")],
   }
   ```

6. Import Tailwind CSS in your CSS file:
   Create `src/index.css` and add:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

7. Import the CSS file in your `main.jsx`:
   ```javascript
   import './index.css'
   ```

8. Add Prettier script to `package.json`:
   Update `package.json`:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "format": "prettier --write \"**/*.{js,jsx,json,md}\""
   }
   ```

9. Configure environment variables:
   Create a `.env` file in your project root and add your environment variables there, e.g.:
   ```
   REACT_APP_API_KEY=your_api_key
   ```

10. Configure path aliases and absolute imports:
    Create `jsconfig.json` in your project root:
    ```json
    {
      "compilerOptions": {
        "baseUrl": "src",
        "paths": {
          "@/*": ["*"]
        }
      }
    }
    ```
    Update `vite.config.js`:
    ```javascript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          '@': '/src'
        }
      }
    })
    ```

11. Initialize a Git repository and create a remote repository on GitHub:
    ```bash
    git init
    ```
    Create a new remote repository on GitHub and push your starter template.

12. Use your starter template:
    Clone your starter template from GitHub:
    ```bash
    git clone https://github.com/your-username/my-react-starter.git
    ```
    Navigate to the project directory and install dependencies:
    ```bash
    cd my-react-starter
    yarn install
    ```
    Start the development server:
    ```bash
    yarn dev
    ```

## File Structure

Your project directory will have the following structure:

```
my-react-starter/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── yarn.lock
```

## Features

- React with Vite for fast development
- Tailwind CSS with daisyUI for styling
- Prettier for code formatting
- Environment variables management with dotenv
- Path aliases and absolute imports for better code organization

## License

This project is licensed under the [MIT License](LICENSE).
