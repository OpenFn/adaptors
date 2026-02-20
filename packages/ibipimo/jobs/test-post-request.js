// Test job pour envoyer une demande de charge virale
const payload = {
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

postViralLoadRequest(payload);
