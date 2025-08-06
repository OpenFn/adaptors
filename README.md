# OpenFn Adaptors ![Build & Test](https://github.com/openfn/adaptors/actions/workflows/ci.yaml/badge.svg?branch=main) ![Build & Test](https://github.com/openfn/adaptors/actions/workflows/docs.yaml/badge.svg?branch=main)

Open-source JavaScript/TypeScript modules that provide helper functions to
communicate with external systems. These adaptors are used by
[OpenFn Lightning](https://github.com/OpenFn/lightning) and the
[OpenFn CLI](https://github.com/openfn/cli) for workflow automation.

## Quick Start

### Prerequisites

- [asdf](https://github.com/asdf-vm/asdf) installed globally
- `Node.js` and `pnpm` managed via asdf

### Setup

```bash
# Install asdf plugins
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf plugin-add pnpm

# Install dependencies and build
asdf install
pnpm install
pnpm build
pnpm run setup
```

## Using Adaptors

### With OpenFn CLI

1. Install the CLI globally:

   ```bash
   npm install -g @openfn/cli
   ```

2. Create a job file (e.g., `job.js`):

   ```javascript
   // Example: Send data to Salesforce
   create('Account', {
     Name: $.data.company_name,
     Industry: $.data.industry,
   });
   ```

3. Run the job:
   ```bash
   openfn job.js -a salesforce -s tmp/state.json -o tmp/output.json
   ```

### With OpenFn Lightning

Lightning is our open-source workflow automation platform that uses these
adaptors. See the
[Lightning documentation](https://github.com/OpenFn/lightning?tab=readme-ov-file#getting-started)
for setup and usage instructions.

## Development

### Running Scripts

Run commands across all packages:

```bash
pnpm --filter "./packages/**" build
pnpm --filter "./packages/**" test
```

### Creating a New Adaptor

#### Prerequisites

1. Set up the Repository Directory

   The CLI needs a designated folder to save and load adaptors. Configure this
   by setting the `OPENFN_REPO_DIR` environment variable.

   Add to your shell configuration file (e.g., `~/.bashrc`, `~/.zshrc`):

   ```bash
   # Directory for CLI adaptor storage
   export OPENFN_REPO_DIR=~/repo/openfn/cli-repo

   # Optional: For development with adaptors monorepo
   export OPENFN_ADAPTORS_REPO=~/repo/openfn/adaptors

   ```

#### Development Steps

1. Generate the adaptor structure:

   ```bash
   pnpm generate <adaptor-name>
   ```

2. Add your logo images to `packages/<adaptor-name>/assets/`:

   - `rectangle.png` (512x190px)
   - `square.png` (256x256px)

3. Implement your adaptor in `packages/<adaptor-name>/src/Adaptor.js`

4. Test your adaptor:

   ```bash
   cd packages/<adaptor-name>
   pnpm install
   pnpm build --watch
   ```

5. Create a test job in `tmp/expression.js` and run:

   ```bash
   openfn tmp/expression.js -ma <adaptor-name> -o tmp/output.json -s tmp/state.json
   ```

   > `openfn help` will show you the full list of options.

## Contributing

1. **Find an issue**: Browse
   [open issues](https://github.com/OpenFn/adaptors/issues) and assign yourself
   to one, or create a new issue for your feature.

2. **Fork and clone**: Fork the repository and clone your fork locally.

3. **Make changes**: Follow the
   [development workflow above](#development-steps).

4. **Submit PR**: Create a draft PR, fill out the template, self-review, then
   mark as ready for review and assign @mtuchi or @josephjclark.

### Best Practices

- Update the adaptor's README
- Include comprehensive [JSDoc](https://jsdoc.app/) comments for all functions
- [Write unit tests for your adaptor functions](https://github.com/OpenFn/adaptors/wiki/Unit-Testing-Guide)
- [Follow the existing code style and patterns](https://github.com/OpenFn/adaptors/wiki/Adaptor-Writing-Best-Practice-&-Common-Patterns)

## Documentation & Resources

- **Wiki**: [OpenFn Adaptors Wiki](https://github.com/OpenFn/adaptors/wiki) -
  Detailed guides and best practices
- **Documentation**: [docs.openfn.org](https://docs.openfn.org) - Official
  documentation
- **Lightning**: [OpenFn Lightning](https://github.com/OpenFn/lightning) -
  Workflow automation platform
- **CLI**: [OpenFn CLI](https://github.com/openfn/kit) - Command-line interface

## Changesets

- Create a new changeset with `pnpm changeset`. This will prompt you for the
  changes:

```bash
pnpm changeset
```

> Follow the prompts to describe your changes. This will create a new changeset
> file in the `.changesets` folder.

- Commit the changeset to the repo when you're ready.

## Versioning

> If you're PR is approved, you can bump the version and add release dates.

- Run `pnpm run version` to bump the version and add release dates.
- Commit your changes. And push to your PR branch.

## Releases

Releases are automated via GitHub Actions when merging to `main`.

Github Actions will:

- Build and test (just in case)
- Publish any new version numbers to npm
- Generate and push tags for all new versions
- Send a notification to slack
- Update `docs/docs.json` with new markdown and update docs.openfn.org

## Pre-releases

**NOTE: pre-release automation is currently DISABLED until support is activated
in Lightning**

Pre-release builds for adaptors are available with the `@next` tag. These can be
used in the CLI and Lightning and are generally available on `npm` (but because
they're not flagged as `latest`, they won't be downloaded by default).

Old pre-release versions will be deprecated when a new tag is published.

Pre-releases are available for any non-draft PR with at least one changeset.

The pre-release build will be updated when:

- A PR is opened in a non-draft state
- A new commit is pushed
- A changeset is added

Pre-releases will be given the correct next version number (the number that
`pnpm changeset version` will generated), plus the suffix `-next-<sha>`, where
sha is teh short github SHA for the commit.

Note that the Worker and CLI will both always download the latest versions of
the adaptor with the `@next` tag - it's a rolling tag and should always be up to
date.

## Docs

Docs are generated from the JSDoc annotations in adaptors. They are output as
markdown files in the `./docs` directly and not checked in to source control.

The markdown output can be customized by overriding the built-in handlebars
templates in jsoc2md.

- Find the template you want to customise in [j2sdoc2md source()
  https://github.com/jsdoc2md/dmd/tree/master/partials) (this can be tricky)
- Copy the template contents
- Paste into a file with the same name (this is important) in
  `tools/build/src/partials`
- Edit `tools/build/src/commands/docs.ts` and add the path to your new template
  to jsdoc2md's `renderOpts` (see how the other .hbs files are loaded in)
- Make your changes
- Run `pnpm build docs` from root (or just one adaptor folder) and inspect the
  generated `docs/index/md` file.

Once built, the docs need to be compiled into a JSON file to be published to the
docs site. This is run automatically through github actions.

For local dev against the docsite, you can run `pnpm docs:build` to rebuild your
local `docs.json` file. Use `pnpm docs:watch` to watch for md changes in
packages/\* and rebuild automatically.

## Metadata

Check the Wiki for the metadata creation guide:
[https://github.com/OpenFn/adaptors/wiki/Magic-Metadata](https://github.com/OpenFn/adaptors/wiki/Magic-Metadata)

There are two CLI utils you can run to generate metadata and populate mock data.

Use `generate` to create a metadata.json based on the provided config. This will
be saved to `packages/<adaptorName>/src/meta/metadata.json`.

Use `populate-mock` to execute the `populate-mock-data.js` file and save the
results into the meta/data dir. Unit tests will use this mock data.

```
pnpm metadata generate <adaptorName> <path/to/config> pnpm metadata
populate-mock <adaptorName> <path/to/config>
```

Config paths can point to JSON or JS files with a default export. They are
always specified relative to the adaptor directory.

You can run these from the repo root or from the adaptor folder.
