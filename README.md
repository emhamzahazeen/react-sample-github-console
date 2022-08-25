# SimSys Console

### Development Setup
This project uses [Nx](https://nx.dev) as monorepo tool .

#### Development server

Run `nx serve github-console-prototype` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

#### Build

Run `nx build github-console-prototype` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `nx test github-console-prototype` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

#### Understand workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

### Tools & Techniques

The project is only composed of React Functional Components, and uses NextJs as a framework.

Recoil has been for shared state management, and React Context along with dependency injection to 
decoupling UI logic with Business and Data Logic. 

Remotely fetched data is parsed with Zod to form a light weight anti-corruption layer in case remote 
server changes its schema. In case of remote schema changes root error will be identified much quicker.

For UI development ChakraUI has been used, the decision is purely un-opinionated and AntDesign or 
MaterialUI could be used.

### Limitations
- Limited unit and e2e tests and snapshot tests.
- No remote monitoring with tools like sentry, bugsnag or datadog
