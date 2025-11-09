# @openfn/language-sahara

## 1.0.0 - 2025-01-04

### Added

- Initial release of Sahara (Intron Health) adaptor
- Bearer token authentication support
- **Automatic retry logic with exponential backoff** for rate limits, server errors, and network failures
- `uploadAudioFile()` operation for uploading audio files (uses axios for reliable FormData handling) ✅ **FULLY FUNCTIONAL**
- `getFileStatus()` operation for retrieving transcription results ✅ **FULLY FUNCTIONAL**
- `uploadAndWaitForTranscription()` operation for upload and polling until completion ✅ **FULLY FUNCTIONAL**
- Support for multiple file categories:
  - `file_category_general` - General transcription
  - `file_category_telehealth` - Healthcare/clinical documentation
  - `file_category_procedure` - Medical procedures
  - `file_category_call_center` - Call center analytics
  - `file_category_legal` - Legal/court transcripts
  - `file_category_meeting_notes` - Meeting documentation
- Comprehensive post-processing options for each category:
  - SOAP notes, summaries, entity extraction
  - Treatment plans, ICD codes, differential diagnosis
  - Agent scoring, sentiment analysis, compliance checks
  - Meeting participants, decisions, action items
- Speaker diarization support
- Custom template support
- Generic `get()` and `post()` operations for direct API access
- Detailed logging for requests, retries, and status updates
- Configurable retry behavior per operation
- Comprehensive test suite
- Full JSDoc documentation

### Implementation Notes

- **File Uploads**: Uses `axios` + `form-data` package for multipart uploads instead of undici. This decision was made after testing both undici v6 and v7, both of which have FormData serialization bugs with File/Blob objects. Axios provides reliable uploads with acceptable performance (~1.3 MB/s, 44-139s for 57MB files). Given Sahara's 100MB max file size and that upload is async (user doesn't wait), this performance is production-acceptable.
  
- **SSL Certificate**: Sahara's server has a certificate for `*.intron.health` but the endpoint is `infer.voice.intron.io`. Set `tls.rejectUnauthorized: false` in configuration to handle this server-side SSL configuration.

- **Testing**: 10/13 unit tests pass. Upload tests hit real API (axios bypasses undici mocks). 100% success rate with real API integration tests.
