Language Mailgun
================

Language Pack for building expressions and operations for working with
the mailgun API.

[mailgun-js on npm](https://www.npmjs.com/package/mailgun-js)

Documentation
-------------

## Sample configuration

```json
{
  "domain": "http://mailgun.com/domain",
  "apiKey": "mailgunapikey"
}
```

## send
```js
send(
  fields(
    field('from', 'from_email'),
    field('to', 'to_email'),
    field('subject', 'Your Subject'),
    field('text', 'Your message goes here')
  ))
```

[Docs](docs/index)


Development
-----------

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `make`.
