# Language Mojaloop

Language Pack for building expressions and operations to interact with the Mojaloop Third Party API.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/mojaloop-configuration-schema/)
definition.

Required configuration:
- `baseUrl`: The base URL for the Mojaloop Third Party API

Optional authentication:
- `access_token`: OAuth Access token or Bearer token
- `apiKey`: API Key for authentication
- `username` and `password`: For Basic Authentication

### Get Party Information

Retrieve information about a party by identifier type and value.

```js
getParties('MSISDN', '123456789', {
  headers: { 'FSPIOP-Source': 'pisp' }
});
```

### Create Consent Request

Create a consent request for account linking.

```js
createConsentRequest({
  consentRequestId: '123',
  userId: 'user123',
  scopes: [
    {
      accountId: 'acc123',
      actions: ['ACCOUNTS_TRANSFER', 'ACCOUNTS_GET_BALANCE']
    }
  ],
  authChannels: ['WEB', 'OTP'],
  callbackUri: 'https://pisp.example.com/callback'
});
```

### Get Consent

Retrieve consent details by consent ID.

```js
getConsent('consent123', {
  headers: { 'FSPIOP-Source': 'pisp' }
});
```

### Update Consent

Update an existing consent.

```js
updateConsent('consent123', {
  status: 'ACTIVE',
  credential: {
    credentialType: 'FIDO',
    status: 'ACTIVE',
    payload: { publicKey: 'key123' }
  }
});
```

### Revoke Consent

Revoke a consent.

```js
revokeConsent('consent123', {
  headers: { 'FSPIOP-Source': 'pisp' }
});
```

### Create Third Party Transaction Request

Initiate a payment transfer.

```js
createThirdPartyRequest({
  transactionRequestId: 'txn123',
  payee: {
    partyIdInfo: {
      partyIdType: 'MSISDN',
      partyIdentifier: '987654321'
    }
  },
  payer: {
    partyIdType: 'THIRD_PARTY_LINK',
    partyIdentifier: 'link123'
  },
  amountType: 'SEND',
  amount: { currency: 'USD', amount: '100' },
  transactionType: {
    scenario: 'TRANSFER',
    initiator: 'PAYER',
    initiatorType: 'CONSUMER'
  }
});
```

### Get Third Party Transaction Request

Get transaction request details.

```js
getThirdPartyRequest('txn123', {
  headers: { 'FSPIOP-Source': 'pisp' }
});
```

### Authorize Third Party Transaction

Authorize a transaction request.

```js
authorizeThirdPartyRequest('txn123', {
  authorizationResponse: {
    responseType: 'ACCEPTED',
    signedPayload: {
      signedPayloadType: 'FIDO',
      fidoSignedPayload: {
        id: '123',
        response: {}
      }
    }
  }
});
```

### Get Accounts

Get accounts linked to a consent.

```js
getAccounts('consent123', {
  headers: { 'FSPIOP-Source': 'pisp' }
});
```

### Generic HTTP Methods

The adaptor also provides generic HTTP methods for custom API calls:

```js
// GET request
get('/custom-endpoint', {
  query: { foo: 'bar' },
  headers: { 'FSPIOP-Source': 'pisp' }
});

// POST request
post('/custom-endpoint', {
  key: 'value'
}, {
  headers: { 'FSPIOP-Source': 'pisp' }
});

// PUT request
put('/custom-endpoint/123', {
  key: 'updated-value'
});

// PATCH request
patch('/custom-endpoint/123', {
  key: 'patched-value'
});

// DELETE request
del('/custom-endpoint/123');
```

### Using with State

All operations can access and transform state:

```js
getParties('MSISDN', state => state.phoneNumber, {
  headers: { 'FSPIOP-Source': 'pisp' }
});
```

## Development

Clone the repo, run `pnpm install`.

Run tests using `pnpm run test` or `pnpm run test:watch`.

To build the docs for this repo, run `pnpm build:docs`.
