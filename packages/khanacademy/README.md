Language HTTP
=============

Language Pack for building expressions and operations to make HTTP calls.

Documentation
-------------
## fetch

#### Sample configuration

```json
{
  "email": "yours",
  "password": "notmine",
  "consumerKey": "somEThINGkeyish",
  "secretKey": "otherThiNGfSECret"
}

```

#### sample usage
```js
fetch({
  "getEndpoint": "user",
  "queryParams": {
    "email": "thisoneuser@something.org"
  },
  "postUrl": "https://www.openfn.org/inbox/your-uuid",
})
```

Development
-----------

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `make`.
