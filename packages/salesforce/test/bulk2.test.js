import { expect } from 'chai';
import { bulk2, setMockConnection } from '../src/index';

describe('bulk2', () => {
  beforeEach(() => {
    setMockConnection(null);
  });
  describe('query', () => {
    it('should query', done => {
      const fakeConnection = {
        bulk2: {
          query: args => {
            return Promise.resolve({
              toArray: () => [
                {
                  Id: '0015g00000LJ2wGAAT',
                  Name: 'test',
                },
              ],
            });
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk2
        .query('SELECT Id, Name FROM Account', {
          responseTarget: 'SingleRecord',
        })(state)
        .then(state => {
          expect(state.data).to.eql([
            {
              Id: '0015g00000LJ2wGAAT',
              Name: 'test',
            },
          ]);
        })
        .then(done)
        .catch(done);
    });
  });

  describe('insert', () => {
    it('should insert', done => {
      const fakeConnection = {
        bulk2: {
          loadAndWaitForResults: args => {
            return Promise.resolve({
              successfulResults: [
                {
                  sf__Id: '0015g00000LJ2wGAAT',
                  success: true,
                  errors: [],
                },
              ],
              failedResults: [],
              unprocessedRecords: [],
            });
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk2
        .insert('Account', [{ Name: 'Coco' }, { Name: 'Melon' }])(state)
        .then(state => {
          expect(state.data.successfulResults).to.eql([
            {
              sf__Id: '0015g00000LJ2wGAAT',
              success: true,
              errors: [],
            },
          ]);
        })
        .then(done)
        .catch(done);
    });
  });

  describe('update', () => {
    it('should update records', done => {
      const fakeConnection = {
        bulk2: {
          loadAndWaitForResults: args => {
            return Promise.resolve({
              successfulResults: [
                {
                  sf__Id: '001Ke00000cTqRvIAK',
                  sf__Created: 'false',
                  Name: 'test (Updated)',
                },
              ],
              failedResults: [],
              unprocessedRecords: [],
            });
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk2
        .update('Account', [
          { Id: '0015g00000LJ2wGAAT', Name: 'test (updated)' },
        ])(state)
        .then(state => {
          expect(state.data.successfulResults).to.eql([
            {
              sf__Id: '001Ke00000cTqRvIAK',
              sf__Created: 'false',
              Name: 'test (Updated)',
            },
          ]);
          expect(state.data.failedResults).to.eql([]);
          expect(state.data.unprocessedRecords).to.eql([]);
        })
        .then(done)
        .catch(done);
    });
  });

  describe('upsert', () => {
    it('should upsert records', done => {
      const fakeConnection = {
        bulk2: {
          loadAndWaitForResults: args => {
            return Promise.resolve({
              successfulResults: [
                {
                  sf__Id: '0015g00000LJ2wGAAT',
                  sf__Created: 'false',
                  Name: 'test-upsert',
                },
              ],
              failedResults: [],
              unprocessedRecords: [],
            });
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk2
        .upsert('Account', 'Id', [
          { Id: '0015g00000LJ2wGAAT', Name: 'test-upsert' },
        ])(state)
        .then(state => {
          expect(state.data.successfulResults).to.eql([
            {
              sf__Id: '0015g00000LJ2wGAAT',
              sf__Created: 'false',
              Name: 'test-upsert',
            },
          ]);
          expect(state.data.failedResults).to.eql([]);
          expect(state.data.unprocessedRecords).to.eql([]);
        })
        .then(done)
        .catch(done);
    });
  });
});
