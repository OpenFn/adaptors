import { expect, assert } from 'chai';
import { builders } from '../../src/index';

const sampleBasic = {
  resourceType: 'Procedure',
  meta: {
    profile: [
      'http://172.209.216.154:3447/fhir/StructureDefinition/SzProcedure',
    ],
  },
  status: 'completed',
  subject: {
    reference: 'Patient/13EA147E-8E3B-498C-8D35-6FCB8BC6DEFB',
  },
  category: {
    coding: [
      {
        code: 'treatment',
        system: 'https://terminology.hl7.org/CodeSystem/procedure-category',
        display: 'Treatment',
      },
    ],
    text: 'Treatment',
  },
  code: {
    coding: [
      {
        code: '123455',
        system: 'http://snomed.info/sct',
        display: 'Isoniazid Preventive Therapy',
      },
    ],
    text: 'Isoniazid Preventive Therapy',
  },
};

describe('SzProcedure', () => {
  it('should create a simple SzProcedure', () => {
    const resource = builders.procedure('SzProcedure', {});
    assert.isOk(resource);
  });

  it('should pass status through', () => {
    const resource = builders.procedure('SzProcedure', { status: 'completed' });
    assert.equal(resource.status, 'completed');
  });

  it('should map subject string to a reference', () => {
    const resource = builders.procedure('SzProcedure', {
      subject: 'Patient/13EA147E-8E3B-498C-8D35-6FCB8BC6DEFB',
    });
    assert.deepEqual(resource.subject, {
      reference: 'Patient/13EA147E-8E3B-498C-8D35-6FCB8BC6DEFB',
    });
  });

  it('should map category using array shorthand', () => {
    const resource = builders.procedure('SzProcedure', {
      category: [
        'treatment',
        'https://terminology.hl7.org/CodeSystem/procedure-category',
        { display: 'Treatment' },
      ],
    });
    assert.deepEqual(resource.category, {
      coding: [
        {
          code: 'treatment',
          system: 'https://terminology.hl7.org/CodeSystem/procedure-category',
          display: 'Treatment',
        },
      ],
      text: 'Treatment',
    });
  });

  it('should map code using array shorthand', () => {
    const resource = builders.procedure('SzProcedure', {
      code: ['123455', 'http://snomed.info/sct', { display: 'Isoniazid Preventive Therapy' }],
    });
    assert.deepEqual(resource.code, {
      coding: [
        {
          code: '123455',
          system: 'http://snomed.info/sct',
          display: 'Isoniazid Preventive Therapy',
        },
      ],
      text: 'Isoniazid Preventive Therapy',
    });
  });

  it('should build the full sampleBasic resource', () => {
    const resource = builders.procedure('SzProcedure', {
      status: 'completed',
      subject: 'Patient/13EA147E-8E3B-498C-8D35-6FCB8BC6DEFB',
      category: [
        'treatment',
        'https://terminology.hl7.org/CodeSystem/procedure-category',
        { display: 'Treatment' },
      ],
      code: ['123455', 'http://snomed.info/sct', { display: 'Isoniazid Preventive Therapy' }],
    });
    assert.deepEqual(resource, sampleBasic);
  });
});
