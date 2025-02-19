---
'@openfn/language-openmrs': major
---

Removed the following redundant functions and their tests: getEncounter,
getEncounters, getPatient, searchPatient and searchPerson - these are replaced
by the `get` function. Also removed the post function since it it replaced in
the http namespace and also by create. This leaves 5 important functions in the
main namespace `get`, `create`, `update`, `upsert` and `delete`
