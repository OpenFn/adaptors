// For creds.json, See LP: Salesforce Demo Org (API user)
import { expect } from 'chai';
import configuration from '../tmp/creds.json' assert { type: 'json' };
import {
  bulkQuery,
  execute,
  destroy,
  create,
  update,
  query,
  bulk,
  http,
  fn,
  bulk2,
} from '../src';

const state = { configuration };

describe('Integration tests', () => {
  describe('http', () => {
    describe('post', () => {
      it('should post a request to Salesforce', async () => {
        const { data } = await execute(
          http.post('/jobs/query', {
            operation: 'query',
            query: 'SELECT Id, Name FROM Account LIMIT 1000',
          })
        )(state);

        expect(data.operation).to.eq('query');
      }).timeout(5000);
    });
    describe('get', () => {
      it('should throw an error if path is absolute', async () => {
        try {
          await execute(http.get('https://www.google.com'))(state);
        } catch (error) {
          expect(error.code).to.eq('UNEXPECTED_ABSOLUTE_URL');
          expect(error.description).to.eq(
            'An absolute URL was provided (https://...) but only a path (/a/b/c) is supported'
          );
        }
      }).timeout(5000);
      it('fetches account updated information', async () => {
        const createStartandEndDate = (daysAgo = 20) => {
          const endDate = new Date();
          const startDate = new Date();
          startDate.setUTCDate(endDate.getUTCDate() - daysAgo); //Not more than 30 days ago

          return {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          };
        };
        const { startDate, endDate } = createStartandEndDate();

        const { data } = await execute(
          http.get('/services/data/v46.0/sobjects/Account/updated', {
            query: { start: startDate, end: endDate },
          })
        )(state);

        expect(data.latestDateCovered.split('T')[0]).to.eq(
          endDate.split('T')[0]
        );
      }).timeout(5000);
      it('fetches account information', async () => {
        const { data } = await execute(http.get('/sobjects/Account/describe'))(
          state
        );
        expect(data.name).to.eq('Account');
      }).timeout(5000);
      it('should throw an error if the path is invalid', async () => {
        try {
          await execute(http.get('/sobjects/Account/describe/invalid'))(state);
        } catch (error) {
          expect(error.errorCode).to.eq('NOT_FOUND');
          expect(error.message).to.eq('The requested resource does not exist');
        }
      }).timeout(5000);
    });
  });
  describe('query', () => {
    it('should throw an error', async () => {
      try {
        await execute(query('invalid-query'))(state);
      } catch (error) {
        expect(error.errorCode).to.eq('MALFORMED_QUERY');
        expect(error.data.message).to.eq("unexpected token: 'invalid'");
      }
    }).timeout(50000);

    it('should return 1000 records', async () => {
      const { response } = await execute(
        query('SELECT Id, Name FROM Account LIMIT 1000')
      )(state);

      expect(response.done).to.eq(true);
      expect(response.totalSize).to.eq(1000);
    }).timeout(5000);

    it('should return maximum of 10000 records by default', async () => {
      const { data, response } = await execute(
        query('SELECT Id, Name FROM Account')
      )(state);
      expect(response.done).to.eq(true);
      expect(data.length).to.greaterThan(2000);
      expect(response.totalSize).to.lessThanOrEqual(10000);
    }).timeout(10000);

    it('should return maximum of 2000 records if max is 2000', async () => {
      const { response } = await execute(
        query('SELECT Id, Name FROM Account', { max: 2000 })
      )(state);

      expect(response.done).to.eq(false);
      expect(response.totalSize).to.greaterThan(2000);
      expect(response.totalSize).to.lessThanOrEqual(10000);
      expect(response.nextRecordsUrl);
    }).timeout(10000);
  });

  describe('bulk', () => {
    before(async () => {
      state.data = [{ name: 'Coco', vera__Active__c: 'No' }];
    });
    it('should create multiple sobjects', async () => {
      const { data } = await execute(
        bulk('Account', 'insert', state => state.data)
      )(state);

      expect(data.success).to.eq(true);
    }).timeout(50000);

    it('should update multiple sobjects', async () => {
      state.data = [
        { id: '', name: 'Coco', vera__Active__c: 'Yes' },
        { id: '', name: 'Melon', vera__Active__c: 'No' },
      ];
      const { data } = await execute(
        bulkQuery("SELECT Id, Name FROM Account WHERE Name = 'Coco' LIMIT 2"),
        fn(state => {
          state.data = state.data.map(d => ({ Id: d.Id, Name: 'Melon' }));
          return state;
        }),
        bulk('Account', 'update', state => state.data)
      )(state);

      expect(data.success).to.eq(true);
      expect(data.completed.length).to.eq(2);
    }).timeout(50000);

    it('should fail if there is an error', async () => {
      state.data.push({ name: 'Aleksa', vera__Active__c: undefined });
      try {
        await execute(bulk('Account', 'insert', state => state.data))(state);
      } catch (error) {
        expect(error.message).to.eql(
          'REQUIRED_FIELD_MISSING:Required fields are missing: [vera__Active__c]:vera__Active__c --'
        );
      }
    }).timeout(50000);
  });

  describe('create', () => {
    it('should throw an error if input is invalid', async () => {
      [42, 'string', true].forEach(async input => {
        try {
          await execute(create('Account', input))(state);
        } catch (error) {
          expect(error.errorCode).to.eql('INVALID_FIELD');
          expect(error.message).to.contain(
            `Json Deserialization failed on token 'null' and has left off in the middle of parsing a row.`
          );
          expect(error.message).to.contain(
            'Will go to end of row to begin parsing the next row.'
          );
        }
      });

      [null, undefined].forEach(async input => {
        try {
          await execute(create('Account', input))(state);
        } catch (error) {
          console.log(error.message);
          expect(error.errorCode).to.eql('INVALID_FIELD');
          expect(error.message).to.eql(
            'Cannot convert undefined or null to object'
          );
        }
      });
    }).timeout(5000);
    it('should create a single sobject', async () => {
      state.data = { name: 'test', vera__Active__c: 'No' };

      const finalState = await execute(create('Account', state => state.data))(
        state
      );

      expect(finalState.data.success).to.eq(true);
    }).timeout(5000);

    it('should creates multiple sobject', async () => {
      state.data = [
        { name: 'Coco', vera__Active__c: 'No' },
        { name: 'Melon', vera__Active__c: 'Yes' },
      ];
      const { data } = await execute(create('Account', state => state.data))(
        state
      );

      expect(data.completed.length).to.eq(2);
      expect(data.success).to.eq(true);
    }).timeout(5000);
  });

  describe('update', () => {
    it('should update a single sobject', async () => {
      const { data } = await execute(
        query("Select Id, Name from Account where Name = 'test' limit 1"),
        update('Account', state => {
          const data = state.data.records[0];
          return {
            Id: data.Id,
            Name: 'new name',
            vera__Active__c: 'Yes',
          };
        })
      )(state);

      expect(data.success).to.eq(true);
    }).timeout(5000);

    it('should update multiple sobject', async () => {
      const { data } = await execute(
        create('Account', [
          { name: 'Coco', vera__Active__c: 'No' },
          { name: 'Melon', vera__Active__c: 'Yes' },
        ]),

        update('Account', state => {
          const data = state.data.completed.map(Id => ({
            Id,
            Name: 'new name',
            vera__Active__c: 'Yes',
          }));
          return data;
        })
      )(state);

      expect(data.success).to.eq(true);
    }).timeout(5000);
  });

  describe('destroy', () => {
    it('should destroy a single sobject', async () => {
      const finalState = await execute(
        create('Account', { name: 'Coco', vera__Active__c: 'No' }),
        destroy('Account', state => state.data.completed[0])
      )(state);

      expect(finalState.data.success).to.eq(true);
    }).timeout(5000);

    it('should destroy multiple sobject', async () => {
      const { data } = await execute(
        create('Account', [
          { name: 'Coco', vera__Active__c: 'No' },
          { name: 'Melon', vera__Active__c: 'Yes' },
        ]),

        destroy('Account', state => state.data.completed, {
          failOnError: true,
        })
      )(state);

      expect(data.success).to.eq(true);
    }).timeout(10000);

    it('should throw an error if the record does not exist', async () => {
      try {
        await execute(destroy('Account', 'no-id-here'))(state);
      } catch (error) {
        expect(error.errorCode).to.eql('NOT_FOUND');
        expect(error.message).to.eql(
          'Provided external ID field does not exist or is not accessible: no-id-here'
        );
      }
    }).timeout(5000);
  });
  describe('bulk2', () => {
    describe('query', () => {
      it('should query all records', async () => {
        const { data } = await execute(
          bulk2.query('SELECT Id, Name FROM Account')
        )(state);
        expect(data.length).to.greaterThan(8e3);
      }).timeout(5e5);
    });

    describe('insert', () => {
      it('should insert multiple records', async () => {
        state.data = [
          { Name: 'Bulk2 Test 1', vera__Active__c: 'No' },
          { Name: 'Bulk2 Test 2', vera__Active__c: 'Yes' },
        ];

        const { data } = await execute(
          bulk2.insert('Account', state => state.data)
        )(state);

        expect(data.successfulResults.length).to.eq(2);
        expect(data.failedResults.length).to.eq(0);
        expect(data.successfulResults[0].sf__Created).to.eq('true');
      }).timeout(5e4);

      it('should handle errors appropriately', async () => {
        const { data } = await execute(
          bulk2.insert('Account', [
            { Name: 'Invalid Record', vera__Active__c: undefined },
          ])
        )(state);

        expect(data.failedResults.length).to.eq(1);
        expect(data.failedResults[0].sf__Error).to.contain(
          'REQUIRED_FIELD_MISSING'
        );
      }).timeout(5e4);
    });

    describe('update', () => {
      it('should update multiple records', async () => {
        // First create records using bulk2.insert
        const { data: createResult } = await execute(
          bulk2.insert('Account', [
            { Name: 'Bulk2 Update Test 1', vera__Active__c: 'No' },
            { Name: 'Bulk2 Update Test 2', vera__Active__c: 'No' },
          ])
        )(state);

        const recordsToUpdate = createResult.successfulResults.map(record => ({
          Id: record.sf__Id,
          vera__Active__c: 'Yes',
        }));

        const { data } = await execute(
          bulk2.update('Account', recordsToUpdate)
        )(state);

        expect(data.successfulResults.length).to.eq(2);
        expect(data.failedResults.length).to.eq(0);
      }).timeout(5e4);
    });

    describe('destroy', () => {
      it('should delete multiple records', async () => {
        // First create records using bulk2.insert
        const { data: createResult } = await execute(
          bulk2.insert('Account', [
            { Name: 'Bulk2 Delete Test 1', vera__Active__c: 'No' },
            { Name: 'Bulk2 Delete Test 2', vera__Active__c: 'No' },
          ])
        )(state);

        const recordIdsToDelete = createResult.successfulResults.map(r => ({
          Id: r.sf__Id,
        }));

        const { data } = await execute(
          bulk2.destroy('Account', recordIdsToDelete)
        )(state);

        expect(data.successfulResults.length).to.eq(2);
        expect(data.failedResults.length).to.eq(0);
      }).timeout(5e4);
    });

    describe('upsert', () => {
      it('should upsert multiple records', async () => {
        const records = [
          {
            Name: 'Bulk2 Upsert Test 1',
            vera__Active__c: 'No',
            Id: '001Ke00000cTqRvIAK',
          },
          { Name: 'Bulk2 Upsert Test 2', vera__Active__c: 'Yes' },
        ];

        const { data } = await execute(bulk2.upsert('Account', 'Id', records))(
          state
        );

        expect(data.successfulResults.length).to.eq(2);
        expect(data.failedResults.length).to.eq(0);
      }).timeout(5e4);
    });
  });
  //   describe('bulk2', () => {
  //     it('should query all records', async () => {
  //       const { data } = await execute(
  //         bulk2.query('SELECT Id, Name FROM Account')
  //       )(state);
  //       expect(data.length).to.greaterThan(8e3);
  //     }).timeout(5e5);

  //     it('should insert multiple records', async () => {
  //       state.data = [
  //         { Name: 'Bulk2 Test 1', vera__Active__c: 'No' },
  //         { Name: 'Bulk2 Test 2', vera__Active__c: 'Yes' },
  //       ];

  //       const { data } = await execute(
  //         bulk2.insert('Account', state => state.data)
  //       )(state);

  //       expect(data.successfulResults.length).to.eq(2);
  //       expect(data.failedResults.length).to.eq(0);
  //       expect(data.successfulResults[0].sf__Created).to.eq('true');
  //     }).timeout(5e4);

  //     it('should update multiple records', async () => {
  //       // First create records using bulk2.insert
  //       const { data: createResult } = await execute(
  //         bulk2.insert('Account', [
  //           { Name: 'Bulk2 Update Test 1', vera__Active__c: 'No' },
  //           { Name: 'Bulk2 Update Test 2', vera__Active__c: 'No' },
  //         ])
  //       )(state);

  //       const recordsToUpdate = createResult.successfulResults.map(record => ({
  //         Id: record.sf__Id,
  //         vera__Active__c: 'Yes',
  //       }));

  //       const { data } = await execute(bulk2.update('Account', recordsToUpdate))(
  //         state
  //       );

  //       expect(data.successfulResults.length).to.eq(2);
  //       expect(data.failedResults.length).to.eq(0);
  //     }).timeout(5e4);

  //     it('should delete multiple records', async () => {
  //       // First create records using bulk2.insert
  //       const { data: createResult } = await execute(
  //         bulk2.insert('Account', [
  //           { Name: 'Bulk2 Delete Test 1', vera__Active__c: 'No' },
  //           { Name: 'Bulk2 Delete Test 2', vera__Active__c: 'No' },
  //         ])
  //       )(state);

  //       const recordIdsToDelete = createResult.successfulResults.map(r => ({
  //         Id: r.sf__Id,
  //       }));

  //       const { data } = await execute(
  //         bulk2.destroy('Account', recordIdsToDelete)
  //       )(state);

  //       expect(data.successfulResults.length).to.eq(2);
  //       expect(data.failedResults.length).to.eq(0);
  //     }).timeout(5e4);

  //     it('should handle errors appropriately', async () => {
  //       const { data } = await execute(
  //         bulk2.insert('Account', [
  //           { Name: 'Invalid Record', vera__Active__c: undefined },
  //         ])
  //       )(state);

  //       expect(data.failedResults.length).to.eq(1);
  //       expect(data.failedResults[0].sf__Error).to.contain(
  //         'REQUIRED_FIELD_MISSING'
  //       );
  //     }).timeout(5e4);

  //     it('should upsert multiple records', async () => {
  //       const records = [
  //         {
  //           Name: 'Bulk2 Upsert Test 1',
  //           vera__Active__c: 'No',
  //           Id: '001Ke00000cTqRvIAK',
  //         },
  //         { Name: 'Bulk2 Upsert Test 2', vera__Active__c: 'Yes' },
  //       ];

  //       const { data } = await execute(bulk2.upsert('Account', 'Id', records))(
  //         state
  //       );

  //       expect(data.successfulResults.length).to.eq(2);
  //       expect(data.failedResults.length).to.eq(0);
  //     }).timeout(5e4);
  //   });
});
