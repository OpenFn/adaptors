# language-sahara <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for the Sahara (Intron Health) voice transcription and AI-powered clinical documentation API.

## Documentation

View the [docs site](https://docs.voice.intron.io) for full technical documentation.

### Configuration

See [configuration-schema.json](configuration-schema.json) for required and optional `configuration` properties.

```json
{
  "apiKey": "your-sahara-api-key",
  "baseUrl": "https://infer.voice.intron.io"
}
```

Optional URL validation (when using signed URLs for `audio_file_blob`): `validateUploadUrl`, `allowedUrlDomains`, `allowedUrlExtensions`, `requireExpiryParam`—see the schema.

For local testing with the integration examples, see [examples/integration/README.md](examples/integration/README.md). In production, configure credentials via the platform's credential management.

## Usage

- Upload audio **by URL** (e.g. signed S3 or SharePoint links) for transcription.
- Retrieve results with medical/clinical post-processing.
- Use cases: telehealth, call centers, legal, meetings, procedures.

### Audio input: URL only

**`audio_file_blob`** must be a **URL** (string or `{ url: "..." }`). File paths and Buffers are not supported (OpenFn/Lightning has no filesystem). Store audio in external storage, get a signed or public URL, and pass it in state (e.g. `state.data.signedUrl`). Optional URL validation: set `configuration.validateUploadUrl: true` (see schema).

### Basic example

```js
uploadAudioFile({
  audio_file_name: 'patient_consultation_001',
  audio_file_blob: state.data.signedUrl,
});

getFileStatus(state.data.file_id);
```

### File status

`getFileStatus()` returns a `processing_status` (e.g. `FILE_QUEUED`, `FILE_PROCESSING`, `FILE_TRANSCRIBED`, or error statuses). See the [Sahara API docs](https://docs.voice.intron.io) for the full list. `uploadAndWaitForTranscription()` polls until `FILE_TRANSCRIBED` or an error.

### Telehealth example

```js
uploadAudioFile({
  audio_file_name: 'dr_smith_patient_john_doe',
  audio_file_blob: state.data.signedUrl,
  use_category: 'file_category_telehealth',
  get_soap_note: 'TRUE',
  get_summary: 'TRUE',
  get_icd_codes: 'TRUE',
});
```

### Upload and wait

```js
uploadAndWaitForTranscription(
  {
    audio_file_name: 'chw_field_visit',
    audio_file_blob: state.data.signedUrl,
    use_category: 'file_category_telehealth',
    get_soap_note: 'TRUE',
    get_summary: 'TRUE',
  },
  { pollInterval: 5000, maxAttempts: 60 }
);
```

### Other categories

For call center or meeting notes, use `file_category_call_center` or `file_category_meeting_notes` with the corresponding `get_*` options. Categories include `file_category_general`, `file_category_telehealth`, `file_category_procedure`, `file_category_legal`. Optional: `use_diarization: 'TRUE'`, `use_template_id: 'template-uuid'`. See the [Sahara docs](https://docs.voice.intron.io) for the complete list.

### URL validation

When `configuration.validateUploadUrl` is `true`, the adaptor runs in-memory checks (HTTPS only, no IP/internal hosts, optional domain allowlist and extension hint). See [configuration-schema.json](configuration-schema.json).

## Operations

- **`uploadAudioFile()`** – Upload by URL with post-processing options
- **`getFileStatus()`** – Get transcription status and results
- **`uploadAndWaitForTranscription()`** – Upload and poll until complete
- **`get()`**, **`post()`** – Generic requests

Uploads use undici via language-common; `audio_file_blob` is sent as a URL and the Sahara backend fetches the file.

## Testing

Unit tests mock HTTP with `enableMockClient` (undici). Integration examples in [examples/integration/](examples/integration/) call the live API. From repo root:

```bash
openfn packages/sahara/examples/integration/1-test-basic-upload.js \
  -ma sahara \
  -s packages/sahara/tmp/sahara-state.json \
  -o packages/sahara/tmp/output.json
```

See [examples/integration/README.md](examples/integration/README.md) for state keys and script list.

### Webhook pattern

Common production flow: app POSTs audio to Sahara → Sahara webhook sends `file_id` to OpenFn → workflow calls `getFileStatus(state.data.file_id)` then sends results to OpenMRS/DHIS2.

## Retry and limits

The adaptor retries on 429 and 5xx with exponential backoff (default: 3 retries, 1s initial delay). Pass `maxRetries`, `retryDelay`, `retryOn429` in the options argument to customize. No retry on 401, 400, 404.

API limits: 100MB max file size, 10 minutes max duration, 60 uploads/min, 100 status checks/min.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Then: `pnpm build`, `pnpm test` (or `pnpm run test:watch`).

## About Sahara

Sahara (Intron Health) provides AI-powered voice transcription and clinical documentation. [Intron Health](https://intron.io)
