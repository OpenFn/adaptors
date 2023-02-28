# Language XML Scraper

Language Pack for scraping XML data from websites.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/xmlscraper-configuration-schema/)
definition.

#### sample fetch expression

```js
fetch('spreadsheetId', {
  getEndpoint: 'api/v1/forms/data/wide/json/mod_coach',
  query: function (state) {
    return { date: dataValue('_json[(@.length-1)].SubmissionDate')(state) };
  },
  postUrl: 'http://localhost:4000/inbox/8ad63a29-5c25-4d8d-ba2c-fe6274dcfbab',
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
