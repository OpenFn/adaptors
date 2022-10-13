# Adaptors Monorepo

New home for all @openfn language adaptors.

This repeo requires [pnpm](https://pnpm.io/installation) to be installed
globally on your machine.

## Getting Started

A few first time repo steps:

Install tool versions with [asdf](https://github.com/asdf-vm/asdf)

```
asdf install
```

First time repo setup

```
pnpm run setup
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

Then run `pnpm install` and commit any changes.

To build the adaptors

```
pnpm -r run build
```

To publish the release, run:

```
pnpm publish -r
```

## Build tooling

The `build` command accepts a list of build steps as arguments: `ast`, `src`,
`docs` and `dts`. Calling build on an adaptor with no arguments will build
everything.

Each adaptor's build command should simply call `build-adaptor` with the package
name.

You can run `build --help` for more information.

## Migration Guide

Adaptors should be copied/cloned into this repo, with all build, lint and git
artefacts removed and the package.json updated.

This checklist walks you through the process:

First, copy the adaptor into `packages/name` (ignoring the `language-` prefix,
ie, `language-http` -> `http`). You can `cd` into `package` and `git clone`
straight from github if you like.

Then, from inside your new `packages/<name>`:

- Remove the `.git` directory
- Run the migration script from root `pnpm migrate <name>` to update
  package.json
- cd back into `packages/<name>`
- Delete `package-lock.json`
- Run `pnpm install`
- Remove the `docs` and `lib` dirs
- Remove `.prettierrc` - although you may want to check the rules against the
  root `.prettierrc` file.
- - If the files are very different, keep the child file
- - We can add rules to the root `.prettierrc`, but we should do so cautiously.
- Remove any references to `babel` (ie, `.babelrc`) and `esdoc` (ie,
  `esdoc.json`)
- Remove the `.gitignore` file, update the top level ignore if neccessary
- Remove the `Makefile`
- Update the readme as required
- - `npm` references should change to `pnpm`
- - docs are now generated with `pnpm build docs`
- - replace `make` with `pnpm build`
- - replace `clean` with `rimraf dist types docs`
- run `pnpm build`
- Update tests and get them passing

  - Instead of importing test files from `lib`, import directly from `src`
  - Fix commonjs issues (see the note below)

- Finally, run `pnpm changeset` from the repo root to register a changeset (add
  a minor version bump for the package).

## Common JS issues

Packages in this repo should assume native support for esm modules (ie, `import`
instead of `require`).

If you have trouble importing commonjs modules (like lodash), you may need to
change the import from:

```
import { isEmpty } from 'lodash/fp';
```

to:

```
import _ from 'lodash/fp';
const { isEmpty } = _;
```
