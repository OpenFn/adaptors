# GitHub Copilot Instructions for OpenFn Adaptors

⚠️ **CRITICAL DEFAULT RULE**  
If user does NOT specify operations: Create EXACTLY 1 function + 1 test.  
Do NOT infer or add endpoints.

---

## Workflow

1. **Read `./wiki/` first**
2. **Output PLAN** (see template below)
3. **Wait for "APPROVED:"** before generating code
4. **Generate code**
5. **Self-review** the diff against `./wiki/code-review.md` and fix what it
   finds before handing back

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
✓ Utils.js: request + helpers only
✓ Adaptor.js: request + operational functions
✓ index.js: exports every public function

Docs consulted:
- ./wiki/build-a-new-adaptor.md
- ./wiki/best-practice.md
- ./wiki/docs.md
- ./wiki/unit-test-guide.md

Questions: <or "None">
<<<END PLAN>>>
```

STOP and wait for "APPROVED:" before coding.

---

## File and Design Rules

`claude.md` at the repo root holds the full file invariants and design rules
for generated adaptors. Follow them. In short:

- `Utils.js` exports `request` plus helpers (`prepareNextState`, the
  pagination loop); no operational functions
- `Adaptor.js` exports `request` and all operational functions
- `index.js` exports every public function; tests and consumers import from it
- Required arguments are positional; everything optional goes in a trailing
  `options` object. No callbacks
- Generated files contain only code and JSDoc for the functions: no banner
  comments, invariant comments or commented-out code

---

## Testing

- At least one unit test per function exported from `index.js`, `request`
  included, using **Undici MockAgent**
- No live network calls
- Follow `./wiki/unit-test-guide.md`

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
✓ Utils.js: request + helpers only
✓ Adaptor.js: request + getData
✓ index.js: exports every public function

Docs consulted:
- ./wiki/build-a-new-adaptor.md
- ./wiki/best-practice.md
- ./wiki/docs.md
- ./wiki/unit-test-guide.md

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
4. **Generate test code** - Save to `packages/<adaptor-name>/tmp/qa-<adaptor-name>.js`

### Important: Platform-Specific Code

Generated QA code runs on **app.openfn.org** (not locally):
- ✅ No import statements (adaptors already available)
- ✅ Use promise chaining: `.then(state => {...}).catch((error, state) => {...})`
- ✅ Configuration via platform UI (not in code)
- ✅ Results viewed in Inspector tab
- ✅ Copy/paste ready workflow
- ✅ Save to adaptor's tmp directory: `packages/<adaptor-name>/tmp/qa-<adaptor-name>.js`

**See:** `.github/prompts/qa-job-generation.md` for complete template and instructions.

### Quick QA Example

**User:** "Generate QA tests for the FHIR adaptor"

**Your response:**
```
<<<QA PLAN>>>
Adaptor: @openfn/fhir
Functions: getPractitioners, getPractitioner, createPractitioner, updatePractitioner, deletePractitioner
Test coverage: 15 tests (5 positive, 7 negative, 3 edge cases)
Seed data: test-practitioner-001, test-practitioner-002
Configuration needed: { baseUrl, username, password }
Output file: packages/fhir/tmp/qa-fhir.js
<<<END QA PLAN>>>
```

Then wait for APPROVED: before generating the test code.

### QA Code Syntax Requirements

**Use promise chaining:**
```javascript
()
  .then(state => {
    console.log('✓ Test passed');
    return state;
  })
  .catch((error, state) => {
    console.log('✗ Test failed:', error.message);
    state.error = error;
    return state;
  });
```

**For negative tests (expecting errors):**
```javascript
()
  .then(state => {
    console.log('✗ Should have thrown error');
    return state;
  })
  .catch((error, state) => {
    if (error.statusCode === 404) {
      console.log('✓ Correctly returned 404');
    }
    delete state.error; // Clear to continue
    return state;
  });
```

### QA Code Format

Generated code must:
- Start with instructions for app.openfn.org
- Use `.then().catch()` promise chaining
- Include console.log validation after each test
- Use ✓/✗/⚠ indicators for results
- Include data seeding, tests, and cleanup
- Document required credential fields
- **Save to adaptor's tmp directory: `packages/<adaptor-name>/tmp/qa-<adaptor-name>.js`**

**Do NOT:**
- Add import statements
- Use local npm/pnpm commands
- Reference local installation
- Save to root directory or other locations outside the adaptor package