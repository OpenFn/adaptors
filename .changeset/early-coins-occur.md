---
'@openfn/language-surveycto': major
---

- Add new helper functions:
    - `listDatasets()` and `listRecords()` to list datasets and dataset records respectively.
    - `getDataset()` and `getRecord()` to get a single record or dataset.
    - `upsertRecord()` and `upsertDataset()` to create or update a record or a dataset.
    - `deleteRecord()` and `deleteDataset()` to delete a record and a dataset.
    - `purgeDataset()` to delete all records of a dataset
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

