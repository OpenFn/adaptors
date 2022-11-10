# Language BigQuery

Language Pack for building expressions and operations to make HTTP calls.

## Documentation

### state.json

The configuration key must be a valid GCP credential as JSON.

```json
{
  "configuration": {
    "type": "service_account",
    "project_id": "some-project",
    "private_key_id": "670b9e3c8c366e83aa569dd57cbfc5c575b72e42",
    "private_key": "-----BEGIN PRIVATE KEY-----\nblah\nmoreblah=\n-----END PRIVATE KEY-----\n",
    "client_email": "bigquery@some-project.iam.gserviceaccount.com",
    "client_id": "someid",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bigquery%40some-project.iam.gserviceaccount.com"
  },
  "data": { "a": 1 }
}
```

### operations (expression.js)

#### load(...)

Load data to a table in bigquery from a CSV. See full
[options here](https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#JobConfigurationLoad).

```js
load(
  '/home/taylor/Desktop/type-C_r-ALL_ps-201012_freq-M_px-HS_pub-20200731_fmt-csv_ex-20200818.csv',
  'awesome-solutions-project', // project
  'test01', // dataset
  'mytable', // table
  {
    schema:
      'classification:STRING,year:STRING,period:STRING,period_desc:STRING,aggregate_level:STRING,is_leaf_code:STRING,trade_flow_code:STRING,trade_flow:STRING,reporter_code:STRING,reporter:STRING,reporter_iso:STRING,partner_code:STRING,partner:STRING,partner_iso:STRING,commodity_code:STRING,commodity:STRING,qty_unit_code:STRING,qty_unit:STRING,qty:INTEGER,netweight_kg:INTEGER,trade_value:INTEGER,flag:STRING',
    schemaUpdateOptions: ['ALLOW_FIELD_ADDITION'],
    // createDisposition: 'CREATE_IF_NEEDED',
    writeDisposition: 'WRITE_APPEND',
    skipLeadingRows: 1,
  } // loadOptions
);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
