import { expect, assert } from 'chai';
import { builders } from '../../src/index';

import patientExample from '../fixtures/Patient-simple.json' with { type: 'json' };

import { b } from '../../src/index';

describe('Patient', () => {
  it('should create a simple Patient', () => {
    const resource = builders.patient({
      identifier: b.identifier({}),
    });
    assert.isOk(resource);
  });

  it('should create an example Patient', () => {
    const resource = builders.patient({
      id: 'example',

      identifier: [
        {
          use: 'usual', // no code assist on value
          type: ['MR', 'http://terminology.hl7.org/CodeSystem/v2-0203'],
          // type: b.cc(['MR', 'http://terminology.hl7.org/CodeSystem/v2-0203']),
          system: 'urn:oid:1.2.36.146.595.217.0.1',
          value: '12345',
          period: { start: '2001-05-06' },
          assigner: {
            display: 'Acme Healthcare',
          },
        },
      ],
      active: true,

      // builder doesn't help here either
      // TODO what's up with the type error?
      name: [
        {
          use: 'official',
          family: 'Chalmers',
          given: ['Peter', 'James'],
        },
        {
          use: 'usual',
          given: ['Jim'],
        },
        {
          use: 'maiden',
          family: 'Windsor',
          given: ['Peter', 'James'],
          period: {
            end: '2002',
          },
        },
      ],
      gender: 'male', // TODO no value lookup,
      birthDate: '1974-12-25',
      _birthDate: b.ext(
        'http://hl7.org/fhir/StructureDefinition/patient-birthTime',
        '1974-12-25T14:35:45-05:00',
      ),
      deceased: false,
      // builder is no help here
      address: [
        {
          use: 'home',
          type: 'both',
          text: '534 Erewhon St PeasantVille, Rainbow, Vic  3999',
          line: ['534 Erewhon St'],
          city: 'PleasantVille',
          district: 'Rainbow',
          state: 'Vic',
          postalCode: '3999',
          period: {
            start: '1974-12-25',
          },
        },
      ],

      managingOrganization: 'Organization/1',
      telecom: [
        {
          system: 'phone',
          value: '(03) 5555 6473',
          use: 'work',
          rank: 1,
        },
      ],
    });
    expect(resource).to.eql(patientExample);
  });
});
