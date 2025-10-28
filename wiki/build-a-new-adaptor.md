This guide is your first stop to generating a brand new OpenFn adaptor.

An adaptor is an open-source JavaScript module that provides OpenFn users with a
clean set of helper functions that help communicate with a specific external
system. See [our docs site](https://docs.openfn.org/adaptors) for more on
adaptors and how they interface with the OpenFn platform.

This repo contains a command called `generate` which will automatically create
all the code required for a basic adaptor which calls out to a REST API. You'll
need to implement the logic you need from there.

# Requirements

- Set up your environment first - see the [README](../README.md).
- Fork or branch this repo locally
- Ensure the `OPENFN_REPO_DIR` env var is set to to the root of this repo, ie,
  `export OPENFN_REPO_DIR=~/repo/openfn/cli-repo`
- Ensure you have the logo images of the adaptor you need to create: a rectangle
  512x190px and a square-256x256px

# Steps

Generating a new adaptor. Run this from the repo root:

```
pnpm generate <adaptor-name>
```

- Add the logo images in the assets folder inside the generated adaptor folder.
  Ps: Ensure both images are named rectangle.png and square.png respectively and
  adhere to the size specifications mentioned in the requirements section.
- Ensure the images have a transparent background. Navigate to
  configuration-schema.json, and change any configs that do not align with the
  adaptor
- Go to `/src/Adaptor.js` and create the adaptor’s Operations - the functions
  used in job code. You may want to set up `POST, GET,` to fit the current
  adaptor’s requirements
- Go to `src/Utils.js` and change the code in the file to match your desired
  implementation. Any internal functions used by your adaptor, but not by job
  code, should go here in Utils.js
- Update the readme with correct examples that match your new implementation
- Write and update the tests within the `/tests` folder
- Edit the CHANGELOG.md file with comments about the initial release.
- You should set your credentials in the “configuration” property inside
  `state.json`
- Write some unit tests to ensure your code works

# Steps to run

To run a test job and exercise your adaptor:

- Create a new /tmp folder and create two new files: state.json and
  expression.js.
- - Note that the /tmp folder is already gitignored and will not be sent to
    gitHub when you push your code.
- Write a test job inside `expression.js`
- Navigate to the adaptor folder:

```
cd packages/<adaptor name>
```

- Install adaptor dependencies

```
pnpm install
```

- Build the adaptor

```
pnpm build --watch
```

- Run the test job through the CLI

```
openfn tmp/expression.js -ma <adaptor name> -o tmp/output.json -s tmp/state.json
```

The different output from you running the jobs will be temporarily stored in
`output.json`

## Next Steps

Check out the
[Best Practice](https://github.com/OpenFn/adaptors/wiki/Adaptor-Writing-Best-Practice-&-Common-Patterns)
page for more guidelines about how to go about creating the ultimate adaptor
