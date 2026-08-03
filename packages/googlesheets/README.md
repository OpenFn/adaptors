# Language Google Sheets

Language Pack for building expressions and operations to make Google Sheets API
calls.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/googlesheets-configuration-schema/)
definition.

This adaptor supports two authentication methods: **OAuth2** and **Service Account**.

#### OAuth2

**On app.openfn.org:** Click **Sign in with Google Sheets** in the credential setup form. Authentication is handled for you and no manual token management is needed.

**Using the OpenFn CLI locally:** Use the [gcloud CLI](https://cloud.google.com/sdk/docs/install) to print a temporary access token and provide it in your configuration:

```bash
gcloud auth print-access-token
```

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

**Share the spreadsheet with the service account**

A service account does not have access to any spreadsheet by default. You must
share each spreadsheet the adaptor needs to access, just like you would share
with any other Google user.

1. Open the spreadsheet in Google Sheets.
2. Click **Share** (top-right corner).
3. Enter the service account's `client_email` address.
4. Grant at least **Editor** access (or **Viewer** if read-only is sufficient).
5. Click **Send**.

> **Note:** The service account email looks like
> `name@project-id.iam.gserviceaccount.com`. If you see a "This person may not
> be a Google user" warning, you can safely ignore it and proceed.

### appendValues()

Add rows to an existing sheet:
`https://sheets.googleapis.com/v4/spreadsheets/spreadsheetId/values/Sheet1!A1:E1:append?valueInputOption=USER_ENTERED`

```js
appendValues({
  spreadsheetId: '1O-a4_RgPF_p8W3I6b5M9wobA3-CBW8hLClZfUik5sos',
  range: 'Sheet1!A1:E1',
  values: [
    ['From expression', '$15', '2', '3/15/2016'],
    ['Really now!', '$100', '1', '3/20/2016'],
  ],
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
