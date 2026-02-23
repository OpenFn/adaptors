# language-ibipimo <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the IBIPIMO
laboratory system API.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/ibipimo-docs) for
full technical documentation.

## Overview

The IBIPIMO adaptor allows you to interact with the IBIPIMO laboratory system
to:

- Post viral load test requests
- Retrieve viral load test results
- And do other get and post request to IBIPIMO

## Authentication

This adaptor uses **Bearer token authentication**. You need to provide:

- `baseUrl`: The base URL of the IBIPIMO API server (e.g.,
  `https://demo.ibipimo.org`)
- `apiToken`: Your IBIPIMO API access token

### Configuration

All required and optional properties for state.configuration are defined in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/ibipimo-configuration-schema).

Example configuration:

```json
{
  "baseUrl": "https://demo.ibipimo.org",
  "apiToken": "your_access_token_here"
}
```

## Usage Examples

### Post Viral Load Request

Post a new viral load test request to the IBIPIMO system:

```js
postViralLoadRequest({
  siteid: '77889900',
  samples: [
    {
      sidainfo_uid: '147460',
      p_code: '000003',
      p_name: 'Magara',
      p_prename: 'Mahire',
      p_sex: 'M',
      p_dob: '1950-01-15',
      p_telephone: '79932635',
      female_status: 'na',
      colline: null,
      arv_start_date: '2006-09-21',
      p_stade_clinique: '4',
      p_ligne_therap: '1',
      reason_vl: 'suspicion_echec',
      on_arv: '1',
      sample_type: null,
      date_blood_taken: '2024-04-15 11:49:00',
      place_blood_taken: 'CDS Training',
      blood_taken_by: null,
      prescription_by: null,
      contact_sender: null,
      blood_received_by: '',
      province_id: '017BD',
      commune_id: '003BDI017001',
      arv_combination_id: 'TDF(300)/3TC(300)/DTG(50)',
      date_last_vl: null,
      last_vl_copies: '-1',
      site: '77889900',
      dateprelevement: '2024-04-15',
      sidainfo_siteid: '77889900',
      hf_district: null,
      hf_province: null,
    },
  ],
});
```

**Success Response (201):**

```json
{
  "data": {
    "errors": [],
    "saved_viral_load_samples": [
      {
        "id": 830139,
        "s_uid": "634W",
        "siteid": "22222222",
        "codepatient": "000010",
        "date_prelevement": "15/04/2024 11:49:00",
        "updated_at": "2026-02-18 12:52:51"
      }
    ]
  },
  "references": [{}],
  "response": {
    "url": "https://demo.ibipimo.org/api/v1/post-viral-load-requests",
    "method": "POST",
    "statusCode": 201,
    "statusMessage": "Created",
    "headers": {
      "date": "Fri, 20 Feb 2026 15:12:40 GMT",
      "server": "Apache",
      "cache-control": "no-cache, private",
      "access-control-allow-origin": "*",
      "vary": "Authorization,User-Agent",
      "upgrade": "h2",
      "connection": "Upgrade, Keep-Alive",
      "keep-alive": "timeout=5, max=100",
      "transfer-encoding": "chunked",
      "content-type": "application/json"
    },
    "duration": 5555
  }
}
```

### Get Viral Load Results

Retrieve viral load test results by sample UIDs:

```js
getViralLoadResults({
  siteid: '77889900',
  sample_uids: ['2026010401', 'IBI-2024-000001'],
});
```

**Success Response (200):**

```json
{
  "data": {
    "siteid": "22222222",
    "results": [],
    "sample_statuses": {
      "634W": {
        "sample_uid": "634W",
        "request_found": true,
        "request_status": "not_processed",
        "request_mode": "api_sidainfo",
        "sidainfo_uid": "147460",
        "codelabo": null,
        "date_blood_taken": "15/04/2024 11:49:00",
        "date_blood_received": null,
        "created_at": "2026-02-18T12:52:51.000000Z",
        "updated_at": "2026-02-18T12:52:51.000000Z",
        "result_status": "not_available",
        "result_available": false,
        "no_result_reason_code": "sample_not_processed",
        "no_result_reason_message": "Sample request exists but has not been processed by the laboratory yet.",
        "latest_result_meta": null,
        "result": null
      }
    },
    "no_published_results": ["634W"],
    "no_results": ["634W"],
    "no_results_summary": {
      "sample_not_processed": {
        "count": 1,
        "sample_uids": ["634W"]
      }
    },
    "not_found_sample_uids": [],
    "total_requested": 1,
    "total_found": 0,
    "total_without_published_result": 1
  },
  "references": [{}],
  "response": {
    "url": "https://demo.ibipimo.org/api/v1/ask-for-vl-results",
    "method": "POST",
    "statusCode": 200,
    "statusMessage": "OK",
    "headers": {
      "date": "Fri, 20 Feb 2026 15:14:19 GMT",
      "server": "Apache",
      "cache-control": "no-cache, private",
      "access-control-allow-origin": "*",
      "vary": "Authorization,Accept-Encoding,User-Agent",
      "upgrade": "h2",
      "connection": "Upgrade, Keep-Alive",
      "keep-alive": "timeout=5, max=100",
      "transfer-encoding": "chunked",
      "content-type": "application/json"
    },
    "duration": 2760
  }
}
```

### Generic Post Request

Post data to any endpoint:

```js
post('/api/v1/your-endpoint', {
  siteid: '77889900',
  sample_uids: ['2026010401', 'IBI-2024-000001'],
});
```

### Generic Post Request

Get data from any endpoint:

```js
get('/api/v1/your-endpoint');
```

### Avanced processing

Handling post request response

```js
postViralLoadRequest(...);

processViralLoadSubmission((state, processSubmission) => {
  const submission = processSubmission(state.data);

  console.log('\n=== SUBMISSION RESULTS ===');
  console.log(`Saved samples: ${submission.savedCount}`);
  console.log(`Errors: ${submission.errorCount}`);

  if (submission.hasErrors) {
    console.log('\n--- Errors ---');
    submission.errors.forEach(error => {
      console.log(`- ${error}`);
    });
  }

  return {
    ...state,
    submissionResult: submission,
  };
});
```

Handling IBIPIMO returned results:

```js
getViralLoadResults(...);

processViralLoadResults((state, processResults) => {
  const processed = processResults(state.data);

  console.log('=== VIRAL LOAD RESULTS ===');
  console.log(`Requested result: ${processed.totalRequested}`);
  console.log(`Total found: ${processed.totalFound}`);
  console.log(`Total pending: ${processed.totalPending}`);
  console.log(`Available results: ${processed.availableResults.length}`);
  console.log(`Pending samples: ${processed.pendingSamples.length}`);

  return {
    ...state,
    processedResults: processed,
  };
});
```

## Error Handling

The adaptor handles various error responses:

- **400 Bad Request**: Validation failed or invalid format
- **401 Unauthorized**: Invalid or missing access token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: No results found for provided UIDs
- **409 Conflict**: Duplicate integration attempt
- **5xx Server Errors**: Server processing failed

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Go to the Adaptor project cd /packages/ibipimo

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.

## Installation and testing

### 1. Install dependencies

```bash
npm install
```

### 2. Local testing

#### tmp files

Create /tmp/state.json and /tmp/output.json files

```json
{
  "configuration": {
    "baseUrl": "https://demo.ibipimo.org",
    "apiToken": "your_api_token_here"
  },
  "data": {}
}
```

#### Test with OpenFn CLI (if installed)

```bash
# Install OpenFn CLI
npm install -g @openfn/cli

# Test individual jobs
openfn jobs/test-post-request.js -o tmp/output.json -s tmp/state.json
openfn jobs/test-get-results.js -o tmp/output.json -s tmp/state.json
openfn jobs/test-generic-post-request.js -o tmp/output.json -s tmp/state.json
openfn jobs/test-generic-get-request.js -o tmp/output.json -s tmp/state.json
openfn jobs/test-advanced-processing.js -o tmp/output.json -s tmp/state.json
```
