/**
 * Test 4: Speaker Diarization
 * 
 * This test enables speaker diarization to identify different speakers
 * in the audio (e.g., doctor vs patient, multiple participants)
 */

uploadAndWaitForTranscription({
  audio_file_name: 'multi_speaker_conversation',
  audio_file_blob: {
    path: 'YOUR_AUDIO_FILE_PATH_HERE'
  },
  use_category: 'file_category_call_center',
  use_diarization: 'TRUE',
  get_summary: 'TRUE',
  get_call_center_sentiment: 'TRUE'
}, {
  pollInterval: 5000,
  maxAttempts: 300,

  // Retry configuration for the upload
  maxRetries: 3,
  retryDelay: 2000
});

// When you check the status later, the audio_transcript will be formatted like:
// "SPEAKER_01: Hello, how are you feeling today?
//  SPEAKER_02: I've been having some headaches.
//  SPEAKER_01: How long have you had these headaches?"

