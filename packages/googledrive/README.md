# language-googledrive <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the
googledrive API.

## Documentation

View the
[docs site](https://docs.openfn.org/adaptors/packages/googledrive-docs) for
full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/googledrive-configuration-schema/)
for required and optional `configuration` properties.

This adaptor supports two authentication methods: **OAuth2** and **Service Account**.

#### OAuth2

Provide an `access_token` obtained via the Google OAuth2 flow. See the
[Google OAuth2 documentation](https://developers.google.com/identity/protocols/oauth2)
for details.

```json
{
  "configuration": {
    "access_token": "ya29.A0..."
  }
}
```

#### Service Account

Service accounts are ideal for server-to-server integrations that run without
user interaction. Use a service account when you need reliable, long-running
access without managing OAuth2 token refresh.

To create a service account and obtain a JSON key file, follow the
[Google Cloud service account documentation](https://cloud.google.com/iam/docs/service-accounts-create).
Your OpenFn credential requires the `client_email` and `private_key` fields
from the downloaded JSON key file.

**Share files or folders with the service account**

A service account does not have access to any Drive files by default. You must
explicitly share each file or folder the adaptor needs to access, just like you
would share with any other Google user.

1. Open Google Drive and locate the file or folder.
2. Click **Share**.
3. Enter the service account's `client_email` address.
4. Grant at least **Editor** access (or **Viewer** if read-only is sufficient).
5. Click **Send**.

> **Note:** If you share a folder, the service account will have access to all
> files inside it. This is often the easiest approach for integrations that work
> with multiple files.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
