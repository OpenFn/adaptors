import { expect } from 'chai';
import { describe, it } from 'mocha';
import { bulk1, setMockConnection } from '../src/index';

describe('bulk1', () => {
  it('should handle bulk insert operations with success and failure scenarios', done => {
    // Mock connection that returns mixed results
    const mockConnection = {
      bulk: {
        load: (sObject, operation, options, records) => {
          // Simulate mixed results: 2 success, 1 failure
          return Promise.resolve([
            { id: '0015g00000LJ2wGAAT', success: true, errors: [] },
            { id: '0015g00000LJ2wGBBT', success: true, errors: [] },
            { success: false, errors: ['Required field missing'] },
          ]);
        },
      },
    };

    setMockConnection(mockConnection);

    const state = {};
    const records = [
      { Name: 'Valid Account 1' },
      { Name: 'Valid Account 2' },
      {}, // Invalid record
    ];

    bulk1
      .insert('Account', records, {
        failOnError: false,
      })(state)
      .then(resultState => {
        const { data } = resultState;

        // Verify counts
        expect(data.totalProcessed).to.equal(3);
        expect(data.successCount).to.equal(2);
        expect(data.failureCount).to.equal(1);

        // Verify successful results
        expect(data.successfulResults).to.have.length(2);
        expect(data.successfulResults.map(r => r.id)).to.eql([
          '0015g00000LJ2wGAAT',
          '0015g00000LJ2wGBBT',
        ]);

        // Verify failed results
        expect(data.failedResults).to.have.length(1);
        expect(data.failedResults[0].errors).to.include(
          'Required field missing'
        );

        // Verify unprocessed records
        expect(data.unprocessedRecords).to.have.length(1);
        expect(data.unprocessedRecords[0].error).to.equal(
          'Required field missing'
        );

        done();
      })
      .catch(done);
  });
  it('should throw an error if failOnError is true and there are failures', done => {
    const fakeConnection = {
      bulk: {
        load: (sObject, operation, options, records) => {
          // Simulate mixed results: 2 success, 1 failure
          return Promise.resolve([
            { id: '0015g00000LJ2wGAAT', success: true, errors: [] },
            { id: '0015g00000LJ2wGBBT', success: true, errors: [] },
            { success: false, errors: ['Required field missing'] },
          ]);
        },
      },
    };
    setMockConnection(fakeConnection);
    const state = {};
    bulk1
      .insert('Account', [{ Name: 'Valid' }, {}], { failOnError: true })(state)
      .catch(error => {
        expect(error.message).to.contain('Required field missing');
        done();
      });
  });
});
