# OpenFn Adaptors ![Build & Test](https://github.com/openfn/adaptors/actions/workflows/ci.yaml/badge.svg?branch=main) ![Build & Test](https://github.com/openfn/adaptors/actions/workflows/docs.yaml/badge.svg?branch=main)
 
The new home for all @openfn [language adaptors](https://docs.openfn.org/adaptors) - open-source Javascript or Typescript modules that provide helper functions to communicate with a specific external system.

For a fully open source workflow automation platform that leverages these adaptors, see [OpenFn Lighnting](https://github.com/OpenFn/lightning).

## Getting Started

_Note: This repo requires [pnpm](https://pnpm.io/installation) and [asdf](https://github.com/asdf-vm/asdf) to be installed globally
on your machine._

A few first time repo steps:

```
asdf install #Install tool versions
npm install -g pnpm #Install pnpm
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
Read through the existing [issues](https://github.com/OpenFn/adaptors/issues) and assign yourself to the issue you have chosen. If you need clarification, don't hesitate leave a comment on the issue and we will get back to you as soon as possible. 

If there isn't already an issue for the feature you would like to contribute, please make one and assign yourself.


### Open a pull request

1. Clone the adaptors repository, then [fork it](https://docs.github.com/en/get-started/quickstart/fork-a-repo). 

2. Make your changes by following the [working with adaptors](#working-with-adaptors) section. 

3. Open a draft PR, fill out the pull request template (this will be added automatically for you) then make sure to self-review your code and go through the 'Review checklist'. Leave any notes for the reviewer in the 'Details' section.

4. Mark the PR as ready for review, and assign @stu or @taylor.

### Working with adaptors

Copy template folder 
Rename it 
Add authentication 
Helper functions 

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
- Remove the `.gitignore` file (update the top level ignore if neccessary)
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
