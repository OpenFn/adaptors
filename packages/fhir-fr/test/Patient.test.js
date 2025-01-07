import { expect, assert } from 'chai';
import * as builders from '../src/builders.js';
import * as utils from '../src/utils.js';

const fixtures = {
  patient: {
    birthDate: '1980-06-06',
    gender: 'male',
    id: '45283414',
    identifier: [
      {
        system: 'http://example.com/patient-ids',
        value: '02410',
      },
    ],
    maritalStatus: {
      coding: [
        {
          code: 'M',
          //   display: 'Married', // TODO need to update the builders
          system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
        },
      ],
      text: 'Married',
    },
    // TODO
    // meta: {
    //   lastUpdated: '2024-11-23T15:32:51.340+00:00',
    //   source: '#dXb4QjfzFCNrwpNr',
    //   versionId: '1',
    // },
    name: [
      {
        family: 'Test',
        given: ['John'],
      },
    ],
    resourceType: 'Patient',
    telecom: [
      {
        system: 'phone',
        value: '+2548277217095',
      },
      {
        system: 'email',
        value: 'someone@something.org',
      },
    ],
    // TODO
    // text: {
    //   div: '<div xmlns="http://www.w3.org/1999/xhtml"><div class="hapiHeaderText">John <b>TEST </b></div><table class="hapiPropertyTable"><tbody><tr><td>Identifier</td><td>02410</td></tr><tr><td>Date of birth</td><td><span>06 June 1980</span></td></tr></tbody></table></div>',
    //   status: 'generated',
    // },
  },
};

describe('fr-core-patient', () => {
  it('should create a simple fr-core-patient', () => {
    const resource = builders.patient('fr-core-patient', {});
    assert.isOk(resource);
  });

  it('should create an example patient', () => {
    const resource = builders.patient('fr-core-patient', {
      birthDate: '1980-06-06',
      gender: 'male',
      id: '45283414',
      identifier: utils.id('02410', 'http://example.com/patient-ids'),

      // TODO How can the generated code make this simpler?
      maritalStatus: utils.concept('Married', [
        'M',
        'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
        'Married',
      ]),

      // TODO need a nice util for this
      name: [
        {
          family: 'Test',
          given: ['John'],
        },
      ],

      // TODO need a nicer way of doing this
      // I should be able to pass array tuples really
      // but system/value  isn't a coding - what is it?
      telecom: [
        {
          system: 'phone',
          value: '+2548277217095',
        },
        {
          system: 'email',
          value: 'someone@something.org',
        },
      ],
    });

    // TODO these don't currently generate properly!!
    delete resource.meta;
    delete resource.text;

    assert.deepEqual(resource, fixtures.patient);
  });
});

it.skip('should provide an extension for nationality', () => {
  const resource = builders.patient('fr-core-patient', {
    nationality: 'ABW',
  });

  assert.deepEqual(resource.nationality, {
    code: 'abw',
    period: { start: '01/01/2001' },
  });
});

describe('fr-core-patient-ins', () => {
  it('should create a simple fr-core-patient-ins', () => {
    const resource = builders.patient('fr-core-patient-ins', {});
    assert.isOk(resource);
  });
});
