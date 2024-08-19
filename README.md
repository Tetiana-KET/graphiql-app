# REST/GraphiQL Client

### Project Overview
This project is an educational initiative aimed at developing a lightweight application that combines the core functionalities of Postman and GraphiQL. The main focus of this task is to provide a practical learning experience in team-based development while deepening knowledge in Next.js and React.

### Objectives
- **Team Collaboration**: Gain hands-on experience in working collaboratively within a team, including version control, code reviews, and task management.
- **Next.js Mastery**: Strengthen and solidify understanding of Next.js, particularly focusing on its server-side rendering (SSR) capabilities.
- **React Best Practices**: Reinforce foundational React concepts, with a focus on hooks, component architecture, and state management.
- **TypeScript Proficiency**: Improve proficiency in TypeScript, ensuring type safety and better code quality throughout the project.
- **Quality and Testing**: Implement strict coding standards and aim for a minimum of 80% test coverage to ensure high code quality and reliability.
- 
### Key Features
- **REST and GraphQL Suppor**t: Enable users to send requests to both REST and GraphQL APIs.
- **User Authentication**: Include user authentication for accessing protected routes and storing user preferences.
- **Request History**: Implement a history feature to keep track of previously executed requests, allowing users to revisit and re-execute them.
- **Error Handling**: Provide robust error handling mechanisms for API requests and user inputs.
- **Internationalization (i18n)**: Support multiple languages to make the application accessible to a broader audience.
- **Responsive Design**: Ensure the application is fully responsive, providing an optimal experience across various devices and screen sizes starting from 320px.
- 
### Key pages in the application include:
- Sign In 🔑 / Sign Up 📝
- Welcome page: 🎉
- RESTful client page: 🌐
- GraphiQL client page: 🛠️
- History page: 📜
- 
### Project screenshots:

### Technology stack

- Main library: [**React**](https://react.dev/)
- The React Framework: [**Next.js**](https://nextjs.org/)
- Language: [**TypeScript**](https://www.typescriptlang.org/)
- Styling: [**SCSS**](https://sass-lang.com/)
- Linters: [**ESLint**](https://eslint.org/), [**Prettier**](https://prettier.io/)
- Pre-push/Pre-commit: [**Husky**](https://typicode.github.io/husky/)
- UI library: [**NextUI**]([https://mui.com/material-ui/](https://nextui.org/docs/guide/introduction#what-is-nextui))
- API: 
- Tests: 
- Routing: [**Next.js App Router**](https://nextjs.org/docs/app/building-your-application/routing)) 
- Hosting: [**Netlify**](https://www.netlify.com/)
- Task Board: [**GitHub Pages**](https://github.com/users/Tetiana-KET/projects/3/views/2))
- Code style: [**Wiki**]()

## [Deployment]()

### Setup instructions

- Make sure you have node.js installed on your machine before proceeding with the setup or installation process.
   We recommend using version 20.9.0 or higher. To check if Node.js is installed, you can use the following command:
```
node -v
```
- Make sure nmp is installed by running
```
npm -v
```
- Fork this repo.
- Clone your fork.
- Run `npm ci` in the root directory. This command will install dependencies based on the exact versions specified in the package-lock.json. It ensures a consistent and reproducible environment by installing dependencies exactly as specified, making it ideal for use in development, testing, and deployment workflows.

You can use `npm ci` or `npm i` depending on your specific needs and requirements for dependency management.
If you want to install dependencies exactly as specified in the package-lock.json file (ensuring consistency and reproducibility), you should use `npm ci`.
If you're okay with potentially updating dependencies to their latest versions according to the specified version ranges in the package.json file, you can use `npm install` or `npm i`.
- Run `npm run dev` to start the application in development mode
- Create a new branch from `develop`
```
git checkout -b <branch-name>
```
Branch name should be in the format feat|fix|chore|refactor/RSS-graphiql-app-issueNumber_short-description
(e.g., feat/RSS-graphiql-app-07_Implement-History-pages)
- Be careful with commit messages; they should be in the format:
   `feat|fix|chore|refactor|build/RSS-graphiql-app-07: Description of the change`
   `(e.g., feat/RSS-graphiql-app-07: Implement History page)`
- To test the app run `npm run test` command
- To run tests and see the test coverage, run `npm run test:coverage`

## Scripts available

#### Start development server

```
npm run dev
```

This command runs the `Next.js` application in development mode. It enables features like hot module replacement (HMR), which allows you to see changes in real time without needing to refresh the page. It also provides detailed error messages and debugging tools.

#### Build the project

To build the project run

```
npm run build
```

This command compiles the project and generates an optimized production-ready bundle using Next.js. The Next.js build process handles compiling TypeScript, bundling JavaScript, and optimizing assets, ensuring that the application is ready for deployment.

#### To run the production version of the app use:

```
npm start
```

This command runs the application in production mode. It serves the built version of the application, which is optimized for performance.

#### ESLint check

To check for code style and potential errors including TypeScript and TSX files (--ext ts,tsx), run

```
npm run lint
```

It also reports any unused disable directives (--report-unused-disable-directives) and sets the maximum number of warnings to 0 (--max-warnings 0), which means ESLint will treat warnings as errors. This script helps quickly identify code style issues and potential errors in the project

#### ESLint fix issues

To automatically fix ESLint errors and code style issues directory run:

```
npm run lint:fix
```

#### Check the production build

To check if the production build looks OK in your local environment use:

```
npm run preview
```

This command will first create an optimized production build using `npm run build`, and then start a local server that serves the production build at `http://localhost:3000`.

_It is important to note that `npm run start` is intended for previewing the production build locally and is not meant to be used as a production server._


#### Prettier check

To check if your files are formatted run

```
npm run prettier
```

This will output a human-friendly message and a list of unformatted files, if any.
It will run `prettier --check --ignore-unknown .`, that is set to ignore unknown file types. Prettier will not attempt to check files with extensions that it does not recognize.

#### Prettier fix issues

To fix code formatting issues using Prettier run:

```
npm run prettier:fix
```

The `--ignore-unknown` flag is also used to instruct Prettier not to format files with extensions that it does not recognize.

#### ESLint and Prettier fix issues

To make ESLint fix code style issues, and then format code using Prettier run

```
npm run format:all
```

It will run scripts `npm run lint:fix && npm run prettier:fix`

#### Set up Git hooks

To automatically set up Git hooks for code linting and formatting, run the following command after installing project dependencies:

```
npm run prepare
```

#### TypeScript Type Checking

To perform TypeScript type checking without generating JavaScript files, run the following command:

```
npm run types-check
```

#### Total code checking by 1 command

To perform total code checking, ensuring code quality and consistency before pushing changes to the repository or before building and deploying, run the command

```
npm run validate:all
```

#### To test the app run

```
npm run test
```

#### To run tests and see the test coverage, run 
```
npm run test:coverage
```
