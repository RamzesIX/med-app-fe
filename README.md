# [Showcase][React] Single Page app
Showcase app to demonstrate the code quality, architectural decisions and UX approaches I usually make developing a client Web app. The repository contains the client application used to manage medical information like diseases, risks or symptoms. You can find and check the server app [here](https://github.com/RamzesIX/med-app-be).

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
Hot reloading is enabled automatically. The app should be available in browser at http://localhost:8080.

#### Default user credentials

There are default user credentials you can use in order sign in into the app:
```
login: admin@test.com
password: admin
```

### Build
To build the project use the following command:
```
npm run build
```
The resulted build includes the production environment configuration.

### App environment
- Default dev environment configuration can be found in `.env` file. Note that you can use `env.local` file during development in order to override the configuration locally.
- Production environment configuration can be found in `.env.production` file.

#### Configuration

The following environment variables are used for project configuration:

- `APP_API` - URI to the server API


### Further development

Please check [TODO file](TODO.md) to see the tasks.
