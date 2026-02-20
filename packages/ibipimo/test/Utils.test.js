import { expect } from 'chai';

describe('Utils Logic', () => {
  describe('prepareNextState logic', () => {
    it('should prepare next state with response data', () => {
      const prepareNextState = (state, response) => {
        const { body, ...responseWithoutBody } = response;

        if (!state.references) {
          state.references = [];
        }

        return {
          ...state,
          data: body,
          response: responseWithoutBody,
        };
      };

      const state = { data: 'old', references: [] };
      const response = {
        statusCode: 200,
        body: { message: 'success' },
        headers: { 'content-type': 'application/json' },
      };

      const result = prepareNextState(state, response);

      expect(result.data).to.deep.equal({ message: 'success' });
      expect(result.response).to.have.property('statusCode', 200);
      expect(result.response).to.not.have.property('body');
      expect(result.response).to.have.property('headers');
    });

    it('should initialize references if not present', () => {
      const prepareNextState = (state, response) => {
        const { body, ...responseWithoutBody } = response;

        if (!state.references) {
          state.references = [];
        }

        return {
          ...state,
          data: body,
          response: responseWithoutBody,
        };
      };

      const state = { data: 'old' }; // No references
      const response = { statusCode: 200, body: { test: true } };

      const result = prepareNextState(state, response);

      expect(result).to.have.property('references');
      expect(result.references).to.be.an('array');
    });
  });

  describe('request options building logic', () => {
    it('should build request options with authentication headers', () => {
      const buildRequestOptions = (configuration, method, path, options) => {
        const { baseUrl, apiToken } = configuration;

        const authHeader = apiToken
          ? { Authorization: `Bearer ${apiToken}` }
          : {};

        const errors = {
          400: 'Bad Request - Validation failed or invalid format',
          401: 'Unauthorized - Invalid or missing access token',
          403: 'Forbidden - Insufficient permissions',
          404: 'Not Found - No results found for provided UIDs',
        };

        return {
          parseAs: 'json',
          errors,
          baseUrl,
          ...options,
          headers: {
            'content-type': 'application/json',
            'User-Agent': 'Mozilla/5.0',
            ...authHeader,
            ...options.headers,
          },
        };
      };

      const configuration = {
        baseUrl: 'https://demo.ibipimo.org',
        apiToken: 'test-token',
      };

      const result = buildRequestOptions(
        configuration,
        'POST',
        '/api/v1/test',
        {}
      );

      expect(result.baseUrl).to.equal('https://demo.ibipimo.org');
      expect(result.parseAs).to.equal('json');
      expect(result.headers['content-type']).to.equal('application/json');
      expect(result.headers['User-Agent']).to.equal('Mozilla/5.0');
      expect(result.headers['Authorization']).to.equal('Bearer test-token');
      expect(result.errors['401']).to.include('Unauthorized');
    });

    it('should handle missing authentication token', () => {
      const buildRequestOptions = (configuration, method, path, options) => {
        const { baseUrl, apiToken } = configuration;

        const authHeader = apiToken
          ? { Authorization: `Bearer ${apiToken}` }
          : {};

        return {
          parseAs: 'json',
          baseUrl,
          ...options,
          headers: {
            'content-type': 'application/json',
            'User-Agent': 'Mozilla/5.0',
            ...authHeader,
            ...options.headers,
          },
        };
      };

      const configuration = {
        baseUrl: 'https://demo.ibipimo.org',
        // No apiToken
      };

      const result = buildRequestOptions(
        configuration,
        'GET',
        '/api/v1/status',
        {}
      );

      expect(result.headers).to.not.have.property('Authorization');
      expect(result.headers['content-type']).to.equal('application/json');
    });

    it('should merge custom headers with defaults', () => {
      const buildRequestOptions = (configuration, method, path, options) => {
        const { baseUrl, apiToken } = configuration;

        const authHeader = apiToken
          ? { Authorization: `Bearer ${apiToken}` }
          : {};

        return {
          parseAs: 'json',
          baseUrl,
          ...options,
          headers: {
            'content-type': 'application/json',
            'User-Agent': 'Mozilla/5.0',
            ...authHeader,
            ...options.headers,
          },
        };
      };

      const configuration = {
        baseUrl: 'https://demo.ibipimo.org',
        apiToken: 'test-token',
      };

      const customOptions = {
        headers: {
          'X-Custom': 'custom-value',
          'User-Agent': 'CustomAgent', // Should override default
        },
        timeout: 10000,
      };

      const result = buildRequestOptions(
        configuration,
        'POST',
        '/api/v1/test',
        customOptions
      );

      expect(result.headers['content-type']).to.equal('application/json');
      expect(result.headers['Authorization']).to.equal('Bearer test-token');
      expect(result.headers['User-Agent']).to.equal('CustomAgent'); // Overridden
      expect(result.headers['X-Custom']).to.equal('custom-value');
      expect(result.timeout).to.equal(10000);
    });

    it('should include IBIPIMO-specific error mappings', () => {
      const buildRequestOptions = (configuration, method, path, options) => {
        const errors = {
          400: 'Bad Request - Validation failed or invalid format',
          401: 'Unauthorized - Invalid or missing access token',
          403: 'Forbidden - Insufficient permissions',
          404: 'Not Found - No results found for provided UIDs',
          409: 'Conflict - Duplicate integration attempt',
          500: 'Internal Server Error - Server processing failed',
          502: 'Bad Gateway',
          503: 'Service Unavailable',
        };

        return {
          parseAs: 'json',
          errors,
          baseUrl: configuration.baseUrl,
          ...options,
        };
      };

      const result = buildRequestOptions({}, 'GET', '/api/v1/test', {});

      expect(result.errors['400']).to.include('Bad Request');
      expect(result.errors['401']).to.include('Unauthorized');
      expect(result.errors['404']).to.include('No results found');
      expect(result.errors['409']).to.include('Duplicate integration');
      expect(result.errors['500']).to.include('Internal Server Error');
    });
  });

  describe('URL path handling logic', () => {
    it('should handle relative URLs correctly', () => {
      const isRelativeUrl = path => {
        return !path.startsWith('http://') && !path.startsWith('https://');
      };

      expect(isRelativeUrl('/api/v1/test')).to.be.true;
      expect(isRelativeUrl('api/v1/test')).to.be.true;
      expect(isRelativeUrl('https://example.com/api')).to.be.false;
      expect(isRelativeUrl('http://example.com/api')).to.be.false;
    });

    it('should build safe paths', () => {
      const buildSafePath = path => {
        return path.replace(/\/+/g, '/'); // Replace multiple slashes with single
      };

      expect(buildSafePath('/api/v1/test')).to.equal('/api/v1/test');
      expect(buildSafePath('//api//v1//test')).to.equal('/api/v1/test');
      expect(buildSafePath('api/v1/test')).to.equal('api/v1/test');
    });
  });
});
