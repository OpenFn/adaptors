/**
 * Test 6: Meeting Notes
 * 
 * This test extracts structured meeting notes including
 * participants, decisions, and action items.
 */

uploadAndWaitForTranscription({
  audio_file_name: `meeting_notes_${Date.now()}`,
  audio_file_blob: {
    path: 'YOUR_AUDIO_FILE_PATH_HERE'
  },
  
  use_category: 'file_category_meeting_notes',
  
  // Meeting-specific post-processing
  get_summary: 'TRUE',
  get_meeting_notes_participants: 'TRUE',   // List of participants and roles
  get_meeting_notes_decisions: 'TRUE',      // Key decisions made
  get_meeting_notes_action_items: 'TRUE',   // Action items with owners
  get_meeting_notes_key_topics: 'TRUE',     // Main topics discussed
  get_meeting_notes_next_steps: 'TRUE'      // Follow-up steps
}, {
  pollInterval: 5000,
  maxAttempts: 300
});

// Perfect for:
// - Team meetings
// - Board meetings
// - Project planning sessions
// - Stakeholder updates

