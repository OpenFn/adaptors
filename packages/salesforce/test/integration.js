// For creds.json, See LP: Salesforce Demo Org (API user)
import { expect } from 'chai';
import configuration from '../tmp/creds.json' assert { type: 'json' };
import { execute, create, destroy, bulk, query } from '../dist/index.js';

const state = { configuration };

describe('Integration tests', () => {
  describe('bulk', () => {
    before(async () => {
      state.data = [{ name: 'Coco', vera__Active__c: 'No' }];
    });
    it('should create multiple sobjects', async () => {
      const { references, data } = await execute(
        bulk('Account', 'insert', state => state.data)
      )(state);

      console.log(references, data);
      expect(data.success).to.eq(true);
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
      const finalState = await execute(create('Account', state => state.data))(
        state
      );
      expect(finalState.data.filter(d => d.success).length).to.eq(2);
    }).timeout(5000);
  });

  describe('destroy', () => {
    it('should destroy a single sobject', async () => {
      const finalState = await execute([
        create('Account', { name: 'Coco', vera__Active__c: 'No' }),
        destroy('Account', state => state.data.id),
      ])(state);

      expect(finalState.data.success).to.eq(true);
    }).timeout(5000);

    it('should destroy multiple sobject', async () => {
      const { references, data } = await execute([
        create('Account', [
          { name: 'Coco', vera__Active__c: 'No' },
          { name: 'Melon', vera__Active__c: 'Yes' },
        ]),
        query("SELECT Id FROM Account WHERE Name IN ('Coco', 'Melon')"),
        destroy(
          'Account',
          state => {
            return state.data.records.map(d => d.Id);
          },
          {
            failOnError: true,
          }
        ),
      ])(state);

      expect(references.at(-2).filter(d => d.success).length).to.eq(2); // 2 accounts created
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
});
