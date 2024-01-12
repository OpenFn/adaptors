# Language Maximo

Language Pack for building expressions and operations to access IBM Maximo EAM.

## Documentation

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/maximo-configuration-schema/)
definition.

### Fetch

#### sample 'fetch' expression

```js
fetch({
  endpoint: 'maxrest/rest/os/mxinventory',
  query: {
    ITEMNUM: '01226',
    _format: 'json',
  },
  postUrl: 'https://www.openfn.org/inbox/not-real',
});
```

### sample 'create' expression

```js
create({
  endpoint: 'maxrest/rest/os/mxinvbal/',
  body: function (state) {
    return {
      ITEMNUM: dataValue('form.ITEMNUM')(state),
      ITEMSETID: dataValue('form.ITEMSETID')(state),
      SITEID: dataValue('form.SITEID')(state),
      LOCATION: dataValue('form.LOCATION')(state),
      ISSUEUNIT: 'FOO',
      PHYSCNT: dataValue('PHYSCNT')(state),
      BINNUM: dataValue('form.BINNUM')(state),
    };
  },
});
```

### sample 'update75' expression

```js
update75({
  endpoint: state => {
    return (
      'maxrest/rest/os/mxinvbal/' +
      dataValue('form.question1.INVBALANCESID')(state)
    );
  },
  body: state => {
    return {
      _action: 'AddChange', //this is required for the old Maximo API!
      ITEMNUM: dataValue('form.ITEMNUM')(state),
      ITEMSETID: dataValue('form.ITEMSETID')(state),
      SITEID: dataValue('form.SITEID')(state),
      LOCATION: dataValue('form.LOCATION')(state),
      PHYSCNT: dataValue('form.PHYSCNT')(state),
      BINNUM: dataValue('form.BINNUM')(state),
    };
  },
});
```

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
