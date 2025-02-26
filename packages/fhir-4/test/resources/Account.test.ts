import { expect, assert } from 'chai';
import { builders, b } from '../../src/index';

// https://hl7.org/fhir/R4B/account-example.json
const Account = {
  resourceType: 'Account',
  id: 'example',
  //   text: {
  //     status: 'generated',
  //     div: '<div xmlns="http://www.w3.org/1999/xhtml">HACC Funded Billing for Peter James Chalmers</div>',
  //   },
  identifier: [
    {
      system: 'urn:oid:0.1.2.3.4.5.6.7',
      value: '654321',
    },
  ],
  status: 'active',
  type: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
        code: 'PBILLACCT',
        display: 'patient billing account',
      },
    ],
    text: 'patient',
  },
  name: 'HACC Funded Billing for Peter James Chalmers',
  subject: [
    {
      reference: 'Patient/example',
      display: 'Peter James Chalmers',
    },
  ],
  servicePeriod: {
    start: '2016-01-01',
    end: '2016-06-30',
  },
  coverage: [
    {
      coverage: {
        reference: 'Coverage/7546D',
      },
      priority: 1,
    },
  ],
  owner: {
    reference: 'Organization/hl7',
  },
  description: 'Hospital charges',
};

describe('Account', () => {
  it('should create a simple Account', () => {
    const resource = builders.account({});
    assert.isOk(resource);
  });

  it('should create an example Account', () => {
    const resource = builders.account({
      id: 'example',
      identifier: {
        system: 'urn:oid:0.1.2.3.4.5.6.7',
        value: '654321',
      },
      status: 'active',
      type: b.cc(
        [
          'PBILLACCT',
          'http://terminology.hl7.org/CodeSystem/v3-ActCode',
          { display: 'patient billing account' },
        ],
        { text: 'patient' }
      ),
      name: 'HACC Funded Billing for Peter James Chalmers',
      subject: b.ref('Patient/example', {
        display: 'Peter James Chalmers',
      }),
      servicePeriod: {
        start: '2016-01-01',
        end: '2016-06-30',
      },
      coverage: [
        {
          coverage: {
            reference: 'Coverage/7546D',
          },
          priority: 1,
        },
      ],
      owner: 'Organization/hl7',
      description: 'Hospital charges',
    });

    expect(resource).to.eql(Account);
  });
});
