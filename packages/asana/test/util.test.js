import { expect } from 'chai';
import { mockServer } from './helper';
import {
  request,
  DEFAULT_PAGE_LIMIT,
  requestWithPagination,
} from '../src/util';

const configuration = {
  token: 'test-token',
};

describe('Util Test', () => {
  describe('request', () => {
    it('should make a GET request with proper authorization', async () => {
      mockServer
        .intercept({
          path: '/api/1.0/workspaces',
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer test-token',
          },
        })
        .reply(200, {
          data: [{ gid: '1', name: 'Test Workspace' }],
        });

      const state = { configuration };
      const response = await request(state, 'workspaces');

      expect(response.statusCode).to.equal(200);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data[0]).to.have.property('gid');
      expect(response.body.data[0]).to.have.property('name');
    });

    it('should throw if an absolute URL is passed', async () => {
      const state = { configuration };
      let err;
      try {
        await request(state, 'https://www.blah.com/a/b/c');
      } catch (e) {
        err = e;
        expect(err.code).to.equal('UNEXPECTED_ABSOLUTE_URL');
      }
    });
  });
  describe('requestWithPagination', () => {
    const mockData = Array.from({ length: 1e3 }, (_, i) => ({
      gid: String(i + 1),
      name: `Item ${i + 1}`,
    }));

    it('should fetch all pages when no limit is specified', async () => {
      let requestCount = 0;
      mockServer
        .intercept({
          path: /\/api\/1.0\/tasks/,
          method: 'GET',
        })
        .reply(200, req => {
          requestCount++;
          const offset = parseInt(req.query.offset || 0, 10);
          const limit = parseInt(req.query.limit || DEFAULT_PAGE_LIMIT, 10);
          const hasNextPage = offset + limit < mockData.length;

          return {
            data: mockData.slice(offset, offset + limit),
            next_page: hasNextPage
              ? {
                  path: `/tasks?offset=${offset + limit}&limit=${limit}`,
                  offset: offset + limit,
                }
              : null,
          };
        })
        .times(10);

      const state = { configuration };
      const results = await requestWithPagination(state, '/tasks');

      expect(results).to.have.lengthOf(1e3);
      expect(results).to.deep.equal(mockData);
      expect(requestCount).to.equal(10);
    });

    it('should respect user-specified limit', async () => {
      let requestCount = 0;
      mockServer
        .intercept({
          path: /\/api\/1.0\/tasks/,
          method: 'GET',
        })
        .reply(200, req => {
          requestCount++;
          const limit = parseInt(req.query.limit, 10);
          return {
            data: mockData.slice(0, limit),
          };
        })
        .times(1);

      const state = { configuration };
      const results = await requestWithPagination(state, '/tasks', {
        query: { limit: 2 },
      });

      expect(results).to.have.lengthOf(2);
      expect(results).to.deep.equal(mockData.slice(0, 2));
      expect(requestCount).to.equal(1);
    });

    it('should handle empty response data', async () => {
      mockServer
        .intercept({
          path: /\/api\/1.0\/tasks/,
          method: 'GET',
        })
        .reply(200, {
          data: [],
        });

      const state = { configuration };
      const results = await requestWithPagination(state, '/tasks');

      expect(results).to.be.an('array').that.is.empty;
    });
  });
});
