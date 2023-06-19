---
'@openfn/language-asana': major
'@openfn/language-dhis2': major
'@openfn/language-fhir': major
'@openfn/language-kobotoolbox': major
'@openfn/language-ocl': major
'@openfn/language-openmrs': major
'@openfn/language-rapidpro': major
'@openfn/language-salesforce': major
'@openfn/language-template': major
'@openfn/language-beyonic': minor
'@openfn/language-bigquery': minor
'@openfn/language-cartodb': minor
'@openfn/language-commcare': minor
'@openfn/language-common': minor
'@openfn/language-dynamics': minor
'@openfn/language-facebook': minor
'@openfn/language-godata': minor
'@openfn/language-googlesheets': minor
'@openfn/language-http': minor
'@openfn/language-khanacademy': minor
'@openfn/language-magpi': minor
'@openfn/language-mailchimp': minor
'@openfn/language-mailgun': minor
'@openfn/language-maximo': minor
'@openfn/language-medicmobile': minor
'@openfn/language-mogli': minor
'@openfn/language-mongodb': minor
'@openfn/language-mssql': minor
'@openfn/language-mysql': minor
'@openfn/language-nexmo': minor
'@openfn/language-openfn': minor
'@openfn/language-openhim': minor
'@openfn/language-postgresql': minor
'@openfn/language-primero': minor
'@openfn/language-progres': minor
'@openfn/language-resourcemap': minor
'@openfn/language-sftp': minor
'@openfn/language-smpp': minor
'@openfn/language-surveycto': minor
'@openfn/language-telerivet': minor
'@openfn/language-twilio': minor
'@openfn/language-vtiger': minor
'@openfn/language-zoho': minor
---

Remove parameter reassignment to ensure proper functioning inside an `each`
block; add eslint

The packages receiving a major bump here exposed functions that didn't work as
expected inside `each` blocks. Users were previously wrapping these functions
inside their own custom `fn` blocks, and this change will ensure that they can
be used inside a standard each.

See https://github.com/OpenFn/adaptors/issues/275 for more details.
