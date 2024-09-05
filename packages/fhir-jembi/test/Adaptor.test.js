import { expect } from 'chai';

// Note that we test against the build here
import * as builders from '../src/builders';
import { findExtension, builders as b } from '../src/Utils';
import output from './fixtures/output';
import input from './fixtures/input';

import fixtures from './fixtures';

describe('Encounter', () => {
  // TODO this is the full test
  it.skip('should map the whole input encounter', () => {
    // TODO this actually won't ever quite work
    // I think there will alway be some mappings, like visitType
    const result = builders.encounter(input.Encounter.resource);
    const expected = output.Encounter;

    console.log(result);

    expect(result).to.eql(expected);
  });

  it('should map a random encounter', () => {
    const i = input.Encounter.resource;
    // this is more like what job code will look like
    const result = builders.encounter('target-facility-encounter', {
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
    const result = builders.encounter('target-facility-encounter', {});

    const expected = {
      reference: 'Organization/Patient.managingOrganization',
    };
    expect(result.serviceProvider).to.eql(expected);
  });

  // this is smaller tests while working
  it('should map a single identifier string', () => {
    const result = builders.encounter('target-facility-encounter', {
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
    const result = builders.encounter('target-facility-encounter', {
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

describe('Patient', () => {
  it.only('should convert CDR to NDR', () => {
    const input = fixtures.cdr.patient;

    // This has to go in mapping code, but should be re-usable across types
    const mapIdentifiers = ids => {
      const map = {
        'http://cdr.aacahb.gov.et/SmartCareID':
          'http://moh.gov.et/fhir/hiv/identifier/SmartCareID',
        'http://cdr.aacahb.gov.et/MRN':
          'http://moh.gov.et/fhir/hiv/identifier/MRN',
        'http://cdr.aacahb.gov.et/UAN':
          'http://moh.gov.et/fhir/hiv/identifier/UAN',
      };

      return ids.map(id => ({
        ...id,
        system: map[id.system] ?? id.system,
      }));
    };

    const religion = findExtension(
      input.extension,
      'http://hl7.org/fhir/StructureDefinition/patient-religion'
    ).valueCodeableConcept.coding[0];

    const result = builders.patient('patient', {
      id: input.id,
      religion: b.concept(
        religion.display,
        b.coding(
          religion.code,
          'http://terminology.hl7.org/CodeSystem/v3-ReligiousAffiliation'
        )
      ),
      identifier: mapIdentifiers(input.identifier),
      name: input.name,
      telecom: input.telecom,
      gender: input.gender,
      birthDate: input.birthDate,
      maritalStatus: input.maritalStatus,
      managingOrganization: input.managingOrganization,
      address: input.address.map(a =>
        b.address({
          ...a,
          text: undefined, // remove the original text
          residentialType: a.text, // use the incoming text as the residential type
        })
      ),
    });

    expect(result).to.eql(fixtures.ndr.patient);
  });

  it('should set the religion extension', () => {
    const input = {
      religion: {
        // TODO: later, we we will out how to make it easier
        // to capture the coding here, because this is heavyweight
        coding: [
          {
            system:
              'http://terminology.hl7.org/CodeSystem/v3-ReligiousAffiliation',
            code: '1036',
          },
        ],
        text: 'Orthodox',
      },
    };

    const result = builders.patient('patient', {
      religion: input.religion,
    });

    expect(result.extension).to.eql([
      {
        url: 'http://hl7.org/fhir/StructureDefinition/patient-religion',
        valueCodeableConcept: {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/v3-ReligiousAffiliation',
              code: '1036',
            },
          ],
          text: 'Orthodox',
        },
      },
    ]);
  });

  it.skip('should map a random patient', () => {
    const input = {};

    // First off, there's only one patient type, so this string is not neccessary
    // We can make the builder smarter there
    const result = builders.patient('patient', {
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
});
