Language Maximo
==============

Language Pack for building expressions and operations to access IBM Maximo EAM.

Documentation
-------------
## Fetch

#### sample configuration

```json
{
  "username": "taylor",
  "password": "supersecret",
  "baseUrl": "https://maximo-demo76.mro.com",
}
```

#### sample 'fetch' expression
```js
fetch({
  endpoint: "maxrest/rest/os/mxinventory",
  query: {
    ITEMNUM: "01226",
    _format: "json"
  },
  postUrl: "https://www.openfn.org/inbox/not-real",
});
```

### sample 'create' expression
```js
create({
  endpoint: "maxrest/rest/os/mxinvbal/",
  body: function(state) {
    return {
      ITEMNUM: dataValue("form.ITEMNUM")(state),
      ITEMSETID: dataValue("form.ITEMSETID")(state),
      SITEID: dataValue("form.SITEID")(state),
      LOCATION: dataValue("form.LOCATION")(state),
      ISSUEUNIT: "FOO",
      PHYSCNT: dataValue("PHYSCNT")(state),
      BINNUM: dataValue("form.BINNUM")(state)
    }
  }
});
```

### sample 'update75' expression
```js
update75({
  endpoint: state => {
    return "maxrest/rest/os/mxinvbal/" + dataValue("form.question1.INVBALANCESID")(state)
  },
  body: state => {
    return {
      _action: "AddChange", //this is required for the old Maximo API!
      ITEMNUM: dataValue("form.ITEMNUM")(state),
      ITEMSETID: dataValue("form.ITEMSETID")(state),
      SITEID: dataValue("form.SITEID")(state),
      LOCATION: dataValue("form.LOCATION")(state),
      PHYSCNT: dataValue("form.PHYSCNT")(state),
      BINNUM: dataValue("form.BINNUM")(state)
    }
  }
});
```

[Docs](docs/index)


Development
-----------

Clone the repo, run `npm install`.

Run tests using `npm run test` or `npm run test:watch`

Build the project using `make`.
