import { expect } from 'chai';

import * as builders from '../src/builders';
import * as util from '../src/utils';

import fixtures from './fixtures';


describe('Resource Mapping', () => {

  it('should map Patient', () => {
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

  it('should match Related Person', () => {
    const input = fixtures.cdr.patient;

    const result = builders.relatedPerson('related-person', {
      id: 'ChildRelatedPersonExample',
      patient: input,
      // TODO where will this information come from?
      relationship: util.concept('Child', ['CHILD', 'http://terminology.hl7.org/CodeSystem/v3-RoleCode']),
      name: [{
        family : "Adams",
        given : ["Mary"]
      }],
      gender: "female",
      birthDate: "1973-04-12",
    })

    expect(result).to.eql(fixtures.ndr.relatedChild);
  })

  it('should map Observation (highest education)', () => {
    const input = fixtures.cdr.patient;

    const ext = util.findExtension(input, "http://cdr.aacahb.gov.et/EducationalLevel")

    const result = builders.observation('highest-education-observation', {
      status: input.status ?? 'final',
      effective: input.period?.start,
      value: ext.valueString,
      subject: input.id,
    })

    expect(result).to.eql(fixtures.ndr.observationEducation);
  })

  it('should map Observation (patient occupation)', () => {
    const input = fixtures.cdr.patient;

    const ext = util.findExtension(
      input,
      'http://cdr.aacahb.gov.et/Occupation'
    );

    const result = builders.observation('patient-occupation-observation', {
      status: input.status ?? 'final',
      effective: input.period?.start,
      value: util.concept(ext.valueString),
      subject: input.id,
    })

    expect(result).to.eql(fixtures.ndr.observationOccupation);
  })

  it('should map Observation (target population)', () => {
    const input = fixtures.cdr.patient;

    const ext = util.findExtension(
      input,
      'http://cdr.aacahb.gov.et/TargetPopulationGroup'
    );

    const result = builders.observation('target-population-observation', {
      status: input.status ?? 'final',
      effective: input.period?.start,
      value: ext.valueString,
      subject: input.id,
    })

    expect(result).to.eql(fixtures.ndr.observationPopulation);
  })

  // TODO: some display labels/text doesn't map quite right, see data. Is this important?
  it('should map Encounter (target-facility-encounter)', () => {
    const input = fixtures.cdr.encounter;

    util.setSystemMap({
      'http://cdr.aacahb.gov.et/Encounter':
        'http://moh.gov.et/fhir/hiv/identifier/encounter',
      'http://terminology.hl7.org/CodeSystem/service-type':
        'http://moh.gov.et/fhir/hiv/CodeSystem/encounter-service-type-code-system'
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
      period: input.period,
      subject: input.subject,
      serviceProvider: input.serviceProvider,

      // TODO this won't map the system properly right now
      // because we don't handle codeable concepts very smartly
      serviceType: {
        coding: input.serviceType.coding.slice(0, 1).map((coding) => ({
          ...coding,
          system: "http://moh.gov.et/fhir/hiv/CodeSystem/encounter-service-type-code-system"
        })),
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

    expect(result).to.eql(fixtures.ndr.encounter);
  })

  // TODO I don't really have an example. I don't think it's much different though?
  it.skip('should map Encounter (outside-target-facility)', () => {});

  it('should map Medication Dispense - ARV', () => {
    const input = fixtures.cdr.medicationDispense;

    // Try and find a concept or reference in the  source to define the medication
    let ref;
    if (input.medicationCodeableConcept) {
      ref = input.medicationCodeableConcept.coding.find(({ system }) => system === 'http://cdr.aacahb.gov.et/hiv-regimen-codes')
      if (ref) {
        ref = ref.code;
      }
    } else if (input.reference) {
      ref = input.reference;
    }

    const handover = util.findExtension(input, 'http://cdr.aacahb.gov.et/dose-end-date')

    const result = builders.medicationDispense('arv-medication-dispense', {
      id: input.id,
      status: input.status,
      subject: input.subject,
      context: input.context,
      quantity: input.quantity,
      daysSupply: input.daysSupply,
      whenHandedOver: handover.valueDateTime,

      // TODO: need to support reference as a reference or codeable concept
      // also I don't see reference on the incoming data example? is it context.reference?
      medication: ref,


      // TODO this should refer to the MedicationRequest created
      // Do we know what that is?
      //authorizingPrescription: {}
    })

    expect(result).to.eql(fixtures.ndr.medicationDispense)
  })

  // TODO: handle activity (as array of Backbone Elements)
  it('should map CarePlan - ARV Treatment', () => {
    const input = fixtures.cdr.careplan;


    const result = builders.carePlan('art-follow-up-careplan', {
      id: input.id,
      status: input.status,
      intent: input.intent,
      created: input.created,
      reference: input.reference,
      subject: input.subject,
      encounter: input.encounter,

      // TODO how do we map activity?
      // need to handle backbone elements properly
    })

    // console.log(JSON.stringify(result, null, 2))
    
    // TODO category needs to be an array
    expect(result).to.eql(fixtures.ndr.careplan)
  })

  it('should map MedicationRequest - ARV', () => {
    // for this to work we need a set of CDR resources
    const dispense = fixtures.cdr.medicationDispense;
    const request = fixtures.cdr.medicationRequest;
    const plan = fixtures.cdr.careplan;
    const medication = fixtures.cdr.medication;

    const result = builders.medicationRequest('arv-medication-request', {
      // id: TODO shoudl we generate ids?

      // TODO: we should be able to pass a string here and the adaptor just handles it
      medication: util.ref(medication),
      
      // TODO this should just be `reason` (which accepts a reference)
      // TODO dispense.statusReasonCodeableConcept must be converted to an observrtion and referenced here
      reasonReference: util.ref('observartion/arv-regimen-changed-observation'),

      basedOn: util.ref(plan),
      
      // TODO this one isn't mapping at all
      // should just take a simple assignment?
      dispenseRequest: {
        quanity: dispense.quantity
      },

      status: 'completed', // hard-coded
      intent: 'order', // hard-coded

      // TODO is this right - the identifier comes from the request? spreadsheet isn't clear
      identifier: request.identifier,

      doNotPerform: true, // where does this map from?

      // TODO I should be able to pass a whole resource into reference and it'll ref the id
      subject: util.ref(dispense.subject),
      encounter: util.ref(dispense.context),

      // TODO where do I map this from?
      // authoredOn: 
    })

    expect(result).to.eql(fixtures.ndr.medicationRequest)
  });

  it('should map Medication - Represents an ARV Regimen', () => {
    const input = fixtures.cdr.medication;

    const [coding] = input.form.coding;

    const result = builders.medication('arv-regimen-medication', {

      id: input.id,

      // Not sure how strict to be on mapping here?
      // First we need to map the system and coding: looks like
      // NDR uses a fixed system ofhttp://cdr.aacahb.gov.et/hiv-regimen-codes I think?
      // (seems cosmetic)
      code: util.concept(coding.display, [coding.code, coding.system])

    })

    expect(result).to.eql(fixtures.ndr.medication)
  })

  // TODO: I can't work out what I'm mapping value to
  it('should map Observation - ART Followup Status', () => {
    const input = fixtures.cdr.medicationDispense;

    // hmm, I've taken this from the sheet but it doesn't feel right
    const ext = util.findExtension(input, 'http://cdr.aacahb.gov.et/medication-stopped-reason')

    const encounter =  {
      id: 'Encounter/e84781ed-5f02-40ac-8c97-e7280fb153e3',
      period: {
        start:  "2024-01-25",
        end:  "2024-01-25",
      },
      serviceProvider: {
        reference: 'Organization/5852'
      }
    }

    const result = builders.observation('art-followup-status-observation', {
      // id: ??
      status: "final",
      subject: input.subject,
      encounter: input.context,
      effective: encounter.period.start,

      performer: encounter.serviceProvider,

      // TODO this won't do anything in the test
      value: ext && util.concept(ext)
    
    })

    expect(result).to.eql(fixtures.ndr.observationFollowup)
  })

  // TODO This isnt' a good test - values are missing and data is handwritten
  it('should map Observation - ARV Regimen Change', () => {
    const input = fixtures.cdr.medicationDispense;
    // this is a fake encounter, referenced by input.context
    const encounter =  {
      id: 'Encounter/e84781ed-5f02-40ac-8c97-e7280fb153e3',
      period: {
        start:  "2024-01-25",
        end:  "2024-01-25",
      },
      serviceProvider: {
        reference: 'abc'
      }
    }

    const result = builders.observation('arv-regimen-changed-observation', {
      status: 'final',
      subject: input.subject,
      encounter: input.context,

      effectiveDateTime: encounter.period.start,
      // TODO I don't think this maps to effectivePeriod
      // effective: encounter.period

      performer: encounter.serviceProvider

      // TODO again. I'm not sure where value is coming from
      // value:
      // hasMember

    })

    // console.log(JSON.stringify(result, null, 2))

    expect(result).to.eql(fixtures.ndr.observationRegimenChanged)
  })

  it('should map Observation - ARV Regimen Reason', () => {
    const input = fixtures.cdr.medicationDispense;

    // fake encounter for more plausible mapping
    const encounter =  {
      id: 'Encounter/e84781ed-5f02-40ac-8c97-e7280fb153e3',
      period: {
        start:  "2024-01-25",
        end:  "2024-01-25",
      },
      serviceProvider: {
        reference: 'abc'
      }
    }

    // TODO don't have data for this, so fake it. But this doesn't feel right to me
    let reason = util.findExtension(input, 'http://cdr.aacahb.gov.et/switch-reason')
    if (!reason) {
      reason = {
        display: "Virologic-Failure",
        code: "1234",
        url: "http://cdr.aacahb.gov.et/switch-reason"
      }
    }

    // TODO this mapping is super sketchy
    // It's OK for this test but how will we handle this in mapping code?
    const value = util.concept(reason.display, ["http://loinc.org", reason.code /*wrong code*/])

    // TO the value concept, we add an extension whose value is itself a concept
    // confusing
    // again, I don't know where values are mapping from here
    util.addExtension(
      value,
      "http://moh.gov.et/fhir/hiv/StructureDefinition/cd4-vl-classification-for-treatment-failure",
      util.concept([
        'http://moh.gov.et/fhir/hiv/CodeSystem/cd4-vl-classification-for-treatment-failure-code-system',
        reason.code
      ]))

    
    const result = builders.observation('arv-regimen-change-reason-observation', {
      status: 'final',
      value,
      subject: input.subject,
      encounter: input.context,
      effectiveDateTime: encounter.period.start,
      performer: encounter.serviceProvider
    });
    
    expect(result).to.eql(fixtures.ndr.observationRegimenChangedReason)
  });

  it('should map ARV Regimen Category Type', () => {
    const input = fixtures.cdr.medicationDispense;

    // fake encounter for more plausible mapping
    const encounter =  {
      id: 'Encounter/e84781ed-5f02-40ac-8c97-e7280fb153e3',
      period: {
        start:  "2024-01-25",
        end:  "2024-01-25",
      },
      serviceProvider: {
        reference: 'abc'
      }
    }

    // TODO this should be mapped out of extensions
    const switchType = {
      valueString: "abc" // TODO plausible value?
    }

    const result = builders.observation('arv-change-category-type-observation', {
      status: 'final',
      subject: input.subject,
      encounter: input.context,
      effective: encounter.period.start,
      performer: encounter.serviceProvider,
      
      value: switchType.valueString
    });
    // console.log(JSON.stringify(result, null, 2))
    expect(result).to.eql(fixtures.ndr.observationCategoryType)
  })

  // TODO no data for this one again, but it's a straightforward operation
  it.skip('should map Observation - Reason HIV Treatment Stopped', () => {

  })

  it('should map Medication Administration - ARV', () => {
    const dispense = fixtures.cdr.medicationDispense;
    const request = fixtures.cdr.medicationRequest;
    const encounter =  {
      id: 'Encounter/e84781ed-5f02-40ac-8c97-e7280fb153e3',
      period: {
        start:  "2012-12-09",
        end:  "2013-04-08",
      },
    }

    //  TMP - force this in and it should parse
    dispense.medication = {
      "reference": "Medication/ARVMedicationExample"
    }
    
    const result = builders.medicationAdministration('arv-medication-administration', {
      id: 'ARVMedicationAdministrationExample', // where does this come from?
      status: 'completed',
      medication: dispense.medication,
      subject: dispense.subject,
      context: dispense.context,
      request: util.reference(request),
      effective: encounter.period,

      // TODO what about note?
      // No mappings in spreadsheet

    })

    // console.log(JSON.stringify(result, null, 2))

    expect(result).to.eql(fixtures.ndr.medicationAdmin)
  })

});
