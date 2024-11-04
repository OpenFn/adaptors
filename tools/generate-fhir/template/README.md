# language-{{NAME}} <img src='./assets/square.png' width="30" height="30"/>

An OpenFn adaptor for building integration jobs for use with the {{NAME}} API.

This adaptor has been auto-generated from a FHIR spec. Do not modify generated
code or changes will be lost.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/{{NAME}}-docs)
for full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/{{NAME}}-configuration-schema/)
for required and optional `configuration` properties.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test`

Build the adaptor using `pnpm build`.

Re-generate the adaptor source with `pnpm generate-fhir {{NAME}}`

To update the spec an re-generate, run `pnpm generate-fhir {{NAME}} --respec`.
You can update the spec url with `--spec <www>` or by modifying package.json
