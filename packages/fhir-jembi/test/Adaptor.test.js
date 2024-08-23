import { expect } from 'chai';

// Note that we test against the build here
import * as builders from '../dist/builders';
import output from './fixtures/output';
import input from './fixtures/input';

describe('Encounter', () => {
  // TODO this is the full test
  it.only('should map the whole input encounter', () => {
    // TODO this actually won't ever quite work
    // I think there will alway be some mappings, like visitType
    const result = builders.createEncounter(input.Encounter.resource);

    const expected = output.Encounter;

    console.log(result);

    expect(result).to.eql(expected);
  });

  it('should map a random encounter', () => {
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
      resourceType: 'Encounter',
      identifier: [
        {
          value: '7834',
          system: 'http://moh.gov.et/fhir/hiv/identifier/encounter',
        },
      ],
      serviceProvider: {
        reference: 'Organization/Patient.managingOrganization',
      },
      meta: {
        profile: [
          'http://moh.gov.et/fhir/hiv/StructureDefinition/target-facility-encounter',
        ],
      },
    };

    expect(result).to.eql(expected);

    // TODO result should equal output.Encounter
  });

  // This is based on a mapping rule which might not last forever
  // But it shows a cool option we have for mappings
  it('should default the serviceProvider', () => {
    const result = builders.createEncounter({});

    const expected = {
      reference: 'Organization/Patient.managingOrganization',
    };
    expect(result.serviceProvider).to.eql(expected);
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
