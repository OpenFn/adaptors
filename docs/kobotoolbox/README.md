# Language KoboToolbox [![Build Status](https://travis-ci.org/OpenFn/language-kobotoolbox.svg?branch=master)](https://travis-ci.org/OpenFn/language-kobotoolbox)

Language Pack for building expressions and operations to interact with the
[TEMPLATE] API.

## Documentation

## post

#### sample configuration

```json
{
  "baseURL": "https://kf.kobotoolbox.org",
  "username": "mamadou@openfn.org",
  "password": "supersecret",
  "apiVersion": "v2"
}
```

#### Get the list of forms

```js
getForms({}, state => {
  console.log(state.data);
  return state;
});
```

### Get submissions for a specific form

A query can be used to filter results.

```js
getSubmissions(
  { formId: 'aXecHjmbATuF6iGFmvBLBX', query: { end: { $gte: '2020-11-20' } } },
  state => {
    console.log(state.data);
    return state;
  }
);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the `Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
