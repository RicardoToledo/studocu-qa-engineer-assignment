# StuDocu QA Engineer Assignment

This project is an automated test suite for user acceptance testing of the [Awesome QA Tool webpage web application](https://github.com/StuDocu/qa-engineer-assignment) using [Playwright](https://playwright.dev/docs/intro) with [TypeScript](https://www.typescriptlang.org/). It includes tests for verifying UI elements and functionalities related to questions and answers. For details about the testing strategy consult [Test Plan]().

## Table of contents

- [Test Plan](#test-plan)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Tests](#running-the-tests)
    - [Predefined npm Scripts](#predefined-npm-scripts)
- [CI with GitHub Actions](#ci-with-github-actions)
- [License](#license)
- [Author](#author)

## Test Plan

For detailed information on the test strategy, including test cases, selection criteria, scope, and more, please refer to the [Test Plan](test-plan.md).

## Installation
#### Prerequisites

- Node.js: [Download](https://nodejs.org/)
- Git: [Download](https://git-scm.com/)

> Make sure you have these prerequisites installed before proceeding with the project setup and running.

#### Instructions

1. Clone the repository:
```sh
git clone https://github.com/RicardoToledo/studocu-qa-engineer-assignment
```

2. Install the dependencies from the root directory:
```sh
npm install
npx playwright install
```

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── ui-test-automation.yml
├── interfaces
│   └── question-answer-pair.ts
├── pages
│   └── questions-page.ts
├── tests
│   └── awesomeqatool-user-acceptance.spec.ts
├── the-awesome-qa-webpage/
├── utils
│   ├── constants.ts
│   ├── data-generator.ts
│   └── utils.ts
├── .gitignore
├── eslint.config.mjs
├── LICENSE
├── package-lock.json
├── package.json
├── playwright.config.ts
├── README.md
├── test-plan.md
└── tsconfig.json
```

**CI Workflow**

- [ui-test-automation.yml](/qa-engineer-assignment/.github/workflows/ui-test-automation.yml): Defines the continuous integration workflow for running Playwright tests automatically on every push or pull request using GitHub Actions.

**Interfaces**

- [question-answer-pair.ts](/qa-engineer-assignment/interfaces/question-answer-pair.ts): Defines the interface for a question and answer pair.

**Pages**

- [questions-page.ts](/qa-engineer-assignment/pages/questions-page.ts): Contains methods for interacting with the questions page.

**Tests**

- [awesomeqatool-user-acceptance.spec.ts](/qa-engineer-assignment/tests/awesomeqatool-user-acceptance.spec.ts): Contains user acceptance tests.

**Awesome QA Tool webpage**

- [the-awesome-qa-webpage/](/qa-engineer-assignment/the-awesome-qa-webpage): Contains the web application used for testing purposes.

**Utilities**

- [constants.ts](/qa-engineer-assignment/utils/constants.ts): Contains constant values used throughout the tests.
- [dataGenerator.ts](/qa-engineer-assignment/utils/dataGenerator.ts): Contains functions for generating test data using [Faker](https://github.com/faker-js/faker).
- [utils.ts](/qa-engineer-assignment/utils/utils.ts): Contains utility functions used in the tests.

**Documentation**

- [README.md](/qa-engineer-assignment/README.md): Provides an overview of the project, installation instructions, and details on how to run the test suite.
- [test-plan.md](/qa-engineer-assignment/test-plan.md): Outlines the testing strategy, including the scope, objectives, and specific test cases for the Awesome QA Tool webpage.

**Other Files**

- [playwright.config.ts](/qa-engineer-assignment/playwright.config.ts): Playwright configuration file for the project (error handling, reporters, browsers, etc.).
- [eslint.config.mjs](/qa-engineer-assignment/eslint.config.mjs): ESLint configuration file for linting the test files.
- [package-lock.json](/qa-engineer-assignment/package-lock.json): Lock file generated by npm.
- [package.json](/qa-engineer-assignment/package.json): Package manifest file containing project dependencies and scripts.
- [tsconfig.json](/qa-engineer-assignment/tsconfig.json): TypeScript configuration file for the project.

## Running the Tests

The test suite can be executed using any of the `npm` scripts listed below to run tests in your desired configuration. Simply run one of the following commands in your terminal follwing this standard.

```bash
npm run <command>
```
Example:
```bash
$ BROWSER=chromium npm run test:browser
```
> **Notes:**
> - Before running any npm command, make sure to pass the environment variable first as shown in the example above.
> - Each test execution automatically starts a local web server at http://localhost:8000. However, if you prefer to manually explore the web page, you can use the npm `start-server` script.

### Predefined npm Scripts
| **Command** | **Description** | **Example Usage** 
|----------------------------------------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| `start-server`                               | Starts a local Awesome QA Tool webpage accessible on http://localhost:8000. | `npm run start-server`                                                        |
| `lint`                                       | Runs ESLint on the test files.                                              | `npm run lint`                                                                |
| `test:all`                                   | Runs all Playwright tests on both desktop and mobile browsers.              | `npm run test:all`                                                            |
| `test:desktop`                               | Runs tests on all desktop browsers (Chromium, Firefox, WebKit).             | `npm run test:desktop`                                                        |
| `test:mobile`                                | Runs tests on mobile emulations for Chrome and Safari.                      | `npm run test:mobile`                                                         |
| `BROWSER=<browser> test:browser`             | Runs tests on a specific desktop browser. Replace `<browser>` with `chromium`, `firefox`, or `webkit`. | `BROWSER=chromium npm run test:browser`                                       |
| `BROWSER=<browser> test:mobile:browser`      | Runs tests on a specific mobile browser. Replace `<browser>` with `Chrome` or `Safari`. | `BROWSER=Chrome npm run test:mobile:browser`                                  |
| `test:desktop:headless`                      | Runs tests in headless mode on all desktop browsers (Chromium, Firefox, WebKit). | `npm run test:desktop:headless`                                               |
| `test:mobile:headless`                       | Runs tests in headless mode on mobile emulations for Chrome and Safari.     | `npm run test:mobile:headless`                                                |
| `WORKERS=<number> test:workers`              | Runs tests with a specific number of workers. Replace `<number>` with the desired number of workers. | `WORKERS=4 npm run test:workers`                                              |
| `test:single-worker`                         | Disables parallelism by using a single worker.                              | `npm run test:single-worker`                                                  |
| `test:debug`                                 | Runs tests in debug mode with the Playwright Inspector.                     | `npm run test:debug`                                                          |

#### Running the tests without npm scripts

> To run the test suite with different settings or to specify tests without using npm scripts, please refer to the Playwright's [Running and debugging tests](https://playwright.dev/docs/running-tests) documentation.

## CI with GitHub Actions

The project integrates [GitHub Actions](https://github.com/features/actions) for its CI pipeline. A workflow is already set up in this repository, automating a full test run on an [Ubuntu](https://ubuntu.com/) virtual machine whenever a push or pull request is created for the `main` branch.

The configuration file for this setup is located at: [.github/workflows/ui-test-automation.yml](.github/workflows/ui-test-automation.yml)

## License

This project is licensed under the MIT License.

## Author

[Ricardo Toledo](https://github.com/RicardoToledo)