export default {
  resourceType: 'Patient',
  id: 'b335d5b78135460d92b34a856d998493',
  meta: {
    profile: ['http://moh.gov.et/fhir/hiv/StructureDefinition/patient'],
  },
  // text: {
  //   status: 'generated',
  //   div: '<div xmlns="http://www.w3.org/1999/xhtml"><p class="res-header-id"><b>Generated Narrative: Patient GeneralPatientExample</b></p><a name="GeneralPatientExample"> </a><a name="hcGeneralPatientExample"> </a><a name="GeneralPatientExample-en-US"> </a><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;">Mark Adams  Male, DoB: 2000-11-11 ( http://moh.gov.et/fhir/hiv/identifier/MRN#MRN12345671)</p><hr/><table class="grid"><tr><td style="background-color: #f3f5da" title="Known Marital status of Patient">Marital Status:</td><td colspan="3"><span title="Codes:{http://terminology.hl7.org/CodeSystem/v3-MaritalStatus M}">Married</span></td></tr><tr><td style="background-color: #f3f5da" title="Other Ids (see the one above)">Other Ids:</td><td colspan="3"><ul><li><code>http://moh.gov.et/fhir/hiv/identifier/SmartCareID</code>/NID12345671</li><li><code>http://moh.gov.et/fhir/hiv/identifier/UAN</code>/UAN12345671</li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Ways to contact the Patient">Contact Detail</td><td colspan="3"><ul><li>ph: 27537652509(Work)</li><li><a href="mailto:someone@something.org">someone@something.org</a></li><li>123 Tesfaye Street Bole Addis Ababa Addis Ababa </li></ul></td></tr><tr><td style="background-color: #f3f5da" title="Patient Links">Links:</td><td colspan="3"><ul><li>Managing Organization: <a href="Organization-CurrentServiceProviderExample.html">Organization Meshwalkiya Health Center</a></li></ul></td></tr><tr><td style="background-color: #f3f5da" title="The patient\'s professed religious affiliations."><a href="http://hl7.org/fhir/extensions/5.1.0/StructureDefinition-patient-religion.html">Patient Religion</a></td><td colspan="3"><span title="Codes:{http://terminology.hl7.org/CodeSystem/v3-ReligiousAffiliation 1023}">Muslim</span></td></tr></table></div>',
  // },
  extension: [
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
  ],
  identifier: [
    {
      system: 'http://moh.gov.et/fhir/hiv/identifier/SmartCareID',
      value: 'b335d5b78135460d92b34a856d998493',
    },
    {
      system: 'http://moh.gov.et/fhir/hiv/identifier/MRN',
      value: '178597',
    },
    {
      system: 'http://moh.gov.et/fhir/hiv/identifier/UAN',
      value: '140800101816',
    },
  ],
  name: [
    {
      use: 'official', // JC I added this for the test
      family: 'Bekele',
      given: ['Almaz', 'Lameso'],
    },
  ],
  telecom: [
    {
      system: 'phone',
      value: '+2519000000',
      use: 'home',
    },
    {
      system: 'phone',
      value: '+2509000000',
      use: 'work',
    },
    {
      system: 'phone',
      value: '+2509000000',
      use: 'mobile',
    },
    {
      system: 'email',
      value: 'someone@something.org',
      use: 'home',
    },
  ],
  gender: 'female',
  birthDate: '1983-03-10',
  address: [
    {
      type: 'physical', // TODO should this be here?
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
      line: ['17', '927/5'],
      city: 'Cherkos sub city',
      district: '10',
      state: 'Addis Ababa',
    },
  ],
  maritalStatus: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
        code: 'M',
        display: 'Married', // JC I've added this for the test
      },
    ],
  },
  managingOrganization: {
    reference: 'Organization/009a6a861c1b45778c0cbedadefe52a4',
  },
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Patient</b></p></div>"
  },
};
