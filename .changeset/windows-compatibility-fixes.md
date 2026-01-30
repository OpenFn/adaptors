---
"@openfn/language-common": patch
"@openfn/language-fhir-4": patch
"@openfn/language-formsg": patch
"@openfn/language-flutterwave": patch
"@openfn/language-ghana-bdr": patch
"@openfn/language-ghana-nia": patch
---

Fix Windows compatibility issues

- Added cross-env to fhir-4 and formsg packages to properly handle environment variables on Windows
- Updated test scripts to use cross-env for TS_NODE_TRANSPILE_ONLY environment variable
- Fixed flutterwave test mock to match query parameters in path instead of separate query object
- Fixed ghana-bdr util.js to use path.posix.join() for URL path construction instead of path.join()
- Fixed ghana-nia util.js to use path.posix.join() for URL path construction instead of path.join()
- Increased timeout in common package validate test to accommodate slower async ajv imports on Windows
- Verified path.posix.join works correctly for URL construction on Windows
