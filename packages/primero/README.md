# language-primero

An OpenFn **_adaptor_** for building integration jobs for use with UNICEF's
Primero API.

**See Update Docs Site: https://docs.openfn.org/adaptors/packages/primero-docs**

## Primero API Versions

### Adaptor for Primero v2.0

This documentation outlines the functions available for Primero `v2.0` in the
main branch. The API documentation is available at:
https://github.com/primeroIMS/primero/tree/development_v2/app/controllers/api

### Adaptor for Primero v1.0 still available on the `v1` branch.

`v1.0.7` of this adaptor was built for the Primero `v1.1` API:
https://github.com/OpenFn/language-primero/blob/v1/README.md

[Primero API v1.1 Documentation](https://docs.google.com/document/d/1jpaT2_UBBnc3PxPYlLMBEzNUkyfuxRZiksywG5MKM0Q/edit)

#### Primero Authentication Strategies

The Primero team is considering a shift to Microsoft Azure Active Directory B2C
for auth. We can likely accommodate this with a similar pattern as has been used
in our Microsoft Dynamics, Github, or Google Sheets adaptors, but we'll need to
await final doucmentation for Primero's `v2` API before making changes.

[Azure Active Directory B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/)

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
