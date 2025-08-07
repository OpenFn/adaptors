---
'@openfn/language-azure-storage': major
'@openfn/language-googlesheets': major
'@openfn/language-googledrive': major
'@openfn/language-postgresql': major
'@openfn/language-satusehat': major
'@openfn/language-bigquery': major
'@openfn/language-commcare': major
'@openfn/language-openimis': major
'@openfn/language-openspp': major
'@openfn/language-primero': major
'@openfn/language-twilio': major
'@openfn/language-asana': major
'@openfn/language-dhis2': major
'@openfn/language-gmail': major
'@openfn/language-mssql': major
'@openfn/language-odoo': major
'@openfn/language-sftp': major
'@openfn/language-varo': major
---

removed `http` export from `@openfn/language-common`

### Migration Guide

The `http` export has been removed from `@openfn/language-common`. If you were
using it, you should remove it from your code and create a new step that uses
`http` adaptor. See example below.

**Before**

**Step 1: Fetch and post data using postgresql adaptor**

```js
sql('select * from foo');
http.post('/example', { body: $.data }),
```

**Now**

**Step 1: Fetch data using postgresql adaptor**

```js
sql('select * from foo');
```

**Step 2: Post data using http adaptor**

```js
post('/example', { body: $.data });
```
