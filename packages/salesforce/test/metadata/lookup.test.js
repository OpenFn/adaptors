import { expect } from 'chai';
import jp from 'jsonpath';
import path from 'node:path';
// TODO shoul we not just use the checked in metadata object?
import data from './sample-model.json' assert { type: 'json' };
import extractLookups from '@openfn/parse-jsdoc';

let queries;

before(async () => {
  // Parse Adaptor.js and pull out all of its lookup queries
  queries = await extractLookups(path.resolve('src/Adaptor.js'));
});

describe('Salesforce lookup tests', async () => {
  // Unit tests of each query against a sample model
  describe('upsert', () => {
    it('sObject: should list non-system sObject names', () => {
      const results = jp.query(data, queries.upsert.sObject);
      expect(results).to.have.lengthOf(1);
      expect(results[0]).to.equal('vera__Beneficiary__c');
    });

    it('externalId: should find a matching field in an sobject', () => {
      // swap out the templated value
      const query = queries.upsert.externalId.replace(
        '{{args.sObject}}',
        'vera__Beneficiary__c'
      );
      const results = jp.query(data, query);

      expect(results).to.have.lengthOf(1);
      expect(results[0]).to.equal('vera__GHI_ID_Number__c');
    });
  });
});
