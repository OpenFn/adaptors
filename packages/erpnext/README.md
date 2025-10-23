# language-erpnext <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the ERPNext API.

## Documentation

View the
[docs site](https://docs.openfn.org/adaptors/packages/erpnext-docs) for
full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/erpnext-configuration-schema/)
for required and optional `configuration` properties.

### Example Usage

```js
// Create a new customer
create('Customer', {
  customer_name: 'Acme Corporation',
  customer_type: 'Company'
});
```

```js
// Get a list of sales orders
getList('Sales Order', {
  filters: { status: 'Draft' },
  fields: ['name', 'customer', 'grand_total'],
  limit: 50
});
```

```js
// Update a customer record
update('Customer', 'CUST-00001', {
  mobile_no: '+1234567890'
});
```

```js
// Read a document by ID
read('Item', 'ITEM-001', ['item_name', 'standard_rate']);
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
