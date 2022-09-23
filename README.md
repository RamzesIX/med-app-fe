# med-app-fe
Client application used to manage medical information like diseases, risks or symptoms.

### Prerequisites

In order to install project dependencies and run/build the app, please ensure that you have the following software installed:
- Node.js v16.14.2 or later
- NPM v8.5.0 or later
You will find more details regarding the Node.js and NPM installation [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Project dependencies
Run the following command to install the project dependencies:
```
npm ci 
```
#### Automated code formatting and linting

ESLint and Prettier are used for code formatting and linting for better readability and maintainability. The tools are run on every Git commit, so it's required to enable Git hooks before development.

Run the following command to enable Git Hooks: 
```
npm run prepare
```

### Development
To run the app using dev server, use the following command:
```
npm run start
```
Hot reloading is enabled automatically. The app should be available in browser at at http://localhost:8080.

### Build
To build the project use the following command:
```
npm run build
```
The resulted build includes the production environment configuration.

### App environment
- Default dev environment configuration can be found in `.env` file. Note that you should use `env.local` file during development in order to override the configuration locally. Thus, copy `.env` file and rename it to `.env.local` and feel free to make any changes.
- Production environment configuration can be found in `.env.production` file.
