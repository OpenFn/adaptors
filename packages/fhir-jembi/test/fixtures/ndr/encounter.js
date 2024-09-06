export default {
  resourceType: 'Encounter',
  id: 'c5e7c7866308476cb3920d947da2a114',
  meta: {
    profile: [
      'http://moh.gov.et/fhir/hiv/StructureDefinition/target-facility-encounter',
    ],
  },
  // text: {
  //   status: 'generated',
  //   div: '<div xmlns="http://www.w3.org/1999/xhtml"><p class="res-header-id"><b>Generated Narrative: Encounter EncounterWithEntryPointANCExample</b></p><a name="EncounterWithEntryPointANCExample"> </a><a name="hcEncounterWithEntryPointANCExample"> </a><a name="EncounterWithEntryPointANCExample-en-US"> </a><p><b>identifier</b>: <code>http://moh.gov.et/fhir/hiv/identifier/encounter</code>/001</p><p><b>status</b>: Finished</p><p><b>class</b>: <a href="http://terminology.hl7.org/6.0.2/CodeSystem-v3-ActCode.html#v3-ActCode-OBSENC">ActCode</a> OBSENC: observation encounter</p><p><b>type</b>: <span title="Codes:{http://snomed.info/sct 390906007}">Follow-up encounter</span></p><p><b>subject</b>: <a href="Patient-PatientWithSexPartnerRelationshipExample.html">Mark Adams  Male, DoB: 2000-11-11 ( http://moh.gov.et/fhir/hiv/identifier/MRN#MRN12345672)</a></p><p><b>period</b>: 2012-12-09 --&gt; 2012-12-09</p><h3>Locations</h3><table class="grid"><tr><td style="display: none">-</td><td><b>Location</b></td></tr><tr><td style="display: none">*</td><td><a href="Location-EncounterLocationANCExample.html">Location ANC</a></td></tr></table><p><b>serviceProvider</b>: <a href="Organization-CurrentServiceProviderExample.html">Organization Meshwalkiya Health Center</a></p></div>',
  // },
  identifier: [
    {
      system: 'http://moh.gov.et/fhir/hiv/identifier/encounter',
      value: '7834',
    },
  ],
  status: 'finished',
  class: {
    system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
    code: 'AMB',
    display: 'ambulatory', // JC added from input - presume is harmless
  },
  type: [
    {
      extension: [
        {
          url: 'http://moh.gov.et/fhir/hiv/StructureDefinition/encounter-visit-type',
          valueCodeableConcept: {
            coding: [
              {
                system:
                  'http://moh.gov.et/fhir/hiv/CodeSystem/encounter-visit-type-code-system',
                code: 'unscheduled',
              },
            ],
          },
        },
      ],
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '769681006',
          display: 'First encounter by subject', // JC added by me
        },
      ],
      //text: 'First encounter by subject',
      text: 'First Encounter',
    },
  ],
  subject: {
    reference: 'Patient/b335d5b78135460d92b34a856d998493',
  },
  serviceType: {
    coding: [
      {
        system:
          'http://moh.gov.et/fhir/hiv/CodeSystem/encounter-service-type-code-system',
        code: '536',
        display: 'Art therapy', // JC kept the display string
      },
    ],
  },
  period: {
    start: '2004-10-05 00:00:00.000',
    end: '2004-10-05 00:00:00.000',
  },
  serviceProvider: {
    reference: 'Organization/CurrentServiceProviderExample',
  },
};
