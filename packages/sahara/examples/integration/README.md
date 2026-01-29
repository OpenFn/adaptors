# Sahara Adaptor – Integration Scripts

These jobs call the live Sahara API to exercise file uploads, polling, and the category-specific post-processing options. Use them when you want to validate the adaptor end to end with your own credentials and audio samples.

## Before You Run Anything

1. **Create a local state file (ignored by git).**
   ```bash
   cd /Users/mac/Documents/OpenFn/adaptors/packages/sahara
   mkdir -p tmp
   cp examples/integration/state.template.json tmp/sahara-state.json
   ```
   Edit _the copy_ at `tmp/sahara-state.json` (not the template) and replace `YOUR_SAHARA_API_KEY` with your real key. Keep this file in `tmp/` so that credentials never get committed.

2. **Point each script at real audio.**  
   Update the `audio_file_blob` section in the script you plan to run. You can supply a local path (`path: "/absolute/path/to/audio.m4a"`) or a URL. Sahara accepts WAV, MP3, and M4A up to 100 MB (~10 minutes).

3. **Optional:** Create an outputs folder (`mkdir -p tmp/sahara-outputs`) if you want to keep result files separate.

## Running a Script

```bash
cd /Users/mac/Documents/OpenFn/adaptors/packages/sahara

# Jobs that only upload (about 1–2 minutes). Make sure -s points at the file you just edited.
openfn examples/integration/1-test-basic-upload.js \
  -ma sahara \
  -s tmp/sahara-state.json \
  -o tmp/sahara-outputs/1-basic-upload.json

# Jobs that poll until transcription completes often need a longer timeout
openfn examples/integration/3-test-telehealth-full.js \
  -ma sahara \
  -s tmp/sahara-state.json \
  -o tmp/sahara-outputs/3-telehealth.json \
  --timeout 1200000   # 20 minutes
```

Every script writes the final `state` object to the output file you pass with `-o`. Use `jq` (or your favourite JSON viewer) to inspect it:

```bash
jq . tmp/sahara-outputs/3-telehealth.json
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

### Two-Step vs One-Step

- **Two-step flow**: Run `1-test-basic-upload.js`, capture the `file_id` from its output, then plug that into `2-test-file-status.js` to poll manually.
- **One-step flow (recommended)**: Use any of the scripts that call `uploadAndWaitForTranscription` (`3`–`8`). They upload, poll every few seconds, and stop as soon as `processing_status` becomes `FILE_TRANSCRIBED`.

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

- **401 Unauthorized**: Double-check the API key in `tmp/sahara-state.json`.
- **413 File too large**: Trim the recording or compress it; Sahara caps uploads at 100 MB.
- **429 Rate limit**: The adaptor already retries with backoff—watch the console logs to confirm.
- **Polling stops early**: Increase the CLI timeout (for example `--timeout 1800000` for 30 minutes).

## Need More Context?

- Main adaptor docs: `packages/sahara/README.md`
- Unit-test overview: `packages/sahara/test/README.md`
- Sahara product docs: https://infer.voice.intron.io/docs

Happy testing!

