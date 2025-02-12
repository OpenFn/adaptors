# Language DHIS2

An OpenFn language pack for building expressions and operations to work with the
[DHIS2 API](https://docs.dhis2.org/en/home.html). Commonly used via
[OpenFn.org](https://app.openfn.org) or manually with
[OpenFn CLI](https://github.com/OpenFn/kit).

## Table of Contents

1. [Getting Started](#getting-started)
2. [Important Note](#important-note)
3. [Configuration](#configuration)
4. [Helper Functions](#helper-functions)
5. [Development](#development)
   - [Running Tests](#running-tests)
   - [Unit Tests](#unit-tests)
   - [Integration Tests](#integration-tests)
   - [Troubleshooting Tests](#troubleshooting-tests)

---

## Getting Started

To use this package, execute commands via OpenFn/core from the root of the
repository:

```sh
openfn job.js -a dhis2 -s tmp/state.json
```

For installation and usage, see the
[docs site](https://docs.openfn.org/adaptors/packages/dhis2-docs).

---

## Important Note

- For DHIS2 API versions 2.42+ and the **new tracker**, use **adaptor 6.0+**.
  Refer to the
  [DHIS2 API documentation](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-master/tracker.html)
  for details.
- For **old tracker versions** and DHIS2 API versions **prior to 2.42**, use
  **adaptor 5.0+**. But we highly recommend upgrading to the latest version.

---

## Configuration

All required and optional properties for `state.configuration` are defined in
the official
[configuration-schema](https://docs.openfn.org/adaptors/packages/dhis2-configuration-schema/).

Ensure you configure:

- **Username**: DHIS2 admin username
- **Password**: Corresponding DHIS2 admin password
- **Host URL**: URL of the DHIS2 instance

Example configuration:

```json
{
  "username": "admin",
  "password": "district",
  "hostUrl": "https://play.dhis2.org/2.36.6"
}
```

---

## Helper Functions

Helper functions simplify common DHIS2 operations. View the
[complete function documentation](https://docs.openfn.org/adaptors/packages/dhis2-docs).

## Development

### Running Tests

To run unit and integration tests, use the following commands:

- **Unit Tests**: `pnpm test`
- **Integration Tests**: `pnpm test:integration`

_Note: Integration tests depend on a live DHIS2 instance._

### Unit Tests

Unit tests validate helper functions independently. For example:

- Does `create('events', payload)` perform a correct POST request?

Add new unit tests whenever helper functions are updated.

### Integration Tests

Integration tests validate end-to-end behavior with a live DHIS2 instance.
Ensure your test environment includes:

- At least one **organisation unit**.
- One **program** and a corresponding **program stage**.
- A **tracked entity instance** enrolled in the program.

Modify `globalState` in `test/integration.js` as needed:

```javascript
before(done => {
  fixture.initialState = {
    configuration: {
      username: 'admin',
      password: 'district',
      hostUrl: 'https://play.dhis2.org/2.36.6',
    },
    program: 'IpHINAT79UW',
    orgUnit: 'DiszpKrYNg8',
    trackedEntityInstance: 'uhubxsfLanV',
    programStage: 'eaDHS084uMp',
  };
  done();
});
```

### Troubleshooting Tests

- **Timeout Errors**: Increase the global timeout in `test/mocha.opts`.
- **Environment Issues**: Ensure DHIS2 components (programs, org units, etc.)
  are correctly configured.

---

For further technical details, see the
[documentation](https://docs.openfn.org/adaptors/packages/dhis2-docs) or contact
the [OpenFn community](https://community.openfn.org).
