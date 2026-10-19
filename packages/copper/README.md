# language-copper <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the
copper API.

## Documentation

View the
[docs site](https://docs.openfn.org/adaptors/packages/copper-docs) for
full technical documentation.

### Configuration

Copper API key auth requires the access token plus the email of the user who
generated it. See the
[Copper authentication docs](https://developer.copper.com/introduction/authentication.html)
for details.

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/copper-configuration-schema/)
for required and optional `configuration` properties.

The configuration schema uses
[JSON Schema draft-07](https://json-schema.org/draft-07/json-schema-release-notes).
Run `pnpm validate:schemas` from the adaptors repo root after editing it.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
