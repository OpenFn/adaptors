import { expect } from 'chai';
import { enableMockClient } from '@openfn/language-common/util';
import { request, requestWithPagination, prepareNextState } from '../src/util';

const testServer = enableMockClient('https://app.asana.com');
const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
};

const configuration = {
  token: 'test-token',
  apiVersion: '1.0',
};

describe('Util Test', () => {
  describe('request', () => {
    it.skip('should make a GET request with proper authorization', async () => {
      testServer
        .intercept({
          path: '/api/1.0/workspaces',
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer test-token',
          },
        })
        .reply(
          200,
          {
            data: [{ gid: '1', name: 'Test Workspace' }],
          }
          // jsonHeaders
        );

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
        expect(err.code).to.equal('BASE_URL_MISMATCH');
      }
    });
  });
});
