import { expect } from 'chai';
import { bulk2, setMockConnection } from '../src/index';

describe('bulk2', () => {
  beforeEach(() => {
    setMockConnection(null);
  });

  describe('query', () => {
    it('should query successfully', done => {
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
        .query('SELECT Id, Name FROM Account')(state)
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

    it('should handle query errors', done => {
      const fakeConnection = {
        bulk2: {
          query: args => {
            return Promise.reject(new Error('Invalid SOQL query'));
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk2
        .query('INVALID QUERY')(state)
        .then(() => {
          done(new Error('Should have thrown an error'));
        })
        .catch(error => {
          expect(error.message).to.equal('Invalid SOQL query');
          done();
        });
    });
  });

  describe('insert', () => {
    it('should insert successfully', done => {
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

    it('should handle partial failures during insert', done => {
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
              failedResults: [
                {
                  error: 'Required fields are missing: [Name]',
                  success: false,
                },
              ],
              unprocessedRecords: [],
            });
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk2
        .insert('Account', [{ Name: 'Valid' }, {}])(state)
        .then(state => {
          expect(state.data.successfulResults.length).to.equal(1);
          expect(state.data.failedResults.length).to.equal(1);
          expect(state.data.failedResults[0].error).to.contain(
            'Required fields'
          );
        })
        .then(done)
        .catch(done);
    });
  });

  describe('update', () => {
    it('should update records successfully', done => {
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
        })
        .then(done)
        .catch(done);
    });

    it('should handle invalid ID errors during update', done => {
      const fakeConnection = {
        bulk2: {
          loadAndWaitForResults: args => {
            return Promise.resolve({
              successfulResults: [],
              failedResults: [
                {
                  error: 'Invalid ID: 123',
                  success: false,
                },
              ],
              unprocessedRecords: [],
            });
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk2
        .update('Account', [{ Id: '123', Name: 'test' }])(state)
        .then(state => {
          expect(state.data.successfulResults).to.be.empty;
          expect(state.data.failedResults[0].error).to.equal('Invalid ID: 123');
        })
        .then(done)
        .catch(done);
    });
  });

  describe('upsert', () => {
    it('should upsert records successfully', done => {
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
        })
        .then(done)
        .catch(done);
    });

    it('should handle invalid external ID field during upsert', done => {
      const fakeConnection = {
        bulk2: {
          loadAndWaitForResults: args => {
            return Promise.reject(
              new Error('Invalid external ID field: InvalidField__c')
            );
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk2
        .upsert('Account', 'InvalidField__c', [
          { InvalidField__c: '123', Name: 'test' },
        ])(state)
        .then(() => {
          done(new Error('Should have thrown an error'));
        })
        .catch(error => {
          expect(error.message).to.contain('Invalid external ID field');
          done();
        });
    });

    it('should handle mixed success and failure results', done => {
      const fakeConnection = {
        bulk2: {
          loadAndWaitForResults: args => {
            return Promise.resolve({
              successfulResults: [
                {
                  sf__Id: '0015g00000LJ2wGAAT',
                  sf__Created: 'true',
                  Name: 'success-record',
                },
              ],
              failedResults: [
                {
                  error:
                    'Duplicate value found: External_Id__c duplicates value on record with id: 001x',
                  success: false,
                },
              ],
              unprocessedRecords: [{ Name: 'unprocessed-record' }],
            });
          },
        },
      };
      setMockConnection(fakeConnection);
      const state = {};
      bulk2
        .upsert('Account', 'External_Id__c', [
          { External_Id__c: '1', Name: 'success-record' },
          { External_Id__c: '2', Name: 'failed-record' },
          { External_Id__c: '3', Name: 'unprocessed-record' },
        ])(state)
        .then(state => {
          expect(state.data.successfulResults.length).to.equal(1);
          expect(state.data.failedResults.length).to.equal(1);
          expect(state.data.unprocessedRecords.length).to.equal(1);
          expect(state.data.failedResults[0].error).to.contain(
            'Duplicate value found'
          );
        })
        .then(done)
        .catch(done);
    });
  });
});
