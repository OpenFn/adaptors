import { expect, assert } from 'chai';
import { builders } from '../../src/index';

const sampleBasic = {
  resourceType: 'Encounter',
  meta: {
    profile: [
      'http://172.209.216.154:3447/fhir/StructureDefinition/SzEncounter',
    ],
  },
  status: 'finished',
  subject: {
    reference: 'Patient/13EA147E-8E3B-498C-8D35-6FCB8BC6DEFB',
  },
  period: {
    start: '2023-10-01T10:00:00Z',
  },
  location: [
    {
      location: {
        reference: 'Location/H044',
      },
      status: 'completed',
    },
  ],
  serviceProvider: {
    reference: 'Organization/SampleSzOrganization',
  },
};

describe('SzEncounter', () => {
  it('should create a simple SzEncounter', () => {
    const resource = builders.encounter('SzEncounter', {});
    assert.isOk(resource);
  });

  it('should create a simple SzEncounter with default profile', () => {
    const resource = builders.encounter({});
    assert.isOk(resource);
  });

  it('should map class to an IG value', () => {
    const resource = builders.encounter('SzEncounter', {
      class: 'OPD',
    });
    assert.deepEqual(resource.class, {
      code: 'OPD',
      display: 'Outpatient Department',
      system:
        'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzEncounterClassificationCS',
    });
  });

  it('should map subject string to a reference', () => {
    const resource = builders.encounter('SzEncounter', {
      subject: 'Patient/13EA147E-8E3B-498C-8D35-6FCB8BC6DEFB',
    });
    assert.deepEqual(resource.subject, {
      reference: 'Patient/13EA147E-8E3B-498C-8D35-6FCB8BC6DEFB',
    });
  });

  it('should map serviceProvider string to a reference', () => {
    const resource = builders.encounter('SzEncounter', {
      serviceProvider: 'Organization/SampleSzOrganization',
    });
    assert.deepEqual(resource.serviceProvider, {
      reference: 'Organization/SampleSzOrganization',
    });
  });

  it('should pass period through', () => {
    const resource = builders.encounter('SzEncounter', {
      period: { start: '2023-10-01T10:00:00Z' },
    });
    assert.deepEqual(resource.period, { start: '2023-10-01T10:00:00Z' });
  });

  it('should pass location BackboneElement array through', () => {
    const resource = builders.encounter('SzEncounter', {
      location: [
        {
          location: { reference: 'Location/H044' },
          status: 'completed',
        },
      ],
    });
    assert.deepEqual(resource.location, [
      {
        location: { reference: 'Location/H044' },
        status: 'completed',
      },
    ]);
  });

  it('should pass participant array through', () => {
    const resource = builders.encounter('SzEncounter', {
      participant: [
        {
          individual: { reference: 'Practitioner/P001' },
        },
      ],
    });
    assert.deepEqual(resource.participant, [
      {
        individual: { reference: 'Practitioner/P001' },
      },
    ]);
  });

  it('should build the full sampleBasic resource', () => {
    const resource = builders.encounter('SzEncounter', {
      status: 'finished',
      subject: 'Patient/13EA147E-8E3B-498C-8D35-6FCB8BC6DEFB',
      period: { start: '2023-10-01T10:00:00Z' },
      location: [
        {
          location: { reference: 'Location/H044' },
          status: 'completed',
        },
      ],
      serviceProvider: 'Organization/SampleSzOrganization',
    });
    assert.deepEqual(resource, sampleBasic);
  });

   it.skip('should correctly map location', () => {
    const resource = builders.encounter('SzEncounter', {
      location: [
        {
          location: 'Location/H044',
          status: 'completed',
        },
      ],
    });
    assert.deepEqual(resource.location, [
      {
        location: { reference: 'Location/H044' },
        status: 'completed',
      },
    ]);
  });
   it.skip('should correctly map participant', () => {
    const resource = builders.encounter('SzEncounter', {
      participant: [
        {
          individual: 'Practitioner/P001',
        },
      ],
    });
    assert.deepEqual(resource.participant, [
      {
        individual: { reference: 'Practitioner/P001' },
      },
    ]);
  });

  // TODO: map to a base fhir 4 value (if they want those)
});
