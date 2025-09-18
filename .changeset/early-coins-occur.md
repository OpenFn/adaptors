---
'@openfn/language-surveycto': major
---

- Add new helper functions:
    - `list()`  to list datasets and dataset records .
    - `http` namespace with `delete()`, `post()`, `get()`, and `request()`.
    - `upsertRecord()` and `upsertDataset()` to create or update a record or a dataset.
    - `uploadCsvRecords()` to upload records to a dataset in `csv` format

- Remove support for `callback` function options in the helper functions.

#### Migration Guide

- Before: 
 ```

 fetchSubmissions('my-form', state => {
    state.results = state.data;
    return state
 })

 ```


 - Now:

 ```

 fetchSubmissions('my-form')

 ```

