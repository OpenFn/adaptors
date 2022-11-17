# Language OpenFn [![Build Status](https://travis-ci.org/OpenFn/language-openfn.svg?branch=master)](https://travis-ci.org/OpenFn/language-openfn)

Adaptor for building expressions and operations to interact with the OpenFn API.

## Documentation

## request

```js
request({
  method: 'get',
  path: 'jobs',
  params: {
    project_id: 490,
  },
});
request(
  {
    method: 'post',
    path: 'jobs',
    data: {
      trigger_id: 1,
      expression: 'steps()',
    },
  },
  state => {
    console.log('cool callback!');
    return state;
  }
);
```

#### sample configuration

```json
{
  "host": "https://www.openfn.org",
  "username": "someone@ngo.org",
  "password": "supersecret",
  "projectId": "ID"
}
```

## Development

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `make`.

To build the docs for this repo, run `./node_modules/.bin/jsdoc --readme ./README.md ./lib -d docs`.
