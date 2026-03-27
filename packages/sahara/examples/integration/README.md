# Sahara – Integration Scripts

Runnable jobs that call the live Sahara API (URL-based uploads, polling, categories). Use your own credentials and audio URLs.

## Setup

1. **Create a local state file** (from repo root):
   ```bash
   mkdir -p packages/sahara/tmp
   cp packages/sahara/examples/integration/state.template.json packages/sahara/tmp/sahara-state.json
   ```
   Edit _the copy_ at `packages/sahara/tmp/sahara-state.json` (not the template): replace `YOUR_SAHARA_API_KEY` with your real API key, and set the **URL** for each scenario you want to run. The state template has one key per script:
   - `signedUrlBasic` → 1-test-basic-upload.js
   - `signedUrlTelehealth` → 3-test-telehealth-full.js
   - `signedUrlDiarization` → 4-test-with-diarization.js
   - `signedUrlCallCenter` → 5-test-call-center.js
   - `signedUrlMeeting` → 6-test-meeting-notes.js
   - `signedUrlProcedure` → 7-test-procedure.js
   - `signedUrlLegal` → 8-test-legal.js
   Use signed HTTPS URLs. Supported formats include WAV, MP3, MP4, M4A, OGG, WebM, and FLAC (up to 100 MB, ~10 min).

2. Optional: `mkdir -p packages/sahara/tmp/sahara-outputs` for output files.

## Run

From repo root (so `-ma sahara` loads the local adaptor):

```bash
openfn packages/sahara/examples/integration/1-test-basic-upload.js \
  -ma sahara \
  -s packages/sahara/tmp/sahara-state.json \
  -o packages/sahara/tmp/sahara-outputs/1-basic-upload.json

# Jobs that poll until transcription completes often need a longer timeout
openfn packages/sahara/examples/integration/3-test-telehealth-full.js \
  -ma sahara \
  -s packages/sahara/tmp/sahara-state.json \
  -o packages/sahara/tmp/sahara-outputs/3-telehealth.json \
  --timeout 1200000
```

Output goes to the file passed with `-o`. Inspect with `jq`:

```bash
jq . packages/sahara/tmp/sahara-outputs/3-telehealth.json
```

## Script Catalog

| File | Focus | Typical Scenario |
| --- | --- | --- |
| `1-test-basic-upload.js` | Upload + summary | Smoke test / general |
| `2-test-file-status.js` | Poll a known `file_id` | Recheck previous uploads |
| `3-test-telehealth-full.js` | `uploadAndWaitForTranscription` with SOAP note | Telehealth consult |
| `4-test-with-diarization.js` | Multi-speaker diarization | Panel interview / group visit |
| `5-test-call-center.js` | Sentiment + agent scoring | Call centre QA |
| `6-test-meeting-notes.js` | Meeting action items | Team/board meetings |
| `7-test-procedure.js` | Operation note (`get_op_note`) | Surgical documentation |
| `8-test-legal.js` | Court hearing format | Legal / compliance reviews |
| `check-latest-upload.js` | Fetch most recent file | Handy when testing outside OpenFn |

- **Two-step**: Run script 1, get `file_id` from output, then run script 2 with that ID.
- **One-step**: Scripts 3–8 use `uploadAndWaitForTranscription` (upload + poll until `FILE_TRANSCRIBED`).

## Output Cheatsheet

- `data.file_id`: UUID returned immediately after a successful upload.
- `data.processing_status`: `QUEUED`, `PROCESSING`, or `FILE_TRANSCRIBED`.
- Category-specific fields:
  - Telehealth: `transcript_soap_note`, `transcript_icd_codes`, `transcript_treatment_plan`, etc.
  - Call centre: `transcript_call_center_*` metrics.
  - Meetings: `transcript_meeting_notes_*` sections.
  - Legal: `transcript_legal_court_hearing`.
  - Procedure: `transcript_op_note`.

## Troubleshooting

- **401**: Check API key in your state file.
- **413**: File over 100 MB; trim or compress.
- **429**: Adaptor retries with backoff.
- **Polling timeout**: Increase the CLI timeout (for example `--timeout 1800000` for 30 minutes).

See `packages/sahara/README.md` and [Sahara docs](https://docs.voice.intron.io).

