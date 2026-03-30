import { expect, assert } from 'chai';
import { builders } from '../../src/index';

const sampleBasic = {
  resourceType: 'Organization',
  meta: {
    profile: [
      'https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzOrganization',
    ],
  },
  active: true,
  type: [
    {
      coding: [
        {
          code: 'prov',
          system: 'http://terminology.hl7.org/CodeSystem/organization-type',
          display: 'Healthcare Provider',
        },
      ],
    },
  ],
  name: 'Mbabane Public Health Unit',
  alias: ['Mbabane PHU'],
};

describe('SzOrganization', () => {
  it('should create a simple SzOrganization', () => {
    const resource = builders.organization('SzOrganization', {});
    assert.isOk(resource);
  });

  it('should create a SzOrganization with default profile', () => {
    const resource = builders.organization({});
    assert.isOk(resource);
    assert.equal(resource.resourceType, 'Organization');
  });

  it('should pass active through', () => {
    const resource = builders.organization('SzOrganization', { active: true });
    assert.equal(resource.active, true);
  });

  it('should pass name through', () => {
    const resource = builders.organization('SzOrganization', {
      name: 'Mbabane Public Health Unit',
    });
    assert.equal(resource.name, 'Mbabane Public Health Unit');
  });

  it('should pass alias array through', () => {
    const resource = builders.organization('SzOrganization', {
      alias: ['Mbabane PHU'],
    });
    assert.deepEqual(resource.alias, ['Mbabane PHU']);
  });

  it('should map type coding object to a CodeableConcept', () => {
    const resource = builders.organization('SzOrganization', {
      type: {
        code: 'prov',
        system: 'http://terminology.hl7.org/CodeSystem/organization-type',
        display: 'Healthcare Provider',
      },
    });

    // skip narrative generation
    delete resource.text;

    assert.deepEqual(resource.type[0], {
      coding: [
        {
          code: 'prov',
          system: 'http://terminology.hl7.org/CodeSystem/organization-type',
          display: 'Healthcare Provider',
        },
      ],
    });
  });

  it('should map partOf string to a reference', () => {
    const resource = builders.organization('SzOrganization', {
      partOf: 'Organization/parent-org',
    });
    assert.deepEqual(resource.partOf, { reference: 'Organization/parent-org' });
  });

  it('should build the full sampleBasic resource', () => {
    const resource = builders.organization('SzOrganization', {
      active: true,
      name: 'Mbabane Public Health Unit',
      alias: ['Mbabane PHU'],
      type: {
        code: 'prov',
        system: 'http://terminology.hl7.org/CodeSystem/organization-type',
        display: 'Healthcare Provider',
      },
    });

    // skip narrative generation
    delete resource.text;

    assert.deepEqual(resource, sampleBasic);
  });
});
