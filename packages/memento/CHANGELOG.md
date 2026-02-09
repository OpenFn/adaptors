# @openfn/language-memento

## 1.0.5 - 09 February 2026

### Patch Changes

- Updated dependencies \[8ad6b98]
- Updated dependencies \[8ad6b98]
  - @openfn/language-common@3.2.2

## 1.0.4 - 28 November 2025

### Patch Changes

- Updated dependencies \[cfc66df]
  - @openfn/language-common@3.2.1

## 1.0.3 - 12 November 2025

### Patch Changes

- Updated dependencies \[4d7a833]
  - @openfn/language-common@3.2.0

## 1.0.2 - 04 November 2025

### Patch Changes

- Updated dependencies
  - @openfn/language-common@3.1.2

## 1.0.1

### Patch Changes

- Updated dependencies \[408a3a2]
  - @openfn/language-common@3.1.1

## 1.0.0

Initial release of the adaptor

### Adaptor Operations

- `listLibraries`: Retrieve available content libraries
- `getFields`: Fetch field definitions and schemas
- `listEntries`: List entries in a library
- `getEntry`: Get single entry by ID
- `createEntry`: Create new content entries
- `updateEntry`: Modify existing entries

### HTTP Operations

- Added low-level HTTP operations for custom implementations:
  - `http.request`: Generic HTTP request function
  - `http.get`: GET request function
  - `http.post`: POST request function
  - `http.put`: PUT request function
