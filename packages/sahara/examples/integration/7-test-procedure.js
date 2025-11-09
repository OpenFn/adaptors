/**
 * Test 7: Procedure Category (Upload & Wait)
 * Uploads a surgical procedure recording and waits until processing finishes.
 */

uploadAndWaitForTranscription({
  audio_file_name: `procedure_report_${Date.now()}`,
  audio_file_blob: {
    path: 'YOUR_AUDIO_FILE_PATH_HERE'
  },
  use_category: 'file_category_procedure',
  get_summary: 'TRUE',
  get_entity_list: 'TRUE',
  get_op_note: 'TRUE',
  get_icd_codes: 'TRUE',
  get_treatment_plan: 'TRUE',
  get_suggestions: 'TRUE'
}, {
  pollInterval: 5000,
  maxAttempts: 300
});
