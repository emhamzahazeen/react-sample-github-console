
# SimSys Console

### Development Setup
This project uses [Nx](https://nx.dev).

#### Adding capabilities to your workspace

Project supports nx plugins to add capabilities for developing different types of applications and different tools include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

#### Generate a new application

> You can use any of the supported plugins to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

#### Generate a library

> You can use any of the plugins to generate libraries (if supported) as well.

Libraries are shareable across libraries and applications. They can be imported from `@bloc-starter/lib-name`.

#### Development server

Run `nx serve app-name` for a dev server. Navigate to http://localhost:<app-port>/. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Supports code scaffolding, see exact plugin for examples.

#### Build

Run `nx build app-name` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `nx test app-name` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

#### Running end-to-end tests

Run `nx e2e app-name` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

#### Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.
