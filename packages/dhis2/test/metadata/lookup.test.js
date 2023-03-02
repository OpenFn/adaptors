import { expect } from 'chai';
import jp from 'jsonpath';
import path from 'node:path';
import data from '../../src/meta/data/metadata.json' assert { type: 'json' };
import extractLookups from '@openfn/parse-jsdoc';

let queries;

before(async () => {
  // Parse Adaptor.js and pull out all of its lookup queries
  queries = await extractLookups(
    path.resolve('src/types.ts'),
    path.resolve('src/Adaptor.js')
  );
});

describe('DHIS2 lookup tests', async () => {
  // Unit tests of each query against a sample model
  describe('create', () => {
    it('resourceType: should list resourceTypes', () => {
      const results = jp.query(data, queries.create.resourceType);
      // TODO the cached model is actually out of dae
      expect(results).to.have.lengthOf(4);
      expect(results).to.include('trackedEntityInstances');
      expect(results).to.include('events');
      expect(results).to.include('programs');
    });
  });

  // Query against a type interface
  // This sort of works but there's a lot of problems in the set up
  describe('Dhis2Data', () => {
    it('should list orgUnits', () => {
      const results = jp.query(data, queries.Dhis2Data.orgUnit);
      expect(results).to.have.lengthOf(1334);

      const [first] = results;
      expect(first.name).to.equal('y4kDUliaw7e');
      expect(first.type).to.equal('orgUnit');
    });
  });
});
