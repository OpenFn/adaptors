// Test generic job with the post function

const payload = {
  siteid: '22222222',
  sample_uids: ['634W'],
};

// Test simple GET ou POST
post('/api/v1/ask-for-vl-results', payload);
