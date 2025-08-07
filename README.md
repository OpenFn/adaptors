# OpenFn Adaptors ![Build & Test](https://github.com/openfn/adaptors/actions/workflows/ci.yaml/badge.svg?branch=main) ![Build & Test](https://github.com/openfn/adaptors/actions/workflows/docs.yaml/badge.svg?branch=main)

Open-source JavaScript/TypeScript modules that provide helper functions to
communicate with external systems. These adaptors are used by
[OpenFn Lightning](https://github.com/OpenFn/lightning) and the
[OpenFn CLI](https://github.com/openfn/cli) for workflow automation.

# Table of Contents

- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [Using Adaptors](#using-adaptors)
  - [With OpenFn CLI](#with-openfn-cli)
  - [With OpenFn Lightning](#with-openfn-lightning)
- [Contributing](#contributing)
- [Development](#development)
  - [Build your adaptor](#build-your-adaptor)
    - [Prerequisites](#prerequisites-1)
    - [Development Steps](#development-steps)
    - [Testing Documentation Changes](#testing-documentation-changes)
    - [Best Practices](#best-practices)
- [Changesets](#changesets)
- [Versioning](#versioning)
- [Releases](#releases)
- [Pre-releases](#pre-releases)
- [Metadata](#metadata)
- [Useful Resources](#useful-resources)

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

#### Prerequisites

- Install the CLI globally:

  ```bash
  npm install -g @openfn/cli
  ```

- Set Repo Directory: Set the environment variable `OPENFN_ADAPTORS_REPO` to the
  path of the adaptors repo. For example:

```bash
export OPENFN_ADAPTORS_REPO=~/repo/openfn/adaptors
```

#### Steps

1. Create a job file (e.g., `job.js`):

   ```javascript
   // Example: Send data to Salesforce
   create('Account', {
     Name: $.data.company_name,
     Industry: $.data.industry,
   });
   ```

2. Create your initial state file in a git ignored folder called `tmp` . This
   will be used to store the output of your job. The file should be called
   `state.json` and should look like this:

   ```json
   {
     "configuration": { //Your salesforce credentials},
     "data": {
       "company_name": "Example Inc.",
       "industry": "Software"
     }
   }
   ```

3. Run the job:

   Using `-m` and `-a` flags:

   ```bash
   openfn job.js -ma salesforce -s tmp/state.json -o tmp/output.json
   ```

   - `-o` will add the output to the output file.
   - `-m` will run the job from the `adaptors monorepo`
   - `-a` this will specify the adaptor to run your job with

   You can also run the job using only the `-a` flag:

   ```bash
   openfn -a salesforce job.js -s tmp/state.json -o tmp/output.json
   ```

   This will auto install the `salesforce` adaptor and run the job.

   > Run: `openfn help` to see all available options.

### With OpenFn Lightning

Lightning is our open-source workflow automation platform that uses these
adaptors. See the
[Lightning documentation](https://github.com/OpenFn/lightning/blob/main/RUNNINGLOCAL.md#using-local-adaptors)
for setup and usage instructions.

## Contributing

1. **I want to contribute**: Choose your path:

   - To fix an existing issue: Browse
     [open issues](https://github.com/OpenFn/adaptors/issues)
   - To build a new adaptor: See [Build your adaptor](#build-your-adaptor)
   - To fix something specific:
     [Create an issue to track your changes](https://github.com/OpenFn/adaptors/issues/new)

2. **Submit PR**: Create a draft PR, fill out the template, self-review, then
   mark as ready for review and assign @mtuchi or @josephjclark.

## Build your adaptor

We have a comprehensive
[developer guide](https://github.com/OpenFn/adaptors/wiki/Build-a-new-Adaptor)
to help you build your own adaptor.

#### Quick Start

1. Generate and run the new adaptor:

   ```bash
   pnpm generate <adaptor-name>
   cd packages/<adaptor-name>
   pnpm install
   pnpm build --watch
   ```

2. Add your logo images to `packages/<adaptor-name>/assets/`:

   - `rectangle.png` (512x190px)
   - `square.png` (256x256px)

3. [Implement your adaptor](https://github.com/OpenFn/adaptors/wiki/Adaptor-Writing-Best-Practice-&-Common-Patterns)
   in `packages/<adaptor-name>/src/Adaptor.js`

4. Test your adaptor:
   [See unit test guideline](https://github.com/OpenFn/adaptors/wiki/Unit-Testing-Guide)

   ```bash
   pnpm test
   ```

5. Create a test job in `tmp/job.js` and initial state in `tmp/state.json` then
   run:

   ```bash
   openfn tmp/job.js -ma <adaptor-name> -s tmp/state.json -o tmp/output.json
   ```

#### Best Practices

- Update the adaptor's README
- Include comprehensive [JSDoc](https://jsdoc.app/) comments for all functions
- [Write unit tests for your adaptor functions](https://github.com/OpenFn/adaptors/wiki/Unit-Testing-Guide)
- [Follow the existing code style and patterns](https://github.com/OpenFn/adaptors/wiki/Adaptor-Writing-Best-Practice-&-Common-Patterns)

#### Testing Documentation Changes

The JSDoc comments in your adaptor code will be automatically converted to HTML
and uploaded to [docs.openfn.org](https://docs.openfn.org). To test your
documentation changes locally, you'll need to clone the
[OpenFn/docs](https://github.com/OpenFn/docs) repository and run the docs site
locally.

For detailed instructions on testing documentation changes locally, please refer
to our
[Testing Documentation Guide](https://github.com/OpenFn/adaptors/wiki/How-to-test-docs-changes)
in the wiki.

## Changesets

Any submitted PRs should have an accompanying
[changeset](https://github.com/changesets/changesets).

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
`sha` is the short GitHub SHA for the commit.

Note that the Worker and CLI will both always download the latest versions of
the adaptor with the `@next` tag - it's a rolling tag and should always be up to
date.

## Metadata

Check the Wiki for the metadata creation guide:
[https://github.com/OpenFn/adaptors/wiki/Magic-Metadata](https://github.com/OpenFn/adaptors/wiki/Magic-Metadata)

## Useful Resources

- **Wiki**: [OpenFn Adaptors Wiki](https://github.com/OpenFn/adaptors/wiki) -
  Detailed guides and best practices
- **Documentation**: [docs.openfn.org](https://docs.openfn.org) - Official
  documentation
- **Lightning**: [OpenFn Lightning](https://github.com/OpenFn/lightning) -
  Workflow automation platform
- **CLI**: [OpenFn CLI](https://github.com/openfn/kit) - For running and
  deploying OpenFn jobs.
