import { expect } from 'chai';

// Note that we test against the build here
import * as builders from '../dist/builders';
import output from './fixtures/output';
import input from './fixtures/input';

describe('Encounter', () => {
  // TODO this is the full test
  it('should map the whole input encounter', () => {
    const i = input.Encounter.resource;
    // this is more like what job code will look like
    const result = builders.createEncounter({
      id: i.id,
      identifier: i.identifier[0],
    });

    // TODO expected should soon be the output fixture
    // but obviously this test won't pass until we're done
    const expected = {
      id: 'e84781ed-5f02-40ac-8c97-e7280fb153e3',
      identifier: [
        {
          value: '7834',
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

  // this is smaller tests while working
  it('should map a single identifier string', () => {
    const result = builders.createEncounter({
      identifier: 'bob',
    });

    const expected = [
      {
        value: 'bob',
        system: 'http://moh.gov.et/fhir/hiv/identifier/encounter',
      },
    ];
    expect(result.identifier).to.eql(expected);
  });

  it('should map an array of identifiers', () => {
    const result = builders.createEncounter({
      // this is the whole array (of one item)
      identifier: input.Encounter.resource.identifier,
    });

    const expected = [
      {
        value: '7834',
        system: 'http://moh.gov.et/fhir/hiv/identifier/encounter',
      },
    ];
    expect(result.identifier).to.eql(expected);
  });
});
