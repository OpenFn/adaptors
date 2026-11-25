# language-openg2p-registry <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the
[OpenG2P Registry](https://docs.openg2p.org/products/registry) partner APIs.

Requests with an object body are signed with the partner private key as a
detached JWS (`header..signature`) over the compact, key-sorted JSON of the
body, and sent in `body.signature`. See
[Partner APIs security](https://docs.openg2p.org/platform/architecture/security-architecture/partner-apis).
The partner must be onboarded in Partner Management as `PARTNER_<SENDER_ID>`.

## Documentation

View the
[docs site](https://docs.openfn.org/adaptors/packages/openg2p-registry-docs) for
full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/openg2p-registry-configuration-schema/)
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
