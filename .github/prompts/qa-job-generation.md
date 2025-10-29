# QA Job Code Generation for OpenFn Adaptors

Generate comprehensive Quality Assurance job code to validate adaptor functionality on **app.openfn.org**.

**Usage:** After an adaptor is built (new or existing), generate test job code that users can copy/paste into the OpenFn platform.

---

## How Tests Run

- **Platform:** app.openfn.org (no local installation needed)
- **Adaptor:** Already available on the platform
- **Workflow:** User copies generated code → pastes into OpenFn workflow → runs tests
- **Documentation:** https://docs.openfn.org/documentation/build/workflows

---

## Prerequisites

Before generating QA code, you must have:
1. ✅ Adaptor code available (new or existing)
2. ✅ List of all exported functions
3. ✅ Test system URL/endpoint
4. ✅ Authentication credentials format
5. ✅ API documentation or endpoint details

---

## QA Generation Workflow

### Step 1: Analyze Adaptor

Identify from the adaptor code:
- All exported functions
- Authentication method
- HTTP methods used (GET, POST, PUT, DELETE, PATCH)
- Resource types handled
- Required configuration fields

---

### Step 2: Output QA PLAN

Always output this FIRST, then STOP:
```
<<<QA PLAN>>>
Adaptor: @openfn/<name>
Version: <if known>
Test System URL: <base URL>
Authentication: <method>

Exported Functions:
1. <functionName> - <HTTP method> - <endpoint pattern>
2. <functionName> - <HTTP method> - <endpoint pattern>
[... list all]

Test Coverage Plan:
- Authentication tests: <count>
- Positive scenarios: <count>
- Negative scenarios: <count>
- Edge cases: <count>
- Total tests: <sum>

Seed Data Required:
- <Resource 1>: test-<resource>-001, test-<resource>-002
- <Resource 2>: test-<resource>-001
[... list all with predictable IDs]

Configuration Needed:
{
  "baseUrl": "<URL>",
  "username": "test-user",
  "password": "******",
  // ... other fields
}

Questions/Clarifications:
- <any unknowns>
OR "None - ready to generate"

<<<END QA PLAN>>>
```

**STOP and wait for "APPROVED:" before generating code.**

---

### Step 3: Generate QA Job Code

After approval, generate OpenFn job expression code following this template:
```javascript
/**
 * ═══════════════════════════════════════════════════════════
 * QA TEST JOB FOR @openfn/<adaptor-name>
 * ═══════════════════════════════════════════════════════════
 * 
 * INSTRUCTIONS:
 * 1. Go to app.openfn.org
 * 2. Create a new workflow or use existing one
 * 3. Add a new step with adaptor: @openfn/<adaptor-name>@<version>
 * 4. Copy this entire code block
 * 5. Paste into the step editor
 * 6. Update configuration with your credentials (see below)
 * 7. Run the workflow
 * 8. Check Inspector for test results
 * 
 * CONFIGURATION REQUIRED:
 * Add this to your credential in app.openfn.org:
 * {
 *   "baseUrl": "https://your-test-system.com",
 *   "username": "your-test-username",
 *   "password": "your-test-password"
 *   // ... add other required fields
 * }
 * 
 * TEST INDICATORS:
 * ✓ = Test passed
 * ✗ = Test failed  
 * ⚠ = Warning/manual review needed
 * 
 * Generated: <YYYY-MM-DD>
 * Test System: <URL>
 * Total Tests: <count>
 * ═══════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════
// SECTION 1: DATA SEEDING
// ═══════════════════════════════════════════════════════════
// Create test data with predictable IDs for subsequent tests

// SEED 1: Create test <resource>
// Expected: 201 Created with id=test-<resource>-001
<createFunction>({
  id: 'test-<resource>-001',
  <field1>: '<test-value>',
  <field2>: '<test-value>',
  // ... complete valid resource
}),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('SEED 1: Create test <resource>');
  console.log('Expected: 201 Created');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  console.log('Status:', response.status || response.statusCode);
  console.log('Created ID:', response.data?.id || response.id);
  
  if ((response.status === 201 || response.statusCode === 201) && response.data?.id) {
    console.log('✓ SEED 1 PASSED: Test <resource> created');
  } else {
    console.log('✗ SEED 1 FAILED: Expected 201 with ID');
  }
  console.log('\n');
  return state;
}),

// SEED 2: Create second test <resource> for pagination tests
// Expected: 201 Created with id=test-<resource>-002
<createFunction>({
  id: 'test-<resource>-002',
  <field1>: '<test-value>',
  // ... complete valid resource
}),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('SEED 2: Create second test <resource>');
  console.log('Expected: 201 Created');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  console.log('Status:', response.status || response.statusCode);
  console.log('Created ID:', response.data?.id || response.id);
  
  if (response.status === 201 || response.statusCode === 201) {
    console.log('✓ SEED 2 PASSED');
  } else {
    console.log('✗ SEED 2 FAILED');
  }
  console.log('\n');
  return state;
}),

// ═══════════════════════════════════════════════════════════
// SECTION 2: AUTHENTICATION TESTS
// ═══════════════════════════════════════════════════════════

fn(state => {
  console.log('\n═══════════════════════════════════════════');
  console.log('AUTHENTICATION TESTS');
  console.log('═══════════════════════════════════════════\n');
  return state;
}),

// Note: Authentication typically happens automatically via configuration
// Test by making a request that requires auth

// ═══════════════════════════════════════════════════════════
// SECTION 3: GET OPERATIONS (READ)
// ═══════════════════════════════════════════════════════════

fn(state => {
  console.log('\n═══════════════════════════════════════════');
  console.log('GET OPERATIONS (READ)');
  console.log('═══════════════════════════════════════════\n');
  return state;
}),

// TEST 1: Get all <resources> (positive scenario)
// Expected Response: 200 OK
// Expected Result: Array or Bundle of resources
// Expected Fields: { data: [...], total }
<getAllFunction>(),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 1: Get All <Resources> (Positive)');
  console.log('Expected: 200 OK with results array');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  const results = response.data?.entry || response.data || [];
  
  console.log('Status:', response.status || response.statusCode);
  console.log('Result count:', results.length);
  console.log('Total:', response.data?.total);
  
  if ((response.status === 200 || response.statusCode === 200) && results.length > 0) {
    console.log('✓ TEST 1 PASSED: Retrieved resources successfully');
  } else if (response.status === 200 && results.length === 0) {
    console.log('⚠ TEST 1 WARNING: 200 OK but empty results');
  } else {
    console.log('✗ TEST 1 FAILED: Expected 200 with results');
  }
  console.log('\n');
  return state;
}),

// TEST 2: Get single <resource> by ID (positive scenario)
// Expected Response: 200 OK
// Expected Result: Single resource object
// Expected Fields: { id: 'test-<resource>-001', <key-fields> }
<getByIdFunction>('test-<resource>-001'),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 2: Get <Resource> by ID (Positive)');
  console.log('Expected: 200 OK with matching ID');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  console.log('Status:', response.status || response.statusCode);
  console.log('ID:', response.data?.id);
  console.log('<Key Field>:', response.data?.<keyField>);
  
  if ((response.status === 200 || response.statusCode === 200) && response.data?.id === 'test-<resource>-001') {
    console.log('✓ TEST 2 PASSED: Retrieved correct resource');
  } else {
    console.log('✗ TEST 2 FAILED: Expected 200 with matching ID');
  }
  console.log('\n');
  return state;
}),

// TEST 3: Get non-existent resource (negative scenario)
// Expected Response: 404 Not Found
// Expected Result: Resource not found error
<getByIdFunction>('non-existent-id-999'),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 3: Get Non-existent Resource (Negative)');
  console.log('Expected: 404 Not Found');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  const error = state.error || response;
  
  if (error?.statusCode === 404 || error?.status === 404) {
    console.log('Status:', error.statusCode || error.status);
    console.log('✓ TEST 3 PASSED: Correctly returned 404');
  } else if (response?.status === 200) {
    console.log('✗ TEST 3 FAILED: Should have returned 404, got 200');
  } else {
    console.log('Status:', error?.statusCode || error?.status || response?.status);
    console.log('⚠ TEST 3 WARNING: Unexpected status');
  }
  console.log('\n');
  
  // Clear error to continue
  delete state.error;
  return state;
}),

// TEST 4: Get with query filters (edge case)
// Expected Response: 200 OK
// Expected Result: Filtered results matching criteria
<getAllFunction>({ <filterField>: '<filter-value>' }),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 4: Query with Filters (Edge Case)');
  console.log('Expected: 200 OK with filtered results');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  const results = response.data?.entry || response.data || [];
  
  console.log('Status:', response.status || response.statusCode);
  console.log('Filtered results:', results.length);
  
  if (response.status === 200 || response.statusCode === 200) {
    console.log('✓ TEST 4 PASSED: Query executed successfully');
  } else {
    console.log('✗ TEST 4 FAILED: Expected 200');
  }
  console.log('\n');
  return state;
}),

// TEST 5: Empty result set (edge case)
// Expected Response: 200 OK
// Expected Result: Empty array or bundle
// Expected Fields: { data: [], total: 0 }
<getAllFunction>({ <filterField>: 'NonExistentValue12345' }),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 5: Empty Results (Edge Case)');
  console.log('Expected: 200 OK with empty results');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  const results = response.data?.entry || response.data || [];
  const total = response.data?.total ?? results.length;
  
  console.log('Status:', response.status || response.statusCode);
  console.log('Result count:', results.length);
  console.log('Total:', total);
  
  if ((response.status === 200 || response.statusCode === 200) && total === 0) {
    console.log('✓ TEST 5 PASSED: Correctly returned empty results');
  } else {
    console.log('⚠ TEST 5 WARNING: Check empty results handling');
  }
  console.log('\n');
  return state;
}),

// ═══════════════════════════════════════════════════════════
// SECTION 4: POST OPERATIONS (CREATE)
// ═══════════════════════════════════════════════════════════

fn(state => {
  console.log('\n═══════════════════════════════════════════');
  console.log('POST OPERATIONS (CREATE)');
  console.log('═══════════════════════════════════════════\n');
  return state;
}),

// TEST 6: Create valid <resource> (positive scenario)
// Expected Response: 201 Created
// Expected Result: New resource with server-assigned ID
// Expected Fields: { id, <required-fields> }
<createFunction>({
  <field1>: '<valid-value>',
  <field2>: '<valid-value>',
  // ... complete valid resource
}),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 6: Create Valid <Resource> (Positive)');
  console.log('Expected: 201 Created with ID');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  console.log('Status:', response.status || response.statusCode);
  console.log('Created ID:', response.data?.id);
  console.log('<Key Field>:', response.data?.<keyField>);
  
  if ((response.status === 201 || response.statusCode === 201) && response.data?.id) {
    console.log('✓ TEST 6 PASSED: Resource created successfully');
    // Store ID for update/delete tests
    state.createdResourceId = response.data.id;
  } else {
    console.log('✗ TEST 6 FAILED: Expected 201 with ID');
  }
  console.log('\n');
  return state;
}),

// TEST 7: Create with missing required fields (negative scenario)
// Expected Response: 400 Bad Request
// Expected Result: Validation error
<createFunction>({
  <field1>: '<value>'
  // Missing required fields
}),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 7: Missing Required Fields (Negative)');
  console.log('Expected: 400 Bad Request');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  const error = state.error || response;
  
  if (error?.statusCode === 400 || error?.status === 400) {
    console.log('Status:', error.statusCode || error.status);
    console.log('✓ TEST 7 PASSED: Correctly validated missing fields');
  } else {
    console.log('Status:', error?.statusCode || error?.status || response?.status);
    console.log('✗ TEST 7 FAILED: Expected 400 validation error');
  }
  console.log('\n');
  
  delete state.error;
  return state;
}),

// TEST 8: Create with invalid data type (negative scenario)
// Expected Response: 400 Bad Request
// Expected Result: Type validation error
<createFunction>({
  <field1>: 'should-be-array-not-string', // Wrong type
  <field2>: '<valid-value>'
}),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 8: Invalid Data Type (Negative)');
  console.log('Expected: 400 Bad Request');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  const error = state.error || response;
  
  if (error?.statusCode === 400 || error?.status === 400) {
    console.log('Status:', error.statusCode || error.status);
    console.log('✓ TEST 8 PASSED: Correctly validated data types');
  } else {
    console.log('Status:', error?.statusCode || error?.status || response?.status);
    console.log('⚠ TEST 8 WARNING: Expected 400 validation error');
  }
  console.log('\n');
  
  delete state.error;
  return state;
}),

// ═══════════════════════════════════════════════════════════
// SECTION 5: PUT/PATCH OPERATIONS (UPDATE)
// ═══════════════════════════════════════════════════════════

fn(state => {
  console.log('\n═══════════════════════════════════════════');
  console.log('PUT/PATCH OPERATIONS (UPDATE)');
  console.log('═══════════════════════════════════════════\n');
  return state;
}),

// TEST 9: Update existing resource (positive scenario)
// Expected Response: 200 OK
// Expected Result: Updated resource with same ID
<updateFunction>('test-<resource>-001', {
  <field1>: '<updated-value>',
  <field2>: '<updated-value>',
  // ... complete updated resource
}),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 9: Update Existing Resource (Positive)');
  console.log('Expected: 200 OK with updated fields');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  console.log('Status:', response.status || response.statusCode);
  console.log('ID:', response.data?.id);
  console.log('Updated <field>:', response.data?.<field>);
  
  if ((response.status === 200 || response.statusCode === 200) && response.data?.id === 'test-<resource>-001') {
    console.log('✓ TEST 9 PASSED: Resource updated successfully');
  } else {
    console.log('✗ TEST 9 FAILED: Expected 200 with same ID');
  }
  console.log('\n');
  return state;
}),

// TEST 10: Update non-existent resource (negative scenario)
// Expected Response: 404 Not Found
// Expected Result: Resource not found error
<updateFunction>('non-existent-999', {
  <field1>: '<value>'
}),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 10: Update Non-existent (Negative)');
  console.log('Expected: 404 Not Found');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  const error = state.error || response;
  
  if (error?.statusCode === 404 || error?.status === 404) {
    console.log('Status:', error.statusCode || error.status);
    console.log('✓ TEST 10 PASSED: Correctly returned 404');
  } else {
    console.log('Status:', error?.statusCode || error?.status || response?.status);
    console.log('✗ TEST 10 FAILED: Expected 404');
  }
  console.log('\n');
  
  delete state.error;
  return state;
}),

// ═══════════════════════════════════════════════════════════
// SECTION 6: DELETE OPERATIONS
// ═══════════════════════════════════════════════════════════

fn(state => {
  console.log('\n═══════════════════════════════════════════');
  console.log('DELETE OPERATIONS');
  console.log('═══════════════════════════════════════════\n');
  return state;
}),

// TEST 11: Delete existing resource (positive scenario)
// Expected Response: 204 No Content or 200 OK
// Expected Result: Resource successfully deleted
<deleteFunction>('test-<resource>-001'),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 11: Delete Existing Resource (Positive)');
  console.log('Expected: 204 No Content or 200 OK');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  const status = response.status || response.statusCode;
  
  console.log('Status:', status);
  
  if (status === 204 || status === 200) {
    console.log('✓ TEST 11 PASSED: Resource deleted successfully');
  } else {
    console.log('✗ TEST 11 FAILED: Expected 204 or 200, got', status);
  }
  console.log('\n');
  return state;
}),

// TEST 12: Delete non-existent resource (negative scenario)
// Expected Response: 404 Not Found
// Expected Result: Resource not found error
<deleteFunction>('non-existent-999'),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 12: Delete Non-existent (Negative)');
  console.log('Expected: 404 Not Found');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  const error = state.error || response;
  
  if (error?.statusCode === 404 || error?.status === 404) {
    console.log('Status:', error.statusCode || error.status);
    console.log('✓ TEST 12 PASSED: Correctly returned 404');
  } else {
    console.log('Status:', error?.statusCode || error?.status || response?.status);
    console.log('⚠ TEST 12 WARNING: Expected 404');
  }
  console.log('\n');
  
  delete state.error;
  return state;
}),

// TEST 13: Delete already-deleted resource (edge case)
// Expected Response: 404 Not Found or 410 Gone
// Expected Result: Resource no longer exists
<deleteFunction>('test-<resource>-001'),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 13: Delete Already Deleted (Edge Case)');
  console.log('Expected: 404 Not Found or 410 Gone');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  const error = state.error || response;
  const status = error?.statusCode || error?.status || response?.status;
  
  console.log('Status:', status);
  
  if (status === 404 || status === 410) {
    console.log('✓ TEST 13 PASSED: Correctly handled already-deleted resource');
  } else if (status === 200 || status === 204) {
    console.log('⚠ TEST 13 WARNING: Delete succeeded on already-deleted resource');
  } else {
    console.log('⚠ TEST 13 WARNING: Unexpected status');
  }
  console.log('\n');
  
  delete state.error;
  return state;
}),

// ═══════════════════════════════════════════════════════════
// SECTION 7: PAGINATION TESTS (if applicable)
// ═══════════════════════════════════════════════════════════

fn(state => {
  console.log('\n═══════════════════════════════════════════');
  console.log('PAGINATION TESTS');
  console.log('═══════════════════════════════════════════\n');
  return state;
}),

// TEST 14: Pagination - first page (edge case)
// Expected Response: 200 OK
// Expected Result: Bundle with pagination links
<getAllFunction>({ _count: 10, _offset: 0 }),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 14: Pagination First Page (Edge Case)');
  console.log('Expected: 200 OK with next link');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  const results = response.data?.entry || response.data || [];
  const hasNextLink = response.data?.link?.find(l => l.relation === 'next');
  
  console.log('Status:', response.status || response.statusCode);
  console.log('Page size:', results.length);
  console.log('Has next link:', !!hasNextLink);
  
  if ((response.status === 200 || response.statusCode === 200) && results.length > 0) {
    console.log('✓ TEST 14 PASSED: Pagination working');
  } else {
    console.log('⚠ TEST 14 WARNING: Check pagination support');
  }
  console.log('\n');
  return state;
}),

// TEST 15: Pagination - invalid offset (negative scenario)
// Expected Response: 400 Bad Request
// Expected Result: Invalid parameter error
<getAllFunction>({ _count: 10, _offset: -1 }),

fn(state => {
  console.log('─────────────────────────────────────────');
  console.log('TEST 15: Invalid Pagination Offset (Negative)');
  console.log('Expected: 400 Bad Request');
  console.log('─────────────────────────────────────────');
  
  const response = state.data;
  const error = state.error || response;
  const status = error?.statusCode || error?.status || response?.status;
  
  console.log('Status:', status);
  
  if (status === 400) {
    console.log('✓ TEST 15 PASSED: Correctly validated pagination parameters');
  } else if (status === 200) {
    console.log('⚠ TEST 15 WARNING: Invalid offset accepted (should validate)');
  } else {
    console.log('⚠ TEST 15 WARNING: Unexpected status');
  }
  console.log('\n');
  
  delete state.error;
  return state;
}),

// ═══════════════════════════════════════════════════════════
// SECTION 8: CLEANUP
// ═══════════════════════════════════════════════════════════

fn(state => {
  console.log('\n═══════════════════════════════════════════');
  console.log('CLEANUP: Removing test data');
  console.log('═══════════════════════════════════════════\n');
  return state;
}),

// CLEANUP 1: Delete test-<resource>-002
<deleteFunction>('test-<resource>-002'),

fn(state => {
  console.log('Deleting test-<resource>-002...');
  const response = state.data;
  const error = state.error;
  
  if (!error && (response?.status === 204 || response?.status === 200 || response?.statusCode === 204 || response?.statusCode === 200)) {
    console.log('✓ Deleted test-<resource>-002');
  } else {
    console.log('⚠ Could not delete test-<resource>-002 (may already be deleted)');
  }
  
  delete state.error;
  return state;
}),

// CLEANUP 2: Delete dynamically created resource (from TEST 6)
fn(state => {
  if (state.createdResourceId) {
    console.log('Deleting dynamically created resource:', state.createdResourceId);
    state.resourceToDelete = state.createdResourceId;
  }
  return state;
}),

// Only run delete if we have a resource to delete
fn(state => state.resourceToDelete ? state : state),
<deleteFunction>(state => state.resourceToDelete),

fn(state => {
  if (state.resourceToDelete) {
    const response = state.data;
    const error = state.error;
    
    if (!error && (response?.status === 204 || response?.status === 200 || response?.statusCode === 204 || response?.statusCode === 200)) {
      console.log('✓ Deleted', state.resourceToDelete);
    } else {
      console.log('⚠ Could not delete', state.resourceToDelete);
    }
    
    delete state.error;
    delete state.resourceToDelete;
  }
  return state;
}),

// ═══════════════════════════════════════════════════════════
// TEST SUMMARY
// ═══════════════════════════════════════════════════════════

fn(state => {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════╗');
  console.log('║         QA TEST JOB COMPLETED                     ║');
  console.log('╚═══════════════════════════════════════════════════╝');
  console.log('');
  console.log('Review the Inspector output above for test results:');
  console.log('  ✓ = Test passed');
  console.log('  ✗ = Test failed');
  console.log('  ⚠ = Warning / Manual review needed');
  console.log('');
  console.log('Test Categories Covered:');
  console.log('  • Data Seeding (predictable test IDs)');
  console.log('  • GET operations (retrieve all/single/filtered)');
  console.log('  • POST operations (create valid/invalid)');
  console.log('  • PUT/PATCH operations (update existing/non-existent)');
  console.log('  • DELETE operations (delete existing/non-existent)');
  console.log('  • Pagination (first page/invalid offset)');
  console.log('  • Edge cases and error scenarios');
  console.log('');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Adaptor: @openfn/<adaptor-name>');
  console.log('═══════════════════════════════════════════════════');
  console.log('');
  
  return state;
})
```

---

## Key Differences for app.openfn.org

### 1. **No Import Statements**
- Adaptors are already available on the platform
- Functions are accessed directly without imports
- No need for `import { function } from '@openfn/adaptor'`

### 2. **Function Chaining with Commas**
- Operations are chained with commas: `operation1(), operation2(), operation3()`
- Each operation followed by `fn(state => {...})` for validation
- Platform handles the execution flow

### 3. **Configuration via Platform**
- Credentials configured in app.openfn.org UI
- No need to specify config in code
- Code references `state.configuration` automatically

### 4. **Error Handling**
- Errors available in `state.error`
- Use `fn()` to check both success (`state.data`) and error (`state.error`)
- Clear errors with `delete state.error` to continue

### 5. **Inspector Output**
- All `console.log()` appears in Inspector
- Users review results there, not in terminal
- Visual indicators (✓/✗/⚠) work well in Inspector

---

## Usage Instructions Template

Always include these instructions at the top of generated code:
```javascript
/**
 * INSTRUCTIONS FOR app.openfn.org:
 * 
 * 1. Go to app.openfn.org and log in
 * 2. Navigate to your project
 * 3. Create a new workflow or edit existing
 * 4. Add a step with adaptor: @openfn/<adaptor-name>@latest
 * 5. In the step editor, paste this entire code block
 * 6. Configure credential with required fields:
 *    - Go to Settings → Credentials
 *    - Create/edit credential for this adaptor
 *    - Add: baseUrl, username, password, etc.
 * 7. Attach the credential to this step
 * 8. Click "Run" to execute tests
 * 9. Check the Inspector tab for test results
 * 10. Look for ✓ (passed), ✗ (failed), ⚠ (warning)
 * 
 * CREDENTIAL FORMAT:
 * {
 *   "baseUrl": "https://your-test-system.com",
 *   "username": "test-user",
 *   "password": "your-password"
 * }
 */
```

---

## Test Coverage Requirements (Same as Before)

- Authentication tests
- GET operations (all/single/non-existent/filtered/empty)
- POST operations (valid/missing fields/invalid types)
- PUT/PATCH operations (update existing/non-existent)
- DELETE operations (existing/non-existent/already-deleted)
- Pagination tests (if applicable)
- Edge cases specific to the API

---

## Checklist Before Generating

- [ ] All exported functions identified
- [ ] Authentication method understood
- [ ] Test system URL available
- [ ] Required credential fields documented
- [ ] Resource types and fields identified
- [ ] Pagination approach known (if applicable)
- [ ] Error response formats documented
- [ ] **Adaptor available on app.openfn.org** (published)

---

## Example Output File

Save as: `qa-test-<adaptor-name>.js`

Provide to user with instructions to copy/paste into app.openfn.org