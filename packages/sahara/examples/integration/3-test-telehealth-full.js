/**
 * Test 3: Healthcare/Telehealth Full Workflow
 * 
 * This test demonstrates uploading a medical consultation audio
 * with comprehensive post-processing for healthcare use cases.
 * 
 * Useful for: Doctor consultations, patient visits, clinical documentation
 */

uploadAndWaitForTranscription({
  audio_file_name: 'doctor_patient_consultation',
  audio_file_blob: {
    // Replace with your audio file path
    path: 'YOUR_AUDIO_FILE_PATH_HERE'
  },
  
  // Healthcare category
  use_category: 'file_category_telehealth',
  
  // Request all medical post-processing features
  get_summary: 'TRUE',                      // Brief summary
  get_soap_note: 'TRUE',                    // SOAP note (Subjective, Objective, Assessment, Plan)
  get_entity_list: 'TRUE',                  // Medical entities (symptoms, medications, etc.)
  get_treatment_plan: 'TRUE',               // Treatment recommendations
  get_clerking: 'TRUE',                     // Medical clerking notes
  get_icd_codes: 'TRUE',                    // ICD-11/SNOMED/CPT billing codes
  get_suggestions: 'TRUE',                  // Important questions/instructions for patient
  get_differential_diagnosis: 'TRUE',       // Possible diagnoses to consider
  get_followup_instructions: 'TRUE',        // Follow-up care instructions
  get_practice_guidelines: 'TRUE'           // Relevant medical guidelines
}, {
  pollInterval: 5000,
  maxAttempts: 300
});

// Expected output structure (when you check status later):
// {
//   "processing_status": "FILE_TRANSCRIBED",
//   "audio_transcript": "Full transcript...",
//   "transcript_soap_note": "SOAP Note:\n\nSubjective:\n...",
//   "transcript_icd_codes": "ICD-11: ...",
//   "transcript_summary": "Patient presented with...",
//   ...
// }

