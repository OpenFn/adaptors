# @openfn/language-memento

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
