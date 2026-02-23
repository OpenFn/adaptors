// Advanced jobs - Testing IBIPIMO processing functions

const payloadResult = {
  siteid: '22222222',
  sample_uids: ['634W'],
};

const payloadRequest = {
  siteid: '22222222',
  samples: [
    {
      sidainfo_uid: '147460',
      p_code: '000010',
      p_name: 'Name_100',
      p_prename: 'First-name100',
      p_sex: 'M',
      p_dob: '1950-01-15',
      arv_start_date: '2006-09-21',
      date_blood_taken: '2024-04-15 11:49:00',
      reason_vl: 'suspicion_echec',
      on_arv: '1',
      sample_type: 'DBS',
    },
  ],
};

// Step 1:  Retrieve and process results from IBIPIMO
getViralLoadResults(payloadResult);

// Step 2: Process IBIPIMO response
processViralLoadResults((state, processResults) => {
  const processed = processResults(state.data);

  console.log('=== VIRAL LOAD RESULTS ===');
  console.log(`Requested result: ${processed.totalRequested}`);
  console.log(`Total found: ${processed.totalFound}`);
  console.log(`Total pending: ${processed.totalPending}`);
  console.log(`Available results: ${processed.availableResults.length}`);
  console.log(`Pending samples: ${processed.pendingSamples.length}`);

  return {
    ...state,
    processedResults: processed,
  };
});

// Step 3: Submit new samples if necessary
postViralLoadRequest(payloadRequest);

// Step 4: Process submission response
processViralLoadSubmission((state, processSubmission) => {
  const submission = processSubmission(state.data);

  console.log('\n=== SUBMISSION RESULTS ===');
  console.log(`Saved samples: ${submission.savedCount}`);
  console.log(`Errors: ${submission.errorCount}`);

  if (submission.hasErrors) {
    console.log('\n--- Errors ---');
    submission.errors.forEach(error => {
      console.log(`- ${error}`);
    });
  }

  return {
    ...state,
    submissionResult: submission,
  };
});
