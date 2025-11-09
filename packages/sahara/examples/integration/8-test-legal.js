/**
 * Test 8: Legal Category (Upload & Wait)
 * Uploads a legal/court hearing recording and waits for transcription.
 */

uploadAndWaitForTranscription({
  audio_file_name: `legal_hearing_${Date.now()}`,
  audio_file_blob: {
    path: 'YOUR_AUDIO_FILE_PATH_HERE'
  },
  use_category: 'file_category_legal',
  get_summary: 'TRUE',
  get_legal_court_hearing: 'TRUE'
}, {
  pollInterval: 5000,
  maxAttempts: 300
});
