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

      const state = {};
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
    it('should properly pass the query string', async () => {
      let reqArgs;
      const fakeConnection = {
        query: args => {
          reqArgs = args;
          return Promise.resolve(qsResponse);
        },
      };
      setMockConnection(fakeConnection);
      const state = {};

      query('select Name from Account')(state).then(state => {
        expect(reqArgs).to.eql('select Name from Account');
        expect(state.data).to.eql(qsResponse);
      });
    });
    it('should properly pass the query string from state', async () => {
      let reqArgs;

      const fakeConnection = {
        query: args => {
          reqArgs = args;
          return Promise.resolve(qsResponse);
        },
      };
      setMockConnection(fakeConnection);
      const state = {
        qs: 'select Name from Account',
      };

      query(state => state.qs)(state).then(state => {
        expect(reqArgs).to.eql('select Name from Account');
        expect(state.data).to.eql(qsResponse);
      });
    });

    it('should fetch 0 records', done => {
      let reqArgs;
      const fakeConnection = {
        query: args => {
          reqArgs = args;
          return Promise.resolve({
            done: true,
            totalSize: 0,
            records: [],
          });
        },
      };
      setMockConnection(fakeConnection);
      const state = {};

      query('select Name from Account')(state)
        .then(state => {
          expect(state.data).to.eql({
            done: true,
            totalSize: 0,
            records: [],
          });
        })
        .then(done);
    });

    it('should fetch 1 record', done => {
      let reqArgs;
      const fakeConnection = {
        query: args => {
          reqArgs = args;
          return Promise.resolve(qsResponse);
        },
      };
      setMockConnection(fakeConnection);
      const state = {};

      query('select Name from Account')(state)
        .then(state => {
          expect(reqArgs).to.eql('select Name from Account');
          expect(state.data).to.eql(qsResponse);
        })
        .then(done);
    });
    it('should fetch all page if autoFetch is true', done => {
      let qsArgs;
      let reqArgs;
      const fakeConnection = {
        query: args => {
          qsArgs = args;
          return Promise.resolve({
            done: false,
            totalSize: 5713,
            nextRecordsUrl:
              '/services/data/v47.0/query/0r8yy3Dlrs3Ol9EACO-2000',
            records: [{ Name: 'Open' }],
          });
        },
        request: args => {
          reqArgs = args;
          return Promise.resolve({
            done: true,
            totalSize: 5713,
            records: [{ Name: 'Fn' }],
          });
        },
      };
      setMockConnection(fakeConnection);
      const state = {};

      query('select Name from Account', { autoFetch: true })(state)
        .then(state => {
          expect(qsArgs).to.eql('select Name from Account');
          expect(reqArgs.url).to.eql(
            '/services/data/v47.0/query/0r8yy3Dlrs3Ol9EACO-2000'
          );
          expect(state.data).to.eql({
            done: true,
            totalSize: 5713,
            records: [{ Name: 'Open' }, { Name: 'Fn' }],
          });
        })
        .then(done);
    });
    it('should not fetch another page if autofetch is false', done => {
      let qsArgs;
      let reqArgs;
      const fakeConnection = {
        query: args => {
          qsArgs = args;
          return Promise.resolve({
            done: false,
            totalSize: 5713,
            nextRecordsUrl:
              '/services/data/v47.0/query/0r8yy3Dlrs3Ol9EACO-2000',
            records: [{ Name: 'Open' }],
          });
        },
        request: args => {
          reqArgs = args;
          return Promise.resolve({
            done: true,
            totalSize: 5713,
            records: [{ Name: 'Fn' }],
          });
        },
      };
      setMockConnection(fakeConnection);
      const state = {};

      query('select Name from Account')(state)
        .then(state => {
          expect(qsArgs).to.eql('select Name from Account');
          expect(reqArgs).to.eql(undefined);
          expect(state.data).to.eql({
            done: false,
            totalSize: 5713,
            nextRecordsUrl:
              '/services/data/v47.0/query/0r8yy3Dlrs3Ol9EACO-2000',
            records: [{ Name: 'Open' }],
          });
        })
        .then(done);
    });
  });
});
