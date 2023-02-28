import { expect } from 'chai';
import jp from 'jsonpath';
import path from 'node:path';
import data from '../../src/meta/data/metadata.json' assert { type: 'json' };
import extractLookups from '@openfn/parse-jsdoc';

let queries;

before(async () => {
  // Parse Adaptor.js and pull out all of its lookup queries
  queries = await extractLookups(path.resolve('src/Adaptor.js'));
});

describe('DHIS2 lookup tests', async () => {
  // Unit tests of each query against a sample model
  describe('create', () => {
    it('should list resourceTypes', () => {
      const results = jp.query(data, queries.create.resourceType);
      expect(results).to.have.lengthOf(4);
      expect(results[0]).to.equal('trackedEntityInstances');
    });

    // TODO what about testing the lookups on the typescript though?
  });
});
