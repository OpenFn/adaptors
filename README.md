# Adaptors Monorepo

## Running scripts

Every repo provides a common set of npm scripts:

To run them for all scripts, call `pnpm <script>` from the root abd add `-r`. Ie:

```
pnpm -r build
pnpm -r test
```

## Build tooling

The `build` command accepts a list of build steps as arguments: `ast`, `src`, `docs` and `dts`. Calling build on an adaptor with no arguments will build everything.

Each adaptor's build command should simply call `build-adaptor` with the package name.

You can run `build --help` for more information.

## Migration checklist

If moving an adaptor into this repo, run through the following steps:

- Copy the adaptor into `packages/name` (ignoring the `language-` prefix, ie, `language-http` -> `http`)
- Run the migration script from root `pnpm migrate <name>` to update package.json
- Remove the `docs` and `lib` dirs (ensure docs is not tracked in git)
- Ensure `prettierrc` matches the root rc file. You should be able to remove the adaptor's file completely. If the adaptor has any rules the parent does not, and you absolutely want to keep them, then preserve the child file.
- Remove any references to `babel` and `esdoc` (maybe including @babel in dependencies)
- Remove unneeded dev dependencies: `simple-ast jsdoc`
- Remove the `.gitignore` file, update the top level ignore if neccessary
- Update the readme
- Update mocha tests

  - Ensure `--experimental-specifier-resolution=node` is passed through to mocha (the migration utility should handle this)
  - Instead of importing test files from `lib`, import directly from `src`

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

## Future Work

- Support TypeScript adaptors
- Unify documentation
- Migrate tests to ava (?)
