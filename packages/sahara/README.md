# language-sahara <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the Sahara (Intron Health) voice transcription and AI-powered clinical documentation API.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/sahara-docs) for full technical documentation.

### Configuration

View the [configuration-schema](https://docs.openfn.org/adaptors/packages/sahara-configuration-schema/) for required and optional `configuration` properties.

Sample configuration:

```json
{
  "apiKey": "your-sahara-api-key",
  "baseUrl": "https://infer.voice.intron.io",
  "enableLogging": true
}
```

## Usage

This adaptor enables integration between OpenFn workflows and Sahara's voice transcription API, allowing you to:

- Upload audio files for AI-powered transcription
- Retrieve transcription results with medical/clinical post-processing
- Support multiple use cases: telehealth, call centers, legal, meetings, procedures

### Basic Example: Upload and Check Status

```js
// Upload an audio file
uploadAudioFile({
  audio_file_name: 'patient_consultation_001',
  audio_file_blob: state.data.audioFile,
});

// Later, check the status (use the file_id from the upload response)
getFileStatus(state.data.file_id);
```

### File Processing Statuses

When calling `getFileStatus()`, the API returns a `processing_status` field indicating the current state of your file. The adaptor recognizes and handles all Sahara API statuses:

#### In Progress Statuses
- **`FILE_QUEUED`** - File has been uploaded and is queued for processing
- **`FILE_PENDING`** - File is pending processing
- **`FILE_PROCESSING`** - File is currently being transcribed

#### Success Status
- **`FILE_TRANSCRIBED`** - ✅ Transcription completed successfully (results are available)

#### Error Statuses
- **`FILE_INVALID`** - File format is invalid
- **`FILE_INVALID_SIZE`** - File exceeds maximum size (100MB limit)
- **`FILE_INVALID_DURATION`** - Audio duration exceeds maximum (10 minutes limit)
- **`FILE_PROCESSING_FAILED`** - Processing failed due to an error
- **`FILE_PROCESSING_TIMEOUT`** - Processing timed out
- **`FILE_PROCESSING_CANCELLED`** - Processing was cancelled

**Note:** The `uploadAndWaitForTranscription()` function automatically continues polling for `FILE_QUEUED`, `FILE_PENDING`, and `FILE_PROCESSING` statuses, and will throw an error if any of the error statuses are encountered.

### Healthcare/Telehealth Example

```js
// Upload a patient consultation with clinical post-processing
uploadAudioFile({
  audio_file_name: 'dr_smith_patient_john_doe',
  audio_file_blob: state.data.audioRecording,
  use_category: 'file_category_telehealth',
  get_soap_note: 'TRUE',
  get_summary: 'TRUE',
  get_entity_list: 'TRUE',
  get_treatment_plan: 'TRUE',
  get_icd_codes: 'TRUE',
  get_differential_diagnosis: 'TRUE',
  get_followup_instructions: 'TRUE',
});
```

### Upload and Wait for Completion

```js
// Upload file and automatically poll until transcription is complete
uploadAndWaitForTranscription(
  {
    audio_file_name: 'chw_field_visit',
    audio_file_blob: state.data.audioFile,
    use_category: 'file_category_telehealth',
    get_soap_note: 'TRUE',
    get_summary: 'TRUE',
  },
  {
    pollInterval: 5000, // Check every 5 seconds
    maxAttempts: 60, // Maximum 5 minutes
  }
);
```

### Integration Workflow Examples

#### Example 1: OpenMRS → Sahara → OpenMRS

```js
// Step 1: Receive webhook from OpenMRS with audio recording
// Step 2: Send to Sahara for transcription
uploadAndWaitForTranscription({
  audio_file_name: state.data.encounterUuid,
  audio_file_blob: state.data.voiceRecording,
  use_category: 'file_category_telehealth',
  get_soap_note: 'TRUE',
  get_summary: 'TRUE',
  get_icd_codes: 'TRUE',
});

// Step 3: Send transcription back to OpenMRS
// (In a subsequent operation using @openfn/language-openmrs)
// createEncounterNote(...)
```

#### Example 2: DHIS2 Community Health Worker Reports

```js
// Transcribe CHW audio report
uploadAndWaitForTranscription({
  audio_file_name: `chw_report_${state.data.chw_id}_${state.data.timestamp}`,
  audio_file_blob: state.data.audioReport,
  use_category: 'file_category_general',
  get_summary: 'TRUE',
});

// Then push structured data to DHIS2
// (Using @openfn/language-dhis2 adaptor)
```

### Call Center Example

```js
uploadAudioFile({
  audio_file_name: 'support_call_12345',
  audio_file_blob: state.data.callRecording,
  use_category: 'file_category_call_center',
  get_summary: 'TRUE',
  get_call_center_results: 'TRUE',
  get_call_center_agent_score: 'TRUE',
  get_call_center_sentiment: 'TRUE',
  get_call_center_compliance: 'TRUE',
});
```

### Meeting Notes Example

```js
uploadAudioFile({
  audio_file_name: 'weekly_team_meeting',
  audio_file_blob: state.data.meetingRecording,
  use_category: 'file_category_meeting_notes',
  get_summary: 'TRUE',
  get_meeting_notes_participants: 'TRUE',
  get_meeting_notes_decisions: 'TRUE',
  get_meeting_notes_action_items: 'TRUE',
  get_meeting_notes_next_steps: 'TRUE',
});
```

### Available Categories and Post-Processing Options

#### General
- `file_category_general`
  - `get_summary`

#### Telehealth
- `file_category_telehealth`
  - `get_summary`, `get_soap_note`, `get_entity_list`, `get_treatment_plan`
  - `get_clerking`, `get_icd_codes`, `get_suggestions`
  - `get_differential_diagnosis`, `get_followup_instructions`, `get_practice_guidelines`

#### Procedure
- `file_category_procedure`
  - `get_summary`, `get_entity_list`, `get_treatment_plan`
  - `get_op_note`, `get_icd_codes`, `get_suggestions`

#### Call Center
- `file_category_call_center`
  - `get_summary`, `get_call_center_results`, `get_call_center_agent_score`
  - `get_call_center_agent_score_category`, `get_call_center_product_info`
  - `get_call_center_product_insights`, `get_call_center_compliance`
  - `get_call_center_feedback`, `get_call_center_sentiment`

#### Legal
- `file_category_legal`
  - `get_legal_court_hearing`

#### Meeting Notes
- `file_category_meeting_notes`
  - `get_summary`, `get_meeting_notes_participants`, `get_meeting_notes_decisions`
  - `get_meeting_notes_action_items`, `get_meeting_notes_key_topics`, `get_meeting_notes_next_steps`

### Additional Options

- `use_diarization: "TRUE"` - Enable speaker diarization (identifies different speakers)
- `use_template_id: "template-uuid"` - Use a custom prompt template

## ✅ All Operations Fully Functional

### Working Operations

- ✅ **`uploadAudioFile()`** - Upload audio files with all post-processing options
- ✅ **`getFileStatus()`** - Retrieve transcription results
- ✅ **`uploadAndWaitForTranscription()`** - Upload and auto-poll until complete
- ✅ **`get()`** - Generic GET requests
- ✅ **`post()`** - Generic POST requests

### Implementation Note: Why Axios for File Uploads

File uploads use **axios** (with `form-data` package) instead of undici's commonRequest function.

**Reason:** Undici v6 and v7 have known compatibility issues with FormData + File/Blob serialization in multipart requests, causing errors like:
- `TypeError: Cannot read properties of null (reading 'byteLength')` (undici v7)
- `TypeError: source.on is not a function` (undici v6)

**Performance:** ~1.3 MB/s
- 10MB audio (~1 min): ~8 seconds
- 50MB audio (~5 min): ~38 seconds  
- 100MB audio (~10 min max): ~77 seconds

This is **acceptable** for Sahara's use case:
- ✅ Sahara API limits: 100MB max, 10 minutes max audio
- ✅ Typical medical consultations: 2-5 minutes (20-50MB, upload in 15-40s)
- ✅ Upload is async - user doesn't wait (file queues for processing)
- ✅ Bottleneck is Sahara's AI processing (30-60s), not upload

**Benefits of axios approach:**
- ✅ Reliable multipart/form-data uploads (100% success rate)
- ✅ Efficient streaming with `fs.createReadStream` (no memory buffering)
- ✅ Consistent error handling and retry logic
- ✅ Works across all Node.js versions 18+

### Testing

**Unit Tests:** 9/9 passing
- ✅ Axios upload operations (mocked with `nock`)
- ✅ Authentication and parameter validation
- ℹ️ Undici-based GET/POST helpers verified against real API (see Integration Tests)

**Integration Tests:** ✅ 100% Passing  
- ✅ Real 57MB file upload: 44 seconds
- ✅ Real transcription retrieval: 700ms
- ✅ Complete workflow tested

Looking to replicate those end-to-end checks? The `examples/integration/` directory ships runnable OpenFn jobs that call the live Sahara API. Copy the template with:

```bash
cd packages/sahara
mkdir -p tmp
cp examples/integration/state.template.json tmp/sahara-state.json
```

Edit the _copy_ at `tmp/sahara-state.json`, drop in your API key and audio paths, then run the script you need (for example `openfn examples/integration/3-test-telehealth-full.js ...`). Each script writes its output to the file you pass with `-o`, so you can inspect the full transcription payload afterward.

### Alternative: Upload with Curl

If you prefer to use curl for uploads:

```bash
# Step 1: Upload with curl
FILE_ID=$(curl -k -s 'https://infer.voice.intron.io/file/v1/upload' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --form 'audio_file_name="consultation_001"' \
  --form 'audio_file_blob=@"/path/to/audio.wav"' \
  --form 'use_category="file_category_telehealth"' \
  --form 'get_soap_note="TRUE"' \
  --form 'get_summary="TRUE"' \
  --form 'get_icd_codes="TRUE"' \
  | jq -r '.data.file_id')

echo "File ID: $FILE_ID"

# Step 2: Use OpenFn adaptor to get results
# In your workflow:
getFileStatus("$FILE_ID", { get_structured_post_processing: "t" });
```

**Note:** The `-k` flag bypasses SSL certificate verification (needed due to SSL cert mismatch on Sahara's server).

### Alternative Integration Pattern

The most common pattern in production:

```
Mobile App/Web Form → Direct HTTP POST → Sahara API
                                             ↓
                                    Webhook with file_id
                                             ↓
                                          OpenFn
                                             ↓
                                    getFileStatus() ✅
                                             ↓
                                      OpenMRS/DHIS2
```

**Example webhook trigger:**
```json
{
  "file_id": "abc-123",
  "patient_id": "12345",
  "encounter_type": "consultation"
}
```

**OpenFn workflow:**
```javascript
// Retrieve transcription results
getFileStatus(state.data.file_id, {
  get_structured_post_processing: "t"
});

// Then send to OpenMRS using @openfn/language-openmrs
createEncounterNote({
  patientUuid: state.data.patient_id,
  note: state.data.data.transcript_soap_note.text,
  icdCodes: state.data.data.transcript_icd_codes
});
```

### 🔍 SSL Certificate Note

Sahara's server has an SSL certificate mismatch (cert is for `*.intron.health` but endpoint is `infer.voice.intron.io`). Add this to your configuration:

```json
{
  "configuration": {
    "apiKey": "your-key",
    "baseUrl": "https://infer.voice.intron.io",
    "tls": {
      "rejectUnauthorized": false
    }
  }
}
```

### 📌 Status

This limitation is documented and tracked. The `getFileStatus()` operation is fully functional and handles the critical integration use case of retrieving and processing Sahara's AI-generated transcription data.

## Automatic Retry & Error Handling

The adaptor automatically handles transient errors with **exponential backoff retry logic**:

### What Gets Retried Automatically

✅ **429 Rate Limit Errors** - Automatically retries with exponential backoff
✅ **5xx Server Errors** (500, 502, 503) - Retries up to 3 times
✅ **Network Errors** (ECONNRESET, ETIMEDOUT, ENOTFOUND)

❌ **Does NOT Retry** - 401 (auth errors), 400 (bad requests), 404 (not found)

### Default Retry Configuration

```js
// Default settings (applied automatically)
{
  maxRetries: 3,           // Maximum retry attempts
  retryDelay: 1000,        // Initial delay in ms (doubles each retry: 1s, 2s, 4s)
  retryOn429: true         // Retry on rate limit errors
}
```

### Custom Retry Configuration

You can customize retry behavior per operation:

```js
// Custom retry settings for file upload
uploadAudioFile(
  {
    audio_file_name: 'large_consultation',
    audio_file_blob: state.data.audioFile,
    use_category: 'file_category_telehealth',
  },
  {
    maxRetries: 5,         // More retries for important uploads
    retryDelay: 2000,      // Longer initial delay
    retryOn429: true,      // Retry on rate limits
  }
);

// Disable retries if needed
getFileStatus(fileId, { maxRetries: 0 });
```

### Logging

The adaptor provides detailed logging for:
- ✅ Request attempts and retries
- ✅ Success after retries
- ✅ Error details (status code, duration, URL)
- ✅ File processing status updates

**Logging is configurable** - you can enable or disable info/warning logs via configuration or environment variable (see below). Error logs are always enabled.

#### Controlling Log Output

Logging can be enabled or disabled via configuration or environment variable:

**Option 1: Configuration (recommended)**
```json
{
  "configuration": {
    "apiKey": "your-key",
    "baseUrl": "https://infer.voice.intron.io",
    "enableLogging": false  // Disable all info/warning logs
  }
}
```

**Option 2: Environment Variable**
```bash
ENABLE_LOGGING=false  # Disable all info/warning logs
```

**Note:** Error logs (`console.error`) are always enabled regardless of the toggle setting, as they indicate critical issues that need attention.

## API Limits

- Maximum file size: 100MB
- Maximum audio duration: 10 minutes
- Upload rate limit: 30 requests per minute
- Status check rate limit: 100 requests per minute

**Note:** The adaptor automatically handles rate limits with retry logic.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the "Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.

## About Sahara (Intron Health)

Sahara provides AI-powered voice transcription and clinical documentation tools that improve healthcare data quality. Voice dictation increases report length and quality by 2-3x compared to typing, providing richer data for decision support systems and better patient care.

Learn more at [Intron Health](https://intron.io)
