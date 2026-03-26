import { expect, assert } from 'chai';
import { builders } from '../../src/index';

const sampleBasic = {
  resourceType: 'Practitioner',
  meta: {
    profile: [
      'https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzPractitioner',
    ],
  },
  gender: 'female',
  identifier: [
    {
      type: {
        coding: [
          {
            code: 'PI',
            system:
              'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzPersonIdentificationsCS',
            display: 'Personal ID Number',
          },
        ],
      },
      system: 'http://homeaffairs.sys',
      value: '9101010000001',
      use: 'official',
    },
  ],
  name: [
    {
      family: 'Dlamini',
      given: ['Thabile', 'Celiwe'],
    },
  ],
  birthDate: '1990-01-01',
  telecom: [
    {
      use: 'mobile',
    },
    {
      system: 'phone',
      value: '7911 1222',
      rank: 1,
    },
  ],
};

describe('SzPractitioner', () => {
  it('should create a simple SzPractitioner', () => {
    const resource = builders.practitioner('SzPractitioner', {});
    assert.isOk(resource);
  });

  it('should create a SzPractitioner with default profile', () => {
    const resource = builders.practitioner({});
    assert.isOk(resource);
    assert.equal(resource.resourceType, 'Practitioner');
  });

  it('should pass gender through', () => {
    const resource = builders.practitioner('SzPractitioner', {
      gender: 'female',
    });
    assert.equal(resource.gender, 'female');
  });

  it('should pass birthDate through', () => {
    const resource = builders.practitioner('SzPractitioner', {
      birthDate: '1990-01-01',
    });
    assert.equal(resource.birthDate, '1990-01-01');
  });

  it('should pass name array through', () => {
    const resource = builders.practitioner('SzPractitioner', {
      name: [{ family: 'Dlamini', given: ['Thabile', 'Celiwe'] }],
    });
    assert.deepEqual(resource.name, [
      { family: 'Dlamini', given: ['Thabile', 'Celiwe'] },
    ]);
  });

  it('should pass telecom array through', () => {
    const resource = builders.practitioner('SzPractitioner', {
      telecom: [
        { use: 'mobile' },
        { system: 'phone', value: '7911 1222', rank: 1 },
      ],
    });
    assert.deepEqual(resource.telecom, [
      { use: 'mobile' },
      { system: 'phone', value: '7911 1222', rank: 1 },
    ]);
  });

  it('should map identifier type shorthand to a coding', () => {
    const resource = builders.practitioner('SzPractitioner', {
      identifier: [
        {
          type: builders.concept([
            'PI',
            'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzPersonIdentificationsCS',
            {
              display: 'Personal ID Number',
            },
          ]),
          system: 'http://homeaffairs.sys',
          value: '9101010000001',
          use: 'official',
        },
      ],
    });
    assert.deepEqual(resource.identifier[0].type, {
      coding: [
        {
          code: 'PI',
          display: 'Personal ID Number',
          system:
            'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzPersonIdentificationsCS',
        },
      ],
    });
  });

  it('should build the full sampleBasic resource', () => {
    const resource = builders.practitioner('SzPractitioner', {
      gender: 'female',
      identifier: [
        {
          type: {
            coding: [
              {
                code: 'PI',
                system:
                  'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzPersonIdentificationsCS',
                display: 'Personal ID Number',
              },
            ],
          },
          system: 'http://homeaffairs.sys',
          value: '9101010000001',
          use: 'official',
        },
      ],
      name: [{ family: 'Dlamini', given: ['Thabile', 'Celiwe'] }],
      birthDate: '1990-01-01',
      telecom: [
        { use: 'mobile' },
        { system: 'phone', value: '7911 1222', rank: 1 },
      ],
    });
    assert.deepEqual(resource, sampleBasic);
  });
});
