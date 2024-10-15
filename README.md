# Project Setup Instructions

## Prerequisites

Before starting, ensure you have the following tools installed on your system:

- **Homebrew**: A package manager for macOS. Install it from [here](https://brew.sh/).
- **NVM (Node Version Manager)**: Manage multiple Node.js versions. Installation instructions are available on their [GitHub page](https://github.com/nvm-sh/nvm).
- **Node.js**: Install the LTS version using NVM to ensure compatibility.
- **pnpm**: A fast, disk space-saving package manager. Install it globally using `npm install -g pnpm`.
- **Docker/Orbstack**: Essential for container management. Download Docker [here](https://www.docker.com/) or Orbstack [here](https://orbstack.dev/).
- **VSCode Plugins**: Enhance your coding experience with these plugins:
  - Eslint
  - JavaScript and TypeScript Nightly
  - Prettier
  - React

## Workspaces

The project is structured into two main directories: `apps` and `packages`, each containing specific components of the project.

### `apps`

This directory contains the main applications and services of the project:

- **`api`**: This is the API server, which utilizes:

  - **TRPC**: A type-safe RPC framework.
  - **Zod**: A TypeScript-first schema declaration and validation library.
  - **Drizzle ORM**: An object-relational mapping tool for managing database operations.

- **`temporal`**: A robust workflow manager designed to handle operations such as email sending, orchestrating complex workflows, and more.

- **`web`**: The front-end client built with:
  - **React**: A JavaScript library for building user interfaces.
  - **MUI (Material-UI)**: A popular React UI framework featuring a comprehensive library of design components.
  - **React Hook Form**: An efficient library for managing forms in React, offering superb performance and minimal re-renders.
  - **TRPC + React Query**: Used together to enhance the frontend with type-safe data fetching, server-state management, and providing type hints.

### `packages`

This section includes shared configurations and libraries used across the project:

- **`eslint-config`**: Contains shared ESLint configurations to maintain consistent code styles and enforce best practices across the project.

- **`typescript-config`**: Houses shared TypeScript configurations to ensure consistent compiler behavior and type-checking across different parts of the project.

- **`mjml`**: Includes email templates crafted with MJML and MJML-react, providing a responsive email design solution.

- **`ui`**: A library of shared UI components, promoting reusability and consistency in the design across the front-end applications.

## Getting Started

Follow these steps to set up your project environment:

1. **Initialize the Project**:

   - Run `pnpm install` to install all npm packages. This command also initializes Docker to set up essential services like Redis, smtp4dev, Temporal, and PostgreSQL.

2. **Environment Configuration**:

   - Create a `.env.development` file in the following directories and populate it with the necessary environment variables:
     - `apps/api/env`
     - `apps/temporal/env`

3. **Database Setup**:

   - Navigate to your API directory and run migrations:
     ```
     cd apps/api && pnpm push:dev
     ```
     This command updates the PostgreSQL database and creates the necessary tables.

4. **Development Server**:
   - Execute `turbo dev` to transpile the code and run everything in development mode.

Ensure you have all the necessary environment variables configured before starting the services to avoid any runtime errors. Happy coding!
