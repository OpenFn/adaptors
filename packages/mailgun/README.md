# Language Mailgun

Language Pack for building expressions and operations for working with the
mailgun API.

[mailgun-js on npm](https://www.npmjs.com/package/mailgun-js)

## Documentation

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
  )
);
```

[Docs](docs/index)

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
