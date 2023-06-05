# OpenFn Adaptors ![Build & Test](https://github.com/openfn/adaptors/actions/workflows/ci.yaml/badge.svg?branch=main) ![Build & Test](https://github.com/openfn/adaptors/actions/workflows/docs.yaml/badge.svg?branch=main)

The new home for all @openfn
[language adaptors](https://docs.openfn.org/adaptors) - open-source Javascript
or Typescript modules that provide helper functions to communicate with a
specific external system.

For a fully open source workflow automation platform that leverages these
adaptors, see [OpenFn Lighnting](https://github.com/OpenFn/lightning).

## Getting Started

_Note: This repo requires [pnpm](https://pnpm.io/installation) and
[asdf](https://github.com/asdf-vm/asdf) to be installed globally on your
machine._

A few first time repo steps:

```
asdf install #Install tool versions
pnpm install
pnpm build
pnpm run setup #Run the setup command
```

## Running scripts

Every repo provides a common set of npm scripts:

To run them for all scripts in `packages`, call
`pnpm --filter "./packages/** <script>`.

For example:

```
pnpm --filter "./packages/**" build
pnpm --filter "./packages/**" test
```

## Contributing

### Assign yourself to an issue

Read through the existing [issues](https://github.com/OpenFn/adaptors/issues)
and assign yourself to the issue you have chosen. If anything needs
clarification, don't hesitate to leave a comment on the issue and we will get
back to you as soon as possible.

If there isn't already an issue for the feature you would like to contribute,
please make one and assign yourself.

### Open a pull request

1. Clone the adaptors repository, then
   [fork it](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

2. Make your changes by following the
   [working with adaptors](#working-with-adaptors) section.

3. Open a draft PR, fill out the pull request template (this will be added
   automatically for you) then make sure to self-review your code and go through
   the 'Review checklist'. Leave any notes for the reviewer in the 'Details'
   section.

4. Mark the pull request as ready for review, and assign @stuartc or
   @taylordowns2000.

### Working with adaptors

#### 1. Setup

- Create a copy of the adaptor [template](packages/template), and rename it.
  `cp -R packages/template packages/adaptorname`

- Open package.json, and update the `name`, `description` and `build` from
  `template` to your `newadaptorname`. Update the version.

- Update the changelog heading `# @openfn/language-template` to your adaptor
  name and delete the example content. Delete ast.json, then run `pnpm clean`
  (this will get rid of the dist, types and docs folders).

- Update your adaptor's README.md to use your new adaptor name (we'll come back
  to this later to update the sample operation)

#### 2. Create a job with the operation you'd like to add, and run it so it fails

- Create a _temporary_ folder where you can test your operation manually by
  running a job: `mkdir tmp`
- Create a job file `touch tmp/job.js` and add an operation which calls your
  adaptor: **\_\_**
- Run your job with `openfn tmp/job.js -O -ma adaptorname`

  `-O` will output to console (kinda useful in dev)

  `-m` will run from the monorepo (this is important!! And the monorepo  
   path must be set OPENFN_ADAPTORS_REPO=...)

  `-a` adaptorname will use your new adaptor to run the job with

- The job should fail - we haven't build the adaptor yet! Let's go do that

#### 3. Create your adaptor function

- Head to `lib/Adaptor.js`, and define your first function.

An adaptor function must be invoked with several of arguments, and return a
function which accepts and returns state.

It's going to look something like this:

```js
export function yourFunctionName(arguments) {
  return state => {
    // logic
    return state;
  };
}
```

The logic is where you will prepare the API request. Build the URL, passing in
any arguments if needed. Then return the fetch request, making sure you set the
Authorization and get any secrets from `state.comnfiguration`.

```js
export function getTodaysWeather(latitude = 25.52, longitude = 13.41) {
  return state => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;

    return (
      fetch(url, {
        headers: {
          Authorization: `${state.configuration.username}:${state.configuration.password}`,
        },
      })
        .then(response => response.json())
        .then(data => ({ ...state, data }));
    );
  };
}
```

- Define the configuration schema in `configuration-schema.json`

2. Familiarize yourself with the API documentation for the third party system.
   Determine if you'll need any packages from NPMjs (e.g.,
   [`jsforce`](https://www.npmjs.com/package/jsforce) for Salesforce,
   [`pg`](https://www.npmjs.com/package/pg) for direct interaction with a
   Postgres database.)

1. Open the configuration file of the newly copied template,
   `configuration-schema.json`, to define the schema.
1. Specify the required parameters and their data types (these will be any
   values in state.configuration you are using in your adaptor function).
   Include descriptions that explain the purpose and usage of each parameter.
1. If certain parameters are optional, clearly indicate their optional status
   and provide default values or instructions for their usage.
1. Validate the configuration against the schema to ensure that the provided
   values match the expected structure and data types. This validation can be
   done tools like [JSON Schema Validator](https://www.jsonschemavalidator.net/)

1. Set your new package `name`, `version`, `description`, and `build`
   definitions in your new `package.json`.

#### 4. Test it manually

- Make sure to run build again
- Run your job `openfn tmp/job.js -O -ma adaptorname`
- Make sure it returns what you expect

#### 5. Write your unit tests

Import your newly defined function Define state and call your function with it
Check you get data returned using chai assertion Make sure to test with
different arguments and values Run `pnpm test`

#### 6. Add docs and write the tests

- Include [JSDoc](https://jsdoc.app/) comments to provide a clear and
  comprehensive explanation of the adaptor function's purpose, parameters,
  return values, and usage examples
- Update the adaptor's `README.md` to include a sample operation

## Changesets

Any submitted PRs should have an accompanying
[`changeset`](https://github.com/changesets/changesets).

A changeset is a text file with a list of what you've changed and a short
summary. Changesets are stored in a temporary folder until a release, at which
point they are merged into the changelogs of the affected packges.

Adding a changeset is really easy thanks to a very friendly CLI.

To create a changeset, run this from the repo root:

```
pnpm changeset
```

Look in the `.changesets` folder to see your change.

Commit the changeset to the repo when you're ready.

## Releases

To release, run this from the root:

```
pnpm changeset version
```

This will bump all changed packages and update their release notes.

Then install packages and commit changes with:

```
pnpm install
```

Build the adaptors with:

```
pnpm -r run build
```

To publish the release, run:

```
pnpm changeset publish
```

And finally, push the tags to Github so that the source code can be browsed for
each new release with:

```
git push --follow-tags
```

## Build tooling

The `build` command accepts a list of build steps as arguments: `ast`, `src`,
`docs` and `dts`. Calling build on an adaptor with no arguments will build
everything.

Each adaptor's build command should simply call `build-adaptor` with the package
name.

You can run `build --help` for more information.

## Metadata

Check the Wiki for the metadata creation guide:
[https://github.com/OpenFn/adaptors/wiki/Magic-Metadata](https://github.com/OpenFn/adaptors/wiki/Magic-Metadata)

There are two CLI utils you can run to generate metadata and populate mock data.

Use `generate` to create a metadata.json based on the provided config. This will
be saved to `packages/<adaptorName>/src/meta/metadata.json`.

Use `populate-mock` to execute the `populate-mock-data.js` file and save the
results into the meta/data dir. Unit tests will use this mock data.

```
pnpm metadata generate <adaptorName> <path/to/config>
pnpm metadata populate-mock <adaptorName> <path/to/config>
```

Config paths can point to JSON or JS files with a default export. They are
always specified relative to the adaptor directory.

You can run these from the repo root or from the adaptor folder.

## Migration Guide

Adaptors should be copied/cloned into this repo, with all build, lint and git
artefacts removed and the package.json updated.

This checklist walks you through the process.

**IMPORTANT**: before starting the migration process, please make sure all open
pull-requests are merged or closed (maybe discuss with authors / responsibles)

First, create a new branch for your work:

```
git checkout -b migrate_<name>
```

Then, copy the adaptor into `packages/<name>` (ignoring the `language-` prefix,
ie, `language-http` -> `http`). You can `cd` into `package` and `git clone`
straight from github if you like.

Next, from the `adaptors` root folder, run the migration script:

```
pnpm migrate <name>
```

For example, `pnpm migrate http`.

Then, from inside your new `packages/<name>`:

- Remove the `.git` directory
- Commit your changes `git commit -am "cloned <name> into monorepo"`
- Delete `package-lock.json`
- Remove `bundledDependencies` from package.json
- Make sure `"rimraf": "^3.0.2"` is in `devDependencies`
- Fix index.js (see `index.js` below)
- Run `pnpm install`
- Run `pnpm build`
- Remove the `docs` and `lib` dirs
- Remove `.prettierrc`
- Remove any references to `babel` (ie, `.babelrc`) and `esdoc` (ie,
  `esdoc.json`)
- Remove the `.gitignore` file (update the top level ignore if necessary)
- Remove the `Makefile`
- Remove the `.devcontainer`
- Remove the `.tool-versions`
- Rename `crendential-schema.json` file to `configuration-schema.json`
- Remove the all files related to Travis CI (`travis.yml`, `.travis.yml`, ...)
- Update the readme (see the `Readme` below)
- Fix unit tests (see `Tests` below)
- run `git add packages/<name>` from the root folder to allow pnpm to detect
  `<name>` as changed package
- run `pnpm changeset` from the repo root to register a changeset (add a minor
  version bump for the package).
- Commit your changes, including the changeset, and open a pull request against
  `main`.

**IMPORTANT**:

- Make sure all open issues are transfered to the
  `https://github.com/openfn/adaptors` repositiory and labelled as the name of
  the source adaptor name. For example issues coming from `language-postgres`
  should have the label `postgres`.
- Update the adaptor repository readme to add archive note
- Archive the adaptor if you can
- Update the adaptor readme to indicate where the package has been moved to
  adaptors repo. See example below

```
# _⚠️ MOVED TO [OpenFn/adaptors](https://github.com/OpenFn/adaptors)! ⚠️_

**N.B.: New versions are available at:
https://github.com/OpenFn/adaptors/tree/main/packages/<name>**

# Language <name> (Archived)
```

### index.js

The index.js file should be exactly this:

```
import * as Adaptor from './Adaptor';
export default Adaptor;

export * from './Adaptor';
```

The first two lines export the Adaptor object as the default export from the
module, so you can do `import common from '@openfn/common'`

The second line exports every export of Adaptor from the main index, so you can
do `import { fn } from '@openfn/common'`.

### Readme

The readme probably has a section called "Development".

Replace this section with:

```
## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the `Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
```

In addition, you may need to replace any references to `npm` with `pnpm`

### Tests

You'll need to update tests and get them passing.

Instead of importing test files from `lib`, import directly from `src`.

Ie, replace `import Adaptor from '../lib/Adaptor'` becomes
`import Adaptor from '../src/Adaptor'`
