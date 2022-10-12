# Adaptors Monorepo

## Running scripts

Every repo provides a common set of npm scripts:

To run them for all scripts, call `pnpm <script>` from the root abd add `-r`. Ie:

```
pnpm -r build
pnpm -r test
```

## Changesets

Any submitted PRs should have an accompanying [`changeset`](https://github.com/changesets/changesets).

A changeset is a text file with a list of what you've changed and a short summary. Changesets are stored in a temporary folder until a release, at which point they are merged into the changelogs of the affected packges.

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

To publish the release, run:

```
pnpm publish -r
```

## Build tooling

The `build` command accepts a list of build steps as arguments: `ast`, `src`, `docs` and `dts`. Calling build on an adaptor with no arguments will build everything.

Each adaptor's build command should simply call `build-adaptor` with the package name.

You can run `build --help` for more information.

## Migration checklist

If moving an adaptor into this repo, run through the following steps:

- Copy the adaptor (minus `.git`) into `packages/name` (ignoring the `language-` prefix, ie, `language-http` -> `http`)
- Run the migration script from root `pnpm migrate <name>` to update package.json
- Remove the `docs` and `lib` dirs. They should not be tracked in git.
- Ensure `prettierrc` matches the root rc file. You should be able to remove the adaptor's file completely. If the adaptor has any rules the parent does not, and you absolutely want to keep them, then preserve the child file.
- Remove any references to `babel` and `esdoc` (maybe including @babel in dependencies)
- Remove unneeded dev dependencies: `simple-ast jsdoc`
- Remove the `.gitignore` file, update the top level ignore if neccessary
- Update the readme as required
- Update mocha tests
  - Ensure `--experimental-specifier-resolution=node` is passed through to mocha (the migration utility should handle this)
  - Instead of importing test files from `lib`, import directly from `src`
- Finally, run `pnpm changeset` from the repo root to register a changeset (add a minor version bump for the package).

If you have trouble importing commonjs modules (like lodash), you may need to change the import from:

```
import { isEmpty } from 'lodash/fp';
```

to:

```
import _ from 'lodash/fp';
const { isEmpty } = _;
```

TODO: travis?
