import { expect } from 'chai';
import jp from 'jsonpath';
import path from 'node:path';
import data from '../fixtures/metadata.json' assert { type: 'json' };
import extractMagic from '@openfn/parse-jsdoc';

let queries;

before(async () => {
  // Parse Adaptor.js and pull out all of its lookup queries
  queries = await extractMagic(path.resolve('src/Adaptor.js'));
});

describe('Salesforce lookup tests', async () => {
  // Unit tests of each query against the cached metadata
  describe('upsert', () => {
    it('sObject: should list non-system sObject names', () => {
      const results = jp.query(data, queries.upsert.sObjectName);
      // Note that there are two sobjects in the model - this should correctly just return 1
      expect(results).to.have.lengthOf(1);
      expect(results).to.include('vera__Beneficiary__c');
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
