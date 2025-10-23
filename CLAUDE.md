# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a monorepo containing 80+ OpenFn adaptors (language packages) that provide helper functions for communicating with external systems. Adaptors are used by OpenFn Lightning and the OpenFn CLI for workflow automation.

**Key characteristics:**
- PNPM workspace-based monorepo
- All adaptors share a common architecture pattern
- Centralized build tools in `tools/` directory
- JSDoc-based documentation that auto-generates to docs.openfn.org
- Changesets for versioning and releases

## Essential Commands

### Initial Setup
```bash
# Install asdf plugins (if not already installed)
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf plugin-add pnpm

# Install dependencies and build
asdf install
pnpm install
pnpm build
pnpm run setup
```

### Building
```bash
pnpm build              # Build all tools and adaptors
pnpm build:tools        # Build tools only
pnpm build:adaptors     # Build adaptors only

# Build a single adaptor
cd packages/<adaptor-name>
pnpm build              # Builds via build-adaptor CLI from tools/build
pnpm build --watch      # Watch mode for development
```

### Testing
```bash
pnpm test               # Lint and run all tests (includes import tests)
pnpm lint               # Lint all packages
pnpm test:git           # Check git status
pnpm test:imports       # Test imports

# Test a single adaptor
cd packages/<adaptor-name>
pnpm test               # Run mocha tests
pnpm test:watch         # Watch mode

# Integration tests (some adaptors like salesforce)
pnpm test:integration
```

### Testing with OpenFn CLI
Set `OPENFN_ADAPTORS_REPO` environment variable, then:
```bash
# Using monorepo mode
openfn job.js -ma <adaptor-name> -s tmp/state.json -o tmp/output.json

# Auto-install mode
openfn -a <adaptor-name> job.js -s tmp/state.json -o tmp/output.json
```

### Creating New Adaptors
```bash
pnpm generate <adaptor-name>
cd packages/<adaptor-name>
pnpm install
pnpm build --watch
```

### Changesets & Versioning
```bash
pnpm changeset          # Create a changeset (required for all PRs)
pnpm run version        # Bump versions and add release dates (after PR approval)
```

## Architecture

### Monorepo Structure
```
adaptors/
├── packages/           # All adaptor packages (80+)
│   ├── common/        # Base adaptor with shared utilities (lodash, execute, fn, etc.)
│   ├── http/          # Generic HTTP adaptor
│   ├── salesforce/    # Domain-specific adaptors...
│   └── .../
├── tools/             # Build and development tools
│   ├── build/         # build-adaptor CLI (tsup-based)
│   ├── generate/      # Adaptor generator
│   ├── metadata/      # Metadata generation
│   ├── generate-fhir/ # FHIR type generation
│   ├── parse-jsdoc/   # JSDoc parser
│   └── .../
└── scripts/           # Bash scripts for docs, releases, etc.
```

### Adaptor Structure
Each adaptor follows this pattern:
```
packages/<adaptor-name>/
├── src/
│   ├── Adaptor.js     # Main adaptor code (or .ts for TypeScript)
│   ├── index.js       # Re-exports from Adaptor
│   └── util.js        # Helper functions (optional)
├── test/              # Mocha test files
├── assets/            # Logo images (rectangle.png, square.png)
├── configuration-schema.json  # JSON schema for credentials
├── package.json       # Package config with pnpm scripts
└── tsconfig.json      # TypeScript config (if applicable)
```

### Key Patterns

**Operations**: Adaptors export functions that return operations (functions taking state and returning state):
```javascript
export function myOperation(args) {
  return state => {
    // Do work with state
    return state;
  };
}
```

**Common Package**: Most adaptors depend on `@openfn/language-common` which provides:
- `execute()` - Chains operations together
- `fn()` - Custom state transformations
- `_` - Lodash utilities
- HTTP utilities, JSONPath, date functions

**State Object**: State flows through operations with this structure:
```javascript
{
  data: {},           // Primary data payload
  configuration: {},  // Credentials and config
  references: []      // History of previous data objects
}
```

**Build Process**: Uses `build-adaptor` CLI from `tools/build`:
- Transpiles JS/TS with Babel/tsup
- Generates TypeScript type definitions
- Generates markdown docs from JSDoc comments
- Creates both ESM and CJS outputs

### Documentation

JSDoc comments in adaptor code are automatically:
1. Extracted by `tools/parse-jsdoc`
2. Built into markdown via `pnpm docs:build`
3. Published to docs.openfn.org on release

**Important JSDoc tags:**
- `@public` - Exported to documentation
- `@function` - Document as a function
- `@example` - Usage examples (critical for good docs)
- `@param` - Parameter documentation
- `@returns` - Return value documentation

### Testing

- Test framework: Mocha
- Common patterns: `chai` for assertions, `nock` for HTTP mocking
- Test files in `test/` directory
- Run with `mocha --experimental-specifier-resolution=node --no-warnings`

### Release Process

1. Create PR with changes
2. Add changeset: `pnpm changeset`
3. After approval: `pnpm run version`
4. Merge to `main`
5. GitHub Actions automatically:
   - Publishes to npm
   - Creates git tags
   - Updates docs.openfn.org
   - Notifies Slack

## Configuration Schemas

Each adaptor has a `configuration-schema.json` that defines credentials structure. Common fields:
- `username` / `password`
- `access_token`
- `baseUrl`
- `tls` - TLS/SSL options

## Important Notes

- Always prefer editing existing adaptors over creating new files
- Include comprehensive JSDoc comments with `@example` tags
- Follow existing code patterns in the adaptor you're modifying
- All PRs require changesets
- Never commit secrets or credentials to the repo
- Logo assets should be 512x190px (rectangle) and 256x256px (square)
- The `testing` package is excluded from releases
- Pre-release system is currently disabled

## ERPNext Adaptor Development Guide

### Overview
The ERPNext adaptor provides integration with Frappe/ERPNext REST API. It follows the same pattern as the Odoo adaptor but uses REST/HTTP instead of XML-RPC.

### Reference Implementation: Odoo Adaptor
The Odoo adaptor (`packages/odoo/`) serves as the primary reference for building the ERPNext adaptor because:
- Both are ERP systems with similar CRUD operations
- Both use external SDK libraries for API communication
- Both require authentication before operations
- Both support search/filter operations with pagination

### Key Architecture Patterns

**Connection Management:**
```javascript
let frappeClient = null;  // Module-level client variable

async function login(state) {
  const { baseUrl, apiKey, apiSecret } = state.configuration;
  frappeClient = new FrappeApp(baseUrl);
  await frappeClient.auth().loginWithApiKey(apiKey, apiSecret);
  return state;
}

export function execute(...operations) {
  const initialState = { references: [], data: null };
  return state => {
    return commonExecute(login, ...operations)({ ...initialState, ...state });
  };
}
```

**Operation Pattern:**
```javascript
export function create(doctype, data, options = {}) {
  return async state => {
    // 1. Expand references from state
    const [resolvedDoctype, resolvedData, resolvedOptions] =
      expandReferences(state, doctype, data, options);

    // 2. Log operation
    console.log(`Creating ${resolvedDoctype} document...`);

    // 3. Call API via SDK
    const response = await frappeClient.db().createDoc(resolvedDoctype, resolvedData);

    // 4. Compose next state
    return composeNextState(state, response);
  };
}
```

### ERPNext/Frappe API Specifics

**Authentication Methods:**
1. API Key/Secret (recommended): Set in ERPNext user profile
2. Username/Password: Basic authentication
3. Token-based: OAuth2 bearer tokens

**Key Terminology:**
- **Doctype**: Equivalent to Odoo's "model" (e.g., "Customer", "Sales Order")
- **Name**: Document identifier (can be string, not just numeric like Odoo)
- **Submit**: ERPNext workflow action to finalize documents
- **Cancel**: Reverse a submitted document

**API Endpoints Pattern:**
- List: `GET /api/resource/{doctype}`
- Get: `GET /api/resource/{doctype}/{name}`
- Create: `POST /api/resource/{doctype}`
- Update: `PUT /api/resource/{doctype}/{name}`
- Delete: `DELETE /api/resource/{doctype}/{name}`

**SDK: frappe-js-sdk**
```bash
pnpm install frappe-js-sdk
```

Key methods:
- `frappeClient.auth().loginWithApiKey(key, secret)`
- `frappeClient.auth().loginWithUsernamePassword(username, password)`
- `frappeClient.db().createDoc(doctype, data)`
- `frappeClient.db().getDoc(doctype, name)`
- `frappeClient.db().updateDoc(doctype, name, data)`
- `frappeClient.db().deleteDoc(doctype, name)`
- `frappeClient.db().getDocList(doctype, options)` - supports filters, fields, limit, offset

### Required Operations

**Core CRUD:**
- `create(doctype, data, options)` - Create a document
- `read(doctype, name, fields)` - Read a specific document
- `update(doctype, name, data)` - Update a document
- `deleteRecord(doctype, name)` - Delete a document

**Search/Query:**
- `getList(doctype, options)` - List documents with filters
  - Options: `filters`, `fields`, `limit`, `offset`, `orderBy`
- `getCount(doctype, filters)` - Count matching documents

**ERPNext-Specific (future):**
- `submitDocument(doctype, name)` - Submit a document
- `cancelDocument(doctype, name)` - Cancel a submitted document
- `attachFile(doctype, name, fileData)` - Attach files

### Configuration Schema

```json
{
  "baseUrl": {
    "type": "string",
    "required": true,
    "description": "ERPNext instance URL (e.g., https://mycompany.erpnext.com)"
  },
  "apiKey": {
    "type": "string",
    "description": "API Key (recommended for production)"
  },
  "apiSecret": {
    "type": "string",
    "writeOnly": true,
    "description": "API Secret"
  },
  "username": {
    "type": "string",
    "description": "Username (alternative to API key)"
  },
  "password": {
    "type": "string",
    "writeOnly": true,
    "description": "Password (alternative to API secret)"
  }
}
```

### Testing Patterns

**Mock Client Pattern** (from Odoo):
```javascript
export function setMockClient(mock) {
  frappeClient = mock;
}

// In tests:
const mock = {
  db: () => ({
    createDoc: (doctype, data) => {
      expect(doctype).to.eql('Customer');
      expect(data).to.eql({ customer_name: 'Test Corp' });
      return { name: 'CUST-001' };
    }
  })
};
setMockClient(mock);

const { data } = await create('Customer', { customer_name: 'Test Corp' })(state);
expect(data.name).to.eql('CUST-001');
```

**Test Coverage:**
- Basic CRUD operations
- Error handling (404, duplicate, validation errors)
- Pagination edge cases
- Field selection
- Filter queries
- Authentication failure scenarios

### Documentation Requirements

**JSDoc Example:**
```javascript
/**
 * Create a document in ERPNext
 * @public
 * @example <caption>Create a customer record</caption>
 * create('Customer', {
 *   customer_name: 'Acme Corp',
 *   customer_type: 'Company'
 * });
 * @example <caption>Create with data from state</caption>
 * create('Sales Order', $.orderData);
 * @function
 * @param {string} doctype - The doctype to create (e.g., "Customer", "Sales Order")
 * @param {object} data - The document data as JSON
 * @param {object} options - Optional configuration
 * @state {ERPNextState}
 * @returns {Operation}
 */
```

### Common Patterns

**Pagination:**
```javascript
// Fetch all items in batches
getList('Item', {
  filters: { item_group: 'Products' },
  fields: ['name', 'item_name', 'standard_rate'],
  limit: 500,
  offset: 0
});
```

**Conditional Operations:**
```javascript
// Use fnIf from language-common
fnIf(
  state => state.data.status === 'Draft',
  submitDocument('Sales Order', $.data.name)
);
```

**Error Handling:**
```javascript
try {
  const response = await frappeClient.db().createDoc(doctype, data);
  return composeNextState(state, response);
} catch (error) {
  console.error(`Error creating ${doctype}: ${error.message}`);
  throw error;  // Let job fail
}
```

### Development Workflow

1. Generate adaptor: `pnpm generate erpnext`
2. Install SDK: `cd packages/erpnext && pnpm install frappe-js-sdk`
3. Implement operations in `src/Adaptor.js`
4. Add comprehensive JSDoc comments
5. Write unit tests in `test/Adaptor.test.js`
6. Test with OpenFn CLI: `openfn tmp/job.js -ma erpnext -s tmp/state.json -o tmp/output.json`
7. Build: `pnpm build`
8. Run tests: `pnpm test`
9. Add logos to `assets/` directory
10. Create changeset: `pnpm changeset`

### Reference Resources

**ERPNext/Frappe:**
- Frappe JS SDK: https://github.com/The-Commit-Company/frappe-js-sdk
- ERPNext API Docs (unofficial): https://github.com/alyf-de/frappe_api-docs
- Frappe Framework Docs: https://frappeframework.com/docs
- ERPNext Docs: https://docs.erpnext.com/

**OpenFn:**
- Odoo Adaptor Reference: `packages/odoo/src/Adaptor.js`
- Common Package: `packages/common/src/Adaptor.js`

## Resources

- Wiki: https://github.com/OpenFn/adaptors/wiki
- Build Guide: https://github.com/OpenFn/adaptors/wiki/Build-a-new-Adaptor
- Best Practices: https://github.com/OpenFn/adaptors/wiki/Adaptor-Writing-Best-Practice-&-Common-Patterns
- Unit Testing: https://github.com/OpenFn/adaptors/wiki/Unit-Testing-Guide
- Testing Docs: https://github.com/OpenFn/adaptors/wiki/How-to-test-docs-changes
- Metadata: https://github.com/OpenFn/adaptors/wiki/Magic-Metadata
- Docs Site: https://docs.openfn.org
- Lightning: https://github.com/OpenFn/lightning
- CLI: https://github.com/openfn/kit
