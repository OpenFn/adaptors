If you make a change to the jsdoc of an adaptor, you may want to test the changes on the docsite.

This wiki page will show you how to do it.

## tl;dr

The commands you need

Adaptors:
```
pnpm -C packages/<adaptor> pnpm build docs --watch
pnpm docs:watch
```
Docs:
```
yarn start:dev
yarn generate-adaptors -w
```

## Setup docs

First, clone and setup the docs repo: https://github.com/openfn/docs

Run the repo with `yarn start` just to make sure it's all working

## Setup env

Ensure that OPENFN_ADAPTORS_REPO env var is set and points to your monorepo.

You may want to update your `.bashrc` or `.profile` or whatever

```
export OPENFN_ADAPTORS_REPO=~/repo/openfn/adaptors
```

## Build jsdocs

Next you need to build the jsdocs in the adaptors repo

To build all docs (probably a good idea)
```
pnpm build
```

If you JUST want to build the docs for one adaptor, you can `cd` into your adaptor folder and do
```
pnpm build docs
```

## Build docs.json

The `docs` server uses the built `tmp/docs.json` file.

To build this file, run this from root:

```
pnpm docs:build
```

## Start the docs server

If you haven't already, start the docs server in the docs repo:

```
yarn start:dev
```
Starting in dev mode will build from the monorepo right away. 

While the server is running, you can run `yarn generate-adaptors -m` to build on the fly, or pass `-w` to watch for changes.

## Watching

In the docs server, watch for changes to docs.json:
```
yarn generate-adaptors -w
```
Here in adaptors, you can watch a specific adaptor's docs from its subfolder:
```
pnpm build docs --watch
```

And you can watch for all docs changes to recompile docs.json with
```
pnpm docs:watch
```
