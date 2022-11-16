Language ResourceMap [![Build Status](https://travis-ci.org/OpenFn/language-resourcemap.svg?branch=master)](https://travis-ci.org/OpenFn/language-resourcemap)
====================

Language Pack for building expressions and operations for working with
the [resourcemap API](https://github.com/instedd/resourcemap/wiki/REST_API).

Documentation
-------------

We are working towards this to start: https://github.com/instedd/resourcemap/wiki/REST_API#create-site

Sample configuration
------
ResourceMap uses Basic Auth.
```json
{
  "baseUrl": "http://some-site-of-yours.com:8080",
  "username": "blah",
  "password": "shhh"
}
```

Expressions
-----------

## `submitSite(collectionId, fields)`
```js
submitSite(303, fields(
  field("name", dataValue("sampleText")),
  field("lat", 48.86),
  field("lon", 2.35),
  field("properties", function(state){
    return {
      "Comment": state.data.sampleText,
      "phone": "85512345678"
    }
  })
))
```

Development
-----------

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `make`.
