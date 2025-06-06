import { expect } from 'chai';
import jp from 'jsonpath';
import path from 'node:path';
import data from '../fixtures/metadata.json' assert { type: 'json' };
import extractMagic from '@openfn/parse-jsdoc';

let queries;

before(async () => {
  // Parse Adaptor.js and pull out all of its lookup queries
  queries = await extractMagic(
    path.resolve('src/types.ts'),
    path.resolve('src/Adaptor.js')
  );
});

describe('DHIS2 lookup tests', async () => {
  // Unit tests of each query against a sample model
  describe('create', () => {
    it('resourceType: should list resourceTypes', () => {
      const results = jp.query(data, queries.create.path);
      expect(results).to.have.lengthOf(13);
      expect(results).to.include('trackedEntityInstances');
      expect(results).to.include('events');
      expect(results).to.include('programs');
    });
  });

  // Query against a type interface
  describe('Dhis2Data', () => {
    it('should list orgUnits', () => {
      const results = jp.query(data, queries.Dhis2Data.orgUnit);
      expect(results).to.have.lengthOf(1);

      const [first] = results;
      expect(first.name).to.equal('Rp268JB6Ne4');
      expect(first.type).to.equal('orgUnit');
      expect(first.label).to.equal('Adonkia CHP');
    });

    it('should list trackedEntityTypes', () => {
      const results = jp.query(data, queries.Dhis2Data.trackedEntityType);
      expect(results).to.have.lengthOf(1);

      const [first] = results;
      expect(first.name).to.equal('bVkFYAvoUCP');
      expect(first.type).to.equal('trackedEntityType');
      expect(first.label).to.equal('ARV commodity');
    });
  });

  describe('Dhis2Attribute', () => {
    it('should list atributes', () => {
      const results = jp.query(data, queries.Dhis2Attribute.attribute);
      expect(results).to.have.lengthOf(1);

      const [first] = results;
      expect(first.name).to.equal('DnrLSdo4hMl');
      expect(first.type).to.equal('attribute');
      expect(first.label).to.equal('Alternative name');
    });
  });
});
