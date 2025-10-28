# GitHub Copilot Instructions for OpenFn Adaptors

⚠️ **CRITICAL DEFAULT RULE**  
If user does NOT specify operations: Create EXACTLY 1 function + 1 test.  
Do NOT infer or add endpoints.

---

## Workflow

1. **Read docs first**
2. **Output PLAN** (see template below)
3. **Wait for "APPROVED:"** before generating code
4. **Generate code** with doc references

---

## Plan Template

Always output this FIRST, then STOP:

```
<<<PLAN>>>
Adaptor: <name>
Endpoint(s): <list>
Functions: <N>
Tests: <N>

ONE-FUNCTION DEFAULT: <yes if N=1, no if N>1>

Invariants:
✓ Utils.js: request only (no operational functions)
✓ Adaptors.js: request + operational functions

Docs consulted:
- ./docs/build-a-new-adaptor.md
- ./docs/unit-testing-guide.md

Questions: <or "None">
<<<END PLAN>>>
```

STOP and wait for "APPROVED:" before coding.

---

## File Invariants (DO NOT BREAK)

### Utils.js

```javascript
/**
 * INVARIANT: Must export function named `request`
 * - Infrastructure/helpers ONLY
 * - NO operational functions here
 */
export function request(configuration, path, params, callback) { ... }
```

### Adaptors.js

```javascript
/**
 * INVARIANT: Must export function named `request`
 * - ALL operational functions go here
 */
export function request(method, path, body, options = {}){ ... }
export function getData(params) { ... }
```

---

## Testing

- Every function needs unit test with **Undici MockAgent**
- No live network calls
- Follow `./wiki/unit-testing-guide.md`

---

## Example

**User:** "Create adaptor for https://api.example.com/data"

**Your response:**

```
<<<PLAN>>>
Adaptor: example-api
Endpoint(s): GET https://api.example.com/data
Functions: 1 (getData)
Tests: 1

ONE-FUNCTION DEFAULT: yes

Invariants:
✓ Utils.js: request only
✓ Adaptors.js: request + getData

Docs consulted:
- ./docs/build-a-new-adaptor.md
- ./docs/unit-testing-guide.md

Questions: None
<<<END PLAN>>>
```

Then WAIT for "APPROVED:"

---

## Commands After Generation

```bash
cd packages/<name>
pnpm install            # Install dependencies
pnpm lint              # Check code style
pnpm test              # Run tests
pnpm build             # Build package
```
