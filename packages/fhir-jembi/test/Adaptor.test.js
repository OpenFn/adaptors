import { expect } from 'chai';

// Note that we test against the build here
import * as builders from '../dist/builders';
import output from './fixtures/output';
import input from './fixtures/output';

describe('Encounter', () => {
  it('should map an encounter', () => {
    // this is more like what job code will look like
    const result = builders.createEncounter({
      id: input.Encounter.id,
      identifier: input.Encounter.identifier[0],
    });

    const expected = {
      id: 'GeneralEncounterExample',
      identifier: [
        {
          value: '001',
          system: 'http://moh.gov.et/fhir/hiv/identifier/encounter',
        },
      ],
      meta: {
        profile: [
          'http://moh.gov.et/fhir/hiv/StructureDefinition/target-facility-encounter',
        ],
      },
    };

    expect(result).to.eql(expected);

    // TODO result should equal output.Encounter
  });
});
