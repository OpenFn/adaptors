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
---

## QA Job Code Generation (Post-Adaptor Build)

After building any adaptor (new or existing), you can generate comprehensive QA test jobs.

### When to Generate QA Code

User requests with phrases like:
- "Generate QA job code"
- "Create comprehensive tests"
- "Generate test jobs for this adaptor"
- "Create validation tests"

### QA Generation Process

1. **Analyze adaptor** - Identify all exported functions from the adaptor code
2. **Output QA PLAN** - Following template in `.github/prompts/qa-job-generation.md`
3. **Wait for APPROVED:**
4. **Generate test code** - Copy/paste ready for app.openfn.org

### Important: Platform-Specific Code

Generated QA code runs on **app.openfn.org** (not locally):
- ✅ No import statements (adaptors already available)
- ✅ Comma-chained operations: `operation1(), fn(state => {...}), operation2()`
- ✅ Configuration via platform UI (not in code)
- ✅ Results viewed in Inspector tab
- ✅ Copy/paste workflow

**See:** `.github/prompts/qa-job-generation.md` for complete template and instructions.

### Quick Example

**User:** "Generate QA tests for the FHIR adaptor"

**Your response:**
```
<<<QA PLAN>>>
Adaptor: @openfn/fhir
Functions: getPractitioners, getPractitioner, createPractitioner, updatePractitioner, deletePractitioner
Test coverage: 15 tests (5 positive, 7 negative, 3 edge cases)
Seed data: test-practitioner-001, test-practitioner-002
Configuration needed: { baseUrl, username, password }
<<<END QA PLAN>>>
```

Then wait for APPROVED: before generating the test code.

### QA Code Format

Generated code must:
- Start with instructions for app.openfn.org
- Use comma-chained operations (no imports)
- Include console.log validation after each test
- Use ✓/✗/⚠ indicators for results
- Include data seeding, tests, and cleanup
- Document required credential fields

**Do NOT:**
- Add import statements
- Use `then/catch` promise chains (use fn() instead)
- Reference local npm installation
- Include commands like `npm test` or `pnpm test`