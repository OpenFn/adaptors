import { expect } from 'chai';

// Note that we test against the build here
import * as builders from '../src/builders';
import * as util from '../src/utils';
import output from './fixtures/output';
import input from './fixtures/input';

import fixtures from './fixtures';

describe('General', () => {
  it('should not try to map a value that is undefined', () => {
    const result = builders.patient('patient', {
      gender: undefined,
    });

    expect('gender' in result).be.false;
  });

  it('should not try to map a value that is null', () => {
    const result = builders.patient('patient', {
      gender: undefined,
    });

    expect('gender' in result).be.false;
  });

  it('should try to map a value that is 0', () => {
    const result = builders.patient('patient', {
      gender: 0,
    });

    expect(result.gender).to.equal(0);
  });

  it('should map a Reference string', () => {
    const result = builders.observation('patient-occupation-observation', {
      subject: 'patient/123',
    });

    expect(result.subject).to.eql({
      reference: 'patient/123',
    });
  });
});

// TODO: I want all these mapping types declared in the code somewhere
// https://docs.google.com/spreadsheets/d/1CYYhDy25Uc4-9fwtj7HHTPzBxIW480H6rRqP0ZKxYXI/edit?gid=1486293516#gid=1486293516
// Just for discoverablilty

describe('Encounter', () => {
  it.skip('should convert CDR to NDR', () => {
    const input = fixtures.cdr.encounter;

    util.setSystemMap({
      'http://cdr.aacahb.gov.et/Encounter':
        'http://moh.gov.et/fhir/hiv/identifier/encounter',
    });

    const visitType = util.findExtension(
      input,
      'http://cdr.aacahb.gov.et/visit-type'
    );

    const result = builders.encounter('target-facility-encounter', {
      id: input.id,
      status: input.status,
      class: input.class,
      identifier: input.identifier,
      // TODO I'm not sure how these map?
      serviceType: input.serviceType[0],
      period: input.period,
      subject: input.subject,
      // TODO why is this automated wrong?
      // is the test data wrong?
      serviceProvider: input.serviceProvider,

      // TODO this won't map the system properly right now
      // because we don't handle codeable concepts very smartly
      serviceType: {
        coding: input.serviceType.coding.slice(0, 1),
      },
      type: input.type,
      // visitType: visitType,
    });

    // Handle the visit type extension manually
    util.addExtension(
      result.type[0],
      'http://moh.gov.et/fhir/hiv/StructureDefinition/encounter-visit-type',
      util.concept([
        visitType.valueString,
        'http://moh.gov.et/fhir/hiv/CodeSystem/encounter-visit-type-code-system',
      ])
    ),
      console.log(result);

    expect(result).to.eql(fixtures.ndr.encounter);
  });

  // This is based on a mapping rule which might not last forever
  // But it shows a cool option we have for mappings
  it.skip('should default the serviceProvider', () => {
    const result = builders.encounter('target-facility-encounter', {});

    const expected = {
      reference: 'Organization/Patient.managingOrganization',
    };
    expect(result.serviceProvider).to.eql(expected);
  });

  it('should map a single identifier string', () => {
    const result = builders.encounter('target-facility-encounter', {
      identifier: [{ value: 'bob' }],
    });

    const expected = [
      {
        value: 'bob',
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
        system: 'http://cdr.aacahb.gov.et/Encounter',
      },
    ];
    expect(result.identifier).to.eql(expected);
  });
});

describe('Patient', () => {
  it('should convert CDR to NDR', () => {
    const input = fixtures.cdr.patient;

    // set system mappings - identifier should use this automagically
    util.setSystemMap({
      'http://cdr.aacahb.gov.et/SmartCareID':
        'http://moh.gov.et/fhir/hiv/identifier/SmartCareID',
      'http://cdr.aacahb.gov.et/MRN':
        'http://moh.gov.et/fhir/hiv/identifier/MRN',
      'http://cdr.aacahb.gov.et/UAN':
        'http://moh.gov.et/fhir/hiv/identifier/UAN',
    });

    // address mapping is a bit painful right now
    // but I think we can get this working from strings automatically
    const mapAddress = a => {
      if (/rural/i.test(a.text)) {
        const { text, ...address } = a;
        return {
          ...address,
          residentialType: util.concept(
            'Rural',
            util.coding('224804009', 'http://snomed.info/sct')
          ),
        };
      }
      return a;
    };

    const religion = util.findExtension(
      input,
      'http://hl7.org/fhir/StructureDefinition/patient-religion'
    ).valueCodeableConcept.coding[0];

    const result = builders.patient('patient', {
      id: input.id,
      religion: util.concept(
        religion.display,
        util.coding(
          religion.code,
          'http://terminology.hl7.org/CodeSystem/v3-ReligiousAffiliation'
        )
      ),
      identifier: input.identifier,
      name: input.name,
      telecom: input.telecom,
      gender: input.gender,
      birthDate: input.birthDate,
      maritalStatus: input.maritalStatus,
      managingOrganization: input.managingOrganization,
      address: input.address.map(mapAddress),
    });

    // console.log(result);

    expect(result).to.eql(fixtures.ndr.patient);
  });

  it('should set the address.residentialType extension', () => {
    const result = builders.patient('patient', {
      // address can be passed as a single object and it'll map to an array
      address: {
        line: ['my house'],
        // TODO should be able to get to here
        // residentialType: 'Rural',

        // ... but start here
        residentialType: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '224804009',
            },
          ],
          text: 'Rural',
        },
      },
    });

    expect(result.address).to.eql([
      {
        extension: [
          {
            url: 'http://moh.gov.et/fhir/hiv/StructureDefinition/residential-type',
            valueCodeableConcept: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '224804009',
                },
              ],
              text: 'Rural',
            },
          },
        ],
        line: ['my house'],
      },
    ]);
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

describe('Observation', () => {
  it('should default code', () => {
    const o = builders.observation('patient-occupation-observation', {});

    expect(o.code).to.eql({
      coding: [{ system: 'http://loinc.org', code: '85658-3' }],
      text: 'Occupation',
    });
  });

  it('should default category', () => {
    const o = builders.observation('patient-occupation-observation', {});
    expect(o.category[0]).to.eql({
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/observation-category',
          code: 'social-history',
        },
      ],
    });
  });

  it('should assign value', () => {
    const o = builders.observation('patient-occupation-observation', {
      value: util.concept(['value', 'system']),
    });
    expect(o.valueCodeableConcept).to.eql({
      coding: [
        {
          system: 'system',
          code: 'value',
        },
      ],
    });
  });
});

describe('MedicationDispense', () => {
  // TODO ensure medication maps to medicationReference
  it('should map medication -> medicationReference if medication is a resource', () => {
    const result = builders.medicationDispense('arv-medication-dispense', {
      medication: {
        id: 'abc',
        // need to bluff the builder
        resourceType: 'medication',
        meta: {},
      },
    });

    expect(result.medicationReference).to.eql({ reference: 'medication/abc' });
  });

  it('should map medication -> medicationReference if medication is a reference', () => {
    const result = builders.medicationDispense('arv-medication-dispense', {
      medication: util.reference('medication/abc'),
    });

    expect(result.medicationReference).to.eql({ reference: 'medication/abc' });
  });

  // it('should map from a cdr MedicationDispense', () => {
  //   const input = fixtures.cdr.medicationDispense;

  //   // Try and find a concept or reference in the  source to define the medication
  //   let ref;
  //     ref = input.medicationCodeableConcept.coding.find(({ system }) => system === 'http://cdr.aacahb.gov.et/hiv-regimen-codes')
  //       ref = ref.code;
  //     }
  //   }
  //     ref = input.reference;
  //   }

  //   const handover = util.findExtension(input, 'http://cdr.aacahb.gov.et/dose-end-date')

  //   const result = builders.medicationDispense('arv-medication-dispense', {
  //     id: input.id,
  //     status: input.status,
  //     subject: input.subject,
  //     context: input.context,
  //     quantity: input.quantity,
  //     daysSupply: input.daysSupply,
  //     whenHandedOver: handover.valueDateTime,

  //     // TODO: need to support reference as a reference or codeable concept
  //     // also I don't see reference on the incoming data example? is it context.reference?
  //     medication: ref,

  //     // TODO this should refer to the MedicationRequest created
  //     // Do we know what that is?
  //     //authorizingPrescription: {}
  //   })

  //   expect(result).to.eql(fixtures.ndr.medicationDispense)

  // })
});

// medication request
describe('Medication', () => {
  it('should map from a cdr Medication', () => {
    const input = fixtures.cdr.medication;

    const [coding] = input.form.coding;

    const result = builders.medication('arv-regimen-medication', {
      id: input.id,

      // Not sure how strict to be on mapping here?
      // First we need to map the system and coding: looks like
      // NDR uses a fixed system ofhttp://cdr.aacahb.gov.et/hiv-regimen-codes I think?
      // (seems cosmetic)
      code: util.concept(coding.display, [coding.code, coding.system]),
    });

    expect(result).to.eql(fixtures.ndr.medication);
  });
});

describe.skip('Care Plan', () => {
  it('should map from a cdr CarePlan', () => {
    const input = fixtures.cdr.careplan;

    const result = builders.carePlan('art-follow-up-careplan', {
      id: input.id,
      status: input.status,
      intent: input.intent,
      created: input.created,
      // maybe?
      reference: input.reference,
      subject: input.subject,
      encounter: input.encounter,

      // TODO how do we map activity?
      // need to handle backbone elements properly
    });

    // console.log(JSON.stringify(result, null, 2))

    // TODO category needs to be an array
    expect(result).to.eql(fixtures.ndr.careplan);
  });
});
