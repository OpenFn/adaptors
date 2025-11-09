/**
 * Test 5: Call Center Analytics
 * 
 * This test demonstrates call center audio processing with
 * agent scoring, sentiment analysis, and compliance checks.
 */

uploadAndWaitForTranscription({
  audio_file_name: `call_center_analysis_${Date.now()}`,
  audio_file_blob: {
    path: 'YOUR_AUDIO_FILE_PATH_HERE'
  },
  
  use_category: 'file_category_call_center',
  
  // Call center specific post-processing
  get_summary: 'TRUE',
  get_call_center_results: 'TRUE',              // Call resolution details
  get_call_center_agent_score: 'TRUE',          // Agent performance score
  get_call_center_agent_score_category: 'TRUE', // Performance assessment
  get_call_center_product_info: 'TRUE',         // Products discussed
  get_call_center_product_insights: 'TRUE',     // Customer feedback
  get_call_center_compliance: 'TRUE',           // Compliance verification
  get_call_center_feedback: 'TRUE',             // Agent feedback
  get_call_center_sentiment: 'TRUE'             // Caller sentiment
}, {
  pollInterval: 5000,
  maxAttempts: 300
});

// Expected output includes:
// - Agent score (numerical + categorical)
// - Call resolution status
// - Compliance check results
// - Customer sentiment analysis
// - Product feedback and insights

