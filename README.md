# PH University

PH University is a comprehensive online class management system designed to streamline and enhance the educational experience for both students and faculty. Leveraging modern technologies, this platform provides a robust server-side infrastructure to support various features crucial for effective online learning.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Scripts](#scripts)
- [Linting and Formatting](#linting-and-formatting)
- [Testing](#testing)
- [Dependencies](#dependencies)
- [License](#license)

## Getting Started

To get started with PH University, follow the installation instructions in the project's README. Ensure you have Node.js, npm, and MongoDB installed.
Feel free to contribute, report issues, or suggest enhancements to make PH University an even more powerful tool for online education!

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (optional, if your project uses MongoDB)

## Installation

1. Clone the repository:

```bash
 git clone https://github.com/akhtarhssn/ph-university.git
```

2. Navigate to the project directory:

```bash
cd ph-university
```

3. Install dependencies:

```bash
 npm install
```

## Scripts

`npm start:prod`

Starts the production server using nodemon. It monitors changes in the ./dist directory and restarts the server.

```bash
npm start:prod
```

`npm start:dev`

Starts the development server using ts-node-dev. It restarts the server on file changes and transpiles TypeScript on the fly.

```bash
npm run start:dev
```

`npm build`

Builds the TypeScript code using the TypeScript compiler (tsc). Outputs the transpiled code to the ./dist directory.

```bash
npm run build
```

`npm lint`

Runs ESLint to lint TypeScript files in the ./src directory.

```bash
npm run lint
```

`npm lint:fix`

Runs ESLint with the --fix option to automatically fix linting issues.

```bash
npm run lint:fix
```

`npm prettier`
Formats code using Prettier based on the configuration in .prettierrc file.

```bash
npm run prettier
```

## Linting and Formatting

Linting is performed using ESLint, and code formatting is done with Prettier. To lint the project:

```bash
npm run lint
```

To automatically fix linting issues:

```bash
npm run lint:fix
```

To format code using Prettier:

```bash
npm run prettier
```

## Dependencies

- bcrypt
- cors
- dotenv
- express
- mongoose
- zod

## Dev Dependencies

- @types/bcrypt
- @types/cors
- @types/express
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint
- eslint-config-prettier
- prettier
- ts-node-dev
- typescript
