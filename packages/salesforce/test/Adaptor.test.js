import { expect } from 'chai';
import { create, upsert, query, http, setMockConnection } from '../src/index';

describe('Adaptor', () => {
  describe('get', () => {
    it('fetches an account record', done => {
      const fakeConnection = {
        request: reqArgs => {
          expect(reqArgs).to.eql({
            url: '/sobjects/Account/10',
            method: 'GET',
            body: undefined,
            headers: { 'content-type': 'application/json' },
          });
          return Promise.resolve({ Id: 10 });
        },
      };
      setMockConnection(fakeConnection);

      http
        .get('/sobjects/Account/10')({})
        .then(state => {
          expect(state.data).to.eql({ Id: 10 });
        })
        .then(done)
        .catch(done);
    });
  });
  describe('create', () => {
    it('makes a new sObject', done => {
      let reqArgs;
      const fakeConnection = {
        create: (...args) => {
          reqArgs = args;
          return Promise.resolve({ id: 10, success: true, errors: [] });
        },
      };
      setMockConnection(fakeConnection);
      let state = { references: [] };

      const sObject = 'myObject';
      const fields = { field: 'value' };

      create(
        sObject,
        fields
      )(state)
        .then(state => {
          expect(reqArgs).to.eql([sObject, fields]);
          expect(state.data).to.eql({
            success: true,
            errors: [],
            completed: [10],
          });
        })
        .then(done)
        .catch(done);
    });
  });

  describe('upsert', () => {
    it('is expected to call `upsert` on the connection', done => {
      let reqArgs;
      const fakeConnection = {
        upsert: (...args) => {
          reqArgs = args;
          return Promise.resolve({ Id: 10 });
        },
      };
      setMockConnection(fakeConnection);
      const state = { references: [] };

      const sObject = 'myObject';
      const externalId = 'MyExternalId';
      const fields = { field: 'value' };

      upsert(
        sObject,
        externalId,
        fields
      )(state)
        .then(state => {
          expect(reqArgs).to.eql([sObject, fields, externalId]);
          expect(state.data).to.eql({ Id: 10 });
        })
        .then(done)
        .catch(done);
    });
  });
  describe('query', () => {
    const qsResponse = {
      done: true,
      totalSize: 1,
      records: [{ Name: 'OpenFn' }],
    };
    const connectionConfig = config => ({
      query: (soql, options) => {
        if (config.validateQuery) {
          config.validateQuery(soql);
        }
        if (config.validateOptions) {
          config.validateOptions(options);
        }
        if (config.error) {
          return Promise.reject(config.error);
        }
        return {
          done: config.done || false,
          records: config.records || [],
          totalSize: config.totalSize || 0,
        };
      },
    });

    beforeEach(() => {
      setMockConnection(null);
    });

    it('should properly pass the query string', async () => {
      const connection = connectionConfig({
        done: true,
        totalSize: 1,
        records: [{ Name: 'OpenFn' }],
        validateQuery: query => {
          expect(query).to.eq('select Name from Account');
        },
      });

      setMockConnection(connection);

      const state = {
        qs: 'select Name from Account',
      };
      const { data, response } = await query(state => state.qs)(state);
      expect(data).to.eql([{ Name: 'OpenFn' }]);
      expect(response).to.eql({ done: true, totalSize: 1 });
    });

    it('should fetch 0 records', async () => {
      const connection = connectionConfig({
        done: true,
        totalSize: 0,
        records: [],
      });
      setMockConnection(connection);

      const state = {};
      const { data, response } = await query(
        'select Name from Account where Name = "invalid"'
      )(state);

      expect(response).to.eql({
        done: true,
        totalSize: 0,
      });
      expect(data.length).to.eql(0);
    });

    it('should fetch 1 record', async () => {
      const connection = connectionConfig({
        done: true,
        totalSize: 1,
        records: [{ Name: 'OpenFn' }],
      });
      setMockConnection(connection);

      const state = {};
      const { data, response } = await query(
        'select Name from Account limit 1'
      )(state);

      expect(data).to.eql([{ Name: 'OpenFn' }]);
      expect(response).to.eql({ done: true, totalSize: 1 });
    });

    it('should fetch all pages if limit is Infinity', async () => {
      const mockRecords = Array(10001)
        .fill()
        .map((_, i) => ({
          Id: `00${i}`,
          Name: `Test ${i}`,
        }));

      const connection = connectionConfig({
        done: true,
        totalSize: mockRecords.length,
        records: mockRecords,
        validateOptions: options => {
          expect(options.maxFetch).to.eq(Infinity);
        },
      });
      setMockConnection(connection);

      const state = {};
      const { data, response } = await query('select Name from Account', {
        limit: Infinity,
      })(state);
      expect(data.length).to.eq(10001);
      expect(response.done).to.eq(true);
      expect(response.totalSize).to.eq(10001);
    });
    it('should fetch default maximum if limit is not applied', async () => {
      const mockRecords = Array(1e4)
        .fill()
        .map((_, i) => ({
          Id: `00${i}`,
          Name: `Test ${i}`,
        }));
      const connection = connectionConfig({
        done: false,
        totalSize: mockRecords.length * 2,
        records: mockRecords,
        validateOptions: options => {
          expect(options.maxFetch).to.eq(1e4);
        },
      });
      setMockConnection(connection);

      const state = {};
      const { data, response } = await query('select Name from Account')(state);
      expect(data.length).to.eq(1e4);
      expect(response.done).to.eq(false);
      expect(response.totalSize).to.eq(2e4);
    });

    it('should not fetch another page if limit is applied', async () => {
      const mockRecords = Array(2000)
        .fill()
        .map((_, i) => ({
          Id: `00${i}`,
          Name: `Test ${i}`,
        }));

      const connection = connectionConfig({
        done: false,
        totalSize: 5000,
        records: mockRecords,
        validateOptions: options => {
          expect(options.maxFetch).to.eq(2000);
        },
        nextRecordsUrl: 'services/data/v50.0/query/0r8xx44Rcpi7M4DAEU-2000',
      });
      setMockConnection(connection);

      const state = {};
      const { data, response } = await query('SELECT Id FROM Account', {
        limit: 2000,
      })(state);

      expect(response.done).to.eq(false);
      expect(data.length).to.eq(2000);
      expect(response.totalSize).to.eq(5000);
      expect(response.nextRecordsUrl);
    });

    it('should handle query errors', async () => {
      const connection = connectionConfig({
        error: {
          data: {
            message: "unexpected token: 'invalid'",
            errorCode: 'MALFORMED_QUERY',
          },
          errorCode: 'MALFORMED_QUERY',
        },
      });
      setMockConnection(connection);

      const state = {};
      try {
        await query('SELECT Invalid FROM Account')(state);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.data.message).to.contain("unexpected token: 'invalid'");
        expect(error.errorCode).to.contain('MALFORMED_QUERY');
      }
    });
  });
});
