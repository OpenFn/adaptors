/**
 * Test 1: Basic File Upload
 * 
 * This test uploads an audio file to Sahara for basic transcription.
 * You'll need to provide a real audio file path or URL.
 * 
 * Expected output:
 * - file_id in state.data
 * - status: "Ok"
 * - message: "file queued for processing"
 */

uploadAudioFile({
  audio_file_name: 'test_basic_upload',
  audio_file_blob: {
    // Option 1: If you have a local file, you can use fs to read it
    // Replace with actual path to an audio file (wav, mp3, etc.)
    path: '/Users/mac/Downloads/adaptor_test_audios/Telehealth.mp3'
    
    // Option 2: If you have a URL to the audio file
    // url: 'https://example.com/audio.wav'
  },
  
  // Basic options
  use_category: 'file_category_general',
  get_summary: 'TRUE'
});

// After this runs, inspect the output file you passed via -o (for example tmp/sahara-outputs/1-basic-upload.json)
// Grab the file_id from that JSON if you want to run 2-test-file-status.js next.

