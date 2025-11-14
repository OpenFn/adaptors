# Adaptor APIs

A new openfn package to report API docs for any given adaptor

This parses an adpator's JS docs and returns a JSON representation.

This is designed to replace `@openfn/describe-package` and `@openfn/simple-ast`

## Doc Representation

At the time of writing, docs are represented as a JSDoc parse tree in JSON:

```json
[{
  "id": "fn",
  "longname": "fn",
  "name": "fn()",
  "kind": "external",
  "scope": "global",
  "description": "Creates a custom step (or operation) for more flexible job writing.",
  "params": [
    {
      "type": { "names": ["function"] },
      "description": "is the function",
      "name": "func"
    }
  ],
  "examples": [
    "fn(state => {\n  // do some things to state\n  return state;\n});"
  ],
  "returns": [{ "type": { "names": ["Operation"] } }],
  "access": "public",
  "meta": {
    "lineno": 76,
    "filename": "Adaptor.js",
    "path": "/home/joe/repo/openfn/adaptors/tools/adaptor-apis/.adaptors/common@3.2.0/src"
  },
  "order": 3,
  "source": "@openfn/language-common",
  "common": true
}],
```

A couple of things to note:

- The `scope` field denotes the namespace. Top-level operations (like `fn()`)
  have a scope of `global`, whereas namespace things (like `http.get`) have a
  scope with the namespaced name (eg, `http`)
- Docs exported from common are included. These entries have a `source` of
  `@openfn/language-common`, and rather redundantly a `common:true` flag.

## How it Works

The best source of truth for adaptor docs is the JSDoc annotations inside the
adaptor. So this package leverages the existing doc build pipeline of the
adaptors repo and exposes it to be used directly.

The module does a couple of things:

- Downloads adaptor source from github (just the stuff it needs)
- Downloads the common adaptor source if neccessary
- Runs the jsdoc parser (exactly the same as the doc site uses) to generate a
  JSON representation of the API
- This includes functions exported from common
- Optionally writes compiled docs to disk

## CLI Usage

You can generate docs for any single adaptor from this repo:

```
pnpm gen <adaptor>@<version>
```

Eg:

```
pnpm gen kobotoolbox@4.2.7
```

This will generate docs for your adaptor and log the final location of the JSON

## NPM Usage

You can also use the module programmatically in node.js or bun or whatever you
like:

```
import { installAndGen } from '@openfn/adaptor-apis';

const specifier = "kobotoolbox@4.2.7" // Version MUST be specified!
const outputDir = ".adaptors" // optional!

const {
  content, // the docs JSON
  path,    // the dir that docs are written to
} = await installAndGen(specifier, outputDir)
```

## Issues and Future Work

- There's no caching right now: the service will re-download all the files each
  time its called
- I intend to add a `signature` field to the output
- Need to provide TypeScript interfaces
- I may restructure the output, removing irrelevant stuff and cleaning
- Better error hanlding for tags that don't exist in particular
