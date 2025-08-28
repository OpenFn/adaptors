# @openfn/language-memento

## 1.0.0

Initial release of the adaptor

### Adaptor Operations

- `listLibraries`: Retrieve available content libraries
- `getFields`: Fetch field definitions and schemas
- `getEntry`: Get single entry by ID
- `createEntry`: Create new content entries
- `updateEntry`: Modify existing entries
- `deleteEntry`: Remove entries from library
- `searchEntries`: Search and filter entries with custom criteria

### HTTP Operations

- Added low-level HTTP operations for custom implementations:
  - `http.request`: Generic HTTP request handler
  - `http.get`: GET request handler
  - `http.post`: POST request handler
  - `http.put`: PUT request handler
