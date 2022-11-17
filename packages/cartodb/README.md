Language cartodb
==============

Language Pack for sending messages using the [cartodb API](http://docs.cartodb.com/cartodb-platform/sql-api/).

Documentation
-------------

## Sample configuration

```json
{
  "account": "oepnfn",
  "apiKey": "longsecretapikey"
}
```

## Examples

```js
addRow("your_table", fields(
  field("name", "taylor"),
  field("lat", dataValue("lat")),
  field("long", dataValue("long")),
  field("mookie", dataValue("form.blaylock")),
  field("description", dataValue("type_description")),
  field("date", dataValue("SubmissionDate"))
))
```

```js
sql(
  function(state) {
    return (
      `INSERT INTO untitled_table (name, the_geom) VALUES ('`
      + dataValue("form.first_name")(state)
      + `', ST_SetSRID(ST_Point(`
        + dataValue("lat")(state) + `, `
        + dataValue("long")(state) + `),4326))`
    )
  }
)
```

Development
-----------

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `make`.
