# Language Magpi

Language Pack for building expressions and operations for working with the
[Magpi inbound API](http://support.magpi.com/support/solutions/articles/4839-magpi-inbound-api)
and the
[Magpi outbound API](http://support.magpi.com/support/solutions/articles/4865-magpi-outbound-api).

_N.B.: The Magpi API is under development and this pack may change._

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/magpi-configuration-schema/)
definition.

## Fetch data from Magpi

Allows you to fetch data from Magpi and post it elsewhere.

#### Using `fetchSurveyData`:

https://www.magpi.com/api/surveydata/v2?username=taylordowns2000&accesstoken=blahblahblah&surveyid=921409679070

```js
fetchSurveyData({
  surveyId: '37479',
  afterDate: '2016-01-01',
  beforeDate: '2100-01-01',
  postUrl: 'https://www.openfn.org/inbox/secret-5c25-inbox-ba2c-url',
});
```

## Submit new records

**wip:** This will allow you to push data to Magpi to create a new record for a
form which exists in a user account.

#### Using `submitRecord`:

```js
submitRecord(1, 2);
```

#### Magpi Outbound API Parameters:

- `username`: The account username.
- `accesstoken`: The accesstoken generated on the site. Each accesstoken is
  associated with the user who generated.
- `surveyid`: The surveyid is not the survey's name. The surveyid can be
  obtained from the list of forms generated in 1 above.
- `startdate`: Start date of the data to be returned. Filtering is done based on
  the DateStamp and is inclusive.(Optional). The date format should be the same
  one as the one on the data tab/ The date format should be the same one as the
  one on the data tab
- `enddate`: End date of the data to be returned. Filtering is done based on the
  DateStamp and is inclusive.(Optional)

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
