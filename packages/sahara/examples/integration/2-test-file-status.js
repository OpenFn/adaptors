/**
 * Test 2: Get File Status
 * 
 * This test retrieves the transcription status and results.
 * Replace 'YOUR_FILE_ID_HERE' with the file_id from Test 1.
 * 
 * Expected output when complete:
 * - processing_status: "FILE_TRANSCRIBED"
 * - audio_transcript: "..." (the transcribed text)
 * - transcript_summary: "..." (if get_summary was used)
 */

getFileStatus('a1bde500-02da-4366-b22d-bd9accf389d5', {
  // Optional: Get structured JSON output instead of markdown
  get_structured_post_processing: 't'
});

// If status is "PROCESSING" or "QUEUED", wait a few seconds and try again

