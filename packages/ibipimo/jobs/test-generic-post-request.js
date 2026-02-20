// Test job générique avec la fonction request

const payload = {
  siteid: '22222222',
  sample_uids: ['634W'],
};

// Test simple GET ou POST
post('/api/v1/ask-for-vl-results', payload);
