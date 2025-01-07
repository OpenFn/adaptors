# language-collections <img src='./assets/square.png' width="30" height="30"/>

An **_adaptor_** for using the OpenFn Collections API.

The Collections adaptor is not designed to be used alone, but in conjunction
with other adaptors. As a result, it's a bit different to other adaptors.

The Collections API is a key/value store, which can act as a high performance
cache, buffer or storage solution. All values are strings (but can contain
JSON).

## Usage

All collections functions are exposed through the `collections` namespace:

To iterate over all values with `2024` somewhere in the key

```
collections.each($.collectionName, '*2024*', (state, value, key) => {
  console.log(value)
})
```

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/collections-docs)
for full technical documentation.

## CLI

Collections can be used from the CLI since v1.8.7, but you will need to:

- Set the job to use two adaptors
- Pass a Personal Access Token
- Set the Collections endpoint

You can get a Personal Access Token from any v2 deployment.

### For a single job

You can pass multiple adaptors from the CLI:

```
openfn job.js -a collections -a http -s state.json
```

You'll need to set configuration on the state.json:

```
{
  "configuration": {
    "collections_endpoint": "http://localhost:4000/collections",
    "collections_token": "...paste the token from the app..."
  }
}

```

### For a workflow

If you're using `workflow.json`, set the token and endpoint on
`workflow.credentials`:

```json
{
  "workflow": {
    "steps": [ ... ],
    "credentials": {
      "collections_endpoint": "http://localhost:4000/collections",
      "collections_token": "...paste the token from the app..."
    }
  }
}
```

And make sure that any steps which use collections have multiple adaptors set:

```json
{
  "workflow": {
    "steps": [
      {
        "expression": "...",
        "adaptors": ["@openfn/language-http", "@openfn/language-collections"]
      }
    ]
  }
}
```

Note that steps cannot generally use multiple adaptors. Collections are special
in this regard.

## Deployments

Collections must be configured for your platform instance (v2 only).

Set the `WORKER_COLLECTIONS_URL` env var on the Worker instance to enable
collections for that worker. The URL should point to
`https://<lightning>/collections`

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
