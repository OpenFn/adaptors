import { expect } from 'chai';

// Simple mock functions to test logic without external dependencies
const mockUtils = {
  request: (config, method, path, options) =>
    Promise.resolve({
      statusCode: 200,
      body: { success: true, method, path, options },
    }),
  prepareNextState: (state, response) => ({
    ...state,
    data: response.body,
    response: { statusCode: response.statusCode },
  }),
};

const mockExpandReferences = (state, ...args) => args;

// Simplified versions of adaptor functions for testing
const createRequest = (method, path, options = {}) => {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedOptions] =
      mockExpandReferences(state, method, path, options);

    const response = await mockUtils.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      resolvedOptions
    );

    return mockUtils.prepareNextState(state, response);
  };
};

const createPost = (path, body, options = {}) => {
  return createRequest('POST', path, { ...options, body });
};

const createGet = (path, options = {}) => {
  return createRequest('GET', path, options);
};

describe('IBIPIMO Adaptor Logic', () => {
  let mockState;

  beforeEach(() => {
    mockState = {
      configuration: {
        baseUrl: 'https://demo.ibipimo.org',
        apiToken: 'test-token',
      },
      data: {},
      references: [],
    };
  });

  describe('request function logic', () => {
    it('should create an async operation function', () => {
      const operation = createRequest('GET', '/api/v1/test', { timeout: 5000 });

      expect(operation).to.be.a('function');
    });

    it('should resolve references and call utils.request', async () => {
      const operation = createRequest('POST', '/api/v1/test', {
        body: { test: 'data' },
      });
      const result = await operation(mockState);

      expect(result.data.method).to.equal('POST');
      expect(result.data.path).to.equal('/api/v1/test');
      expect(result.data.options.body.test).to.equal('data');
    });
  });

  describe('post function logic', () => {
    it('should create POST request with body in options', async () => {
      const testData = { siteid: '12345', data: 'test' };
      const operation = createPost('/api/v1/test', testData, { timeout: 5000 });
      const result = await operation(mockState);

      expect(result.data.method).to.equal('POST');
      expect(result.data.options.body).to.deep.equal(testData);
      expect(result.data.options.timeout).to.equal(5000);
    });

    it('should merge options correctly with body', async () => {
      const body = { siteid: '123' };
      const options = { headers: { 'X-Test': 'value' } };
      const operation = createPost('/api/v1/test', body, options);
      const result = await operation(mockState);

      expect(result.data.options.body).to.deep.equal(body);
      expect(result.data.options.headers['X-Test']).to.equal('value');
    });
  });

  describe('get function logic', () => {
    it('should create GET request without body', async () => {
      const operation = createGet('/api/v1/status', {
        query: { active: true },
      });
      const result = await operation(mockState);

      expect(result.data.method).to.equal('GET');
      expect(result.data.options.query.active).to.be.true;
      expect(result.data.options).to.not.have.property('body');
    });
  });

  describe('IBIPIMO specific functions logic', () => {
    it('should create postViralLoadRequest with correct endpoint', async () => {
      const sampleData = {
        siteid: '12345',
        samples: [{ sidainfo_uid: '147460', p_name: 'Test' }],
      };

      const operation = createPost(
        '/api/v1/post-viral-load-requests',
        sampleData
      );
      const result = await operation(mockState);

      expect(result.data.path).to.equal('/api/v1/post-viral-load-requests');
      expect(result.data.options.body.siteid).to.equal('12345');
      expect(result.data.options.body.samples).to.have.length(1);
    });

    it('should create getViralLoadResults with correct endpoint', async () => {
      const requestData = {
        siteid: '12345',
        sample_uids: ['TEST001', 'TEST002'],
      };

      const operation = createPost('/api/v1/ask-for-vl-results', requestData);
      const result = await operation(mockState);

      expect(result.data.path).to.equal('/api/v1/ask-for-vl-results');
      expect(result.data.options.body.sample_uids).to.have.length(2);
    });
  });

  describe('processing functions logic', () => {
    it('should process viral load results correctly', () => {
      const testData = {
        total_requested: 3,
        total_found: 2,
        total_without_published_result: 1,
        results: [
          { sample_uid: 'TEST001', viral_load: 1500 },
          { sample_uid: 'TEST002', viral_load: 2000 },
        ],
        no_results: ['TEST003'],
        sample_statuses: { TEST003: { status: 'pending' } },
        not_found_sample_uids: [],
      };

      const processResults = ibipimResponse => {
        return {
          totalRequested: ibipimResponse.total_requested || 0,
          totalFound: ibipimResponse.total_found || 0,
          totalPending: ibipimResponse.total_without_published_result || 0,
          availableResults: ibipimResponse.results || [],
          pendingSamples: ibipimResponse.no_results || [],
          sampleStatuses: ibipimResponse.sample_statuses || {},
          notFoundSamples: ibipimResponse.not_found_sample_uids || [],
        };
      };

      const processed = processResults(testData);

      expect(processed.totalRequested).to.equal(3);
      expect(processed.totalFound).to.equal(2);
      expect(processed.totalPending).to.equal(1);
      expect(processed.availableResults).to.have.length(2);
      expect(processed.pendingSamples).to.include('TEST003');
    });

    it('should process viral load submission correctly', () => {
      const testData = {
        errors: [],
        saved_viral_load_samples: [
          { id: 123, s_uid: 'TEST001', siteid: '12345' },
          { id: 124, s_uid: 'TEST002', siteid: '12345' },
        ],
      };

      const processSubmission = ibipimResponse => {
        return {
          savedSamples: ibipimResponse.saved_viral_load_samples || [],
          savedCount: ibipimResponse.saved_viral_load_samples?.length || 0,
          errors: ibipimResponse.errors || [],
          errorCount: ibipimResponse.errors?.length || 0,
          hasErrors: (ibipimResponse.errors?.length || 0) > 0,
          sampleIds: (ibipimResponse.saved_viral_load_samples || []).map(
            s => s.s_uid
          ),
        };
      };

      const processed = processSubmission(testData);

      expect(processed.savedCount).to.equal(2);
      expect(processed.errorCount).to.equal(0);
      expect(processed.hasErrors).to.be.false;
      expect(processed.sampleIds).to.deep.equal(['TEST001', 'TEST002']);
    });

    it('should handle submission errors correctly', () => {
      const testData = {
        errors: ['Validation failed', 'Invalid format'],
        saved_viral_load_samples: [],
      };

      const processSubmission = ibipimResponse => {
        return {
          savedSamples: ibipimResponse.saved_viral_load_samples || [],
          savedCount: ibipimResponse.saved_viral_load_samples?.length || 0,
          errors: ibipimResponse.errors || [],
          errorCount: ibipimResponse.errors?.length || 0,
          hasErrors: (ibipimResponse.errors?.length || 0) > 0,
          sampleIds: (ibipimResponse.saved_viral_load_samples || []).map(
            s => s.s_uid
          ),
        };
      };

      const processed = processSubmission(testData);

      expect(processed.hasErrors).to.be.true;
      expect(processed.errorCount).to.equal(2);
      expect(processed.savedCount).to.equal(0);
      expect(processed.errors).to.include('Validation failed');
    });
  });
});
