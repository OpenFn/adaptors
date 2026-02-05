import { expect, assert } from 'chai';
import { builders as b } from '../../src/index';
import { builders } from '@openfn/language-fhir-4';

const sampleBasic = {
  resourceType: 'Patient',
  id: 'SampleSzMalariaPatient',

  meta: {
    profile: ['http://172.209.216.154:3447/fhir/StructureDefinition/SzPatient'],
  },

  name: [
    {
      family: 'Gule',
      given: ['Jacob', 'Samuel'],
    },
  ],
  identifier: [
    {
      use: 'official',
      type: {
        coding: [
          {
            system:
              'http://172.209.216.154:3447/fhir/CodeSystem/SzPersonIdentificationsCS',
            code: 'PI',
            display: 'Personal ID Number',
          },
        ],
      },
      system: 'http://homeaffairs.sys',
      value: '1999001000000',
    },
  ],
  gender: 'male',
  meta: {
    profile: ['http://172.209.216.154:3447/fhir/StructureDefinition/SzPatient'],
  },
};

const sampleFull = {
  resourceType: 'Patient',
  id: 'SampleSzMalariaPatient',
  meta: {
    profile: ['http://172.209.216.154:3447/fhir/StructureDefinition/SzPatient'],
  },
  text: {
    status: 'generated',
    div: '<div xmlns="http://www.w3.org/1999/xhtml"><p class="res-header-id"><b>Generated Narrative: Patient SampleSzMalariaPatient</b></p><a name="SampleSzMalariaPatient"> </a><a name="hcSampleSzMalariaPatient"> </a><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px"/><p style="margin-bottom: 0px">Profile: <a href="StructureDefinition-SzPatient.html">Eswatini Patient Profile</a></p></div><p style="border: 1px #661aff solid; background-color: #e6e6ff; padding: 10px;">Jacob Samuel Gule  Male, DoB: 1990-01-01 ( Medical Record Number: M002111111-11\u00a0(use:\u00a0usual,\u00a0))</p><hr/><table class="grid"><tr><td style="background-color: #f3f5da" title="Other Id (see the one above)">Other Id:</td><td colspan="3">Personal ID Number/1999001000000\u00a0(use:\u00a0official,\u00a0)</td></tr><tr><td style="background-color: #f3f5da" title="Ways to contact the Patient">Contact Detail</td><td colspan="3">Mbabane </td></tr><tr><td style="background-color: #f3f5da" title="The nationality of the patient."><a href="http://hl7.org/fhir/extensions/5.3.0-ballot-tc1/StructureDefinition-patient-nationality.html">Patient Nationality</a></td><td colspan="3"><span title="Codes:{urn:iso:std:iso:3166 SWZ}">Eswatini</span></td></tr><tr><td style="background-color: #f3f5da" title="Extention for Eswatini Chiefdom"><a href="StructureDefinition-SzChiefdomExtension.html">Extention: Eswatini Chiefdom</a></td><td colspan="3"><span title="Codes:{http://172.209.216.154:3447/fhir/CodeSystem/SzChiefdomCS 7}">Lobamba</span></td></tr><tr><td style="background-color: #f3f5da" title="Extention for Eswatini Tinkhundla"><a href="StructureDefinition-SzInkhundlaExtension.html">Extention: Eswatini Inkhundla</a></td><td colspan="3"><span title="Codes:{http://172.209.216.154:3447/fhir/CodeSystem/SzTinkhundlaCS 3}">LOBAMBA</span></td></tr></table></div>',
  },

  // TODO i should be able to provide nice mappings for extentions
  // b.ext('Eswatini', 'patient-pationality')
  // or
  // b.ext.patientNationality('Eswatini')
  // and the rest is automated
  // also we should only need one of Code or Display and should be able to
  // generate the rest from there
  // actually, extensions are just:
  // nationality: 'swz'
  // and we generate the rest. Or I suppose maybe pass a coding
  // value mapping would help
  extension: [
    {
      url: 'http://hl7.org/fhir/StructureDefinition/patient-nationality',
      valueCodeableConcept: {
        coding: [
          {
            system: 'urn:iso:std:iso:3166',
            code: 'SWZ',
            display: 'Eswatini',
          },
        ],
        text: 'Eswatini',
      },
    },
    {
      url: 'http://172.209.216.154:3447/fhir/StructureDefinition/SzInkhundlaExtension',
      valueCodeableConcept: {
        coding: [
          {
            system:
              'http://172.209.216.154:3447/fhir/CodeSystem/SzTinkhundlaCS',
            code: '3',
            display: 'LOBAMBA',
          },
        ],
        text: 'LOBAMBA',
      },
    },
    {
      url: 'http://172.209.216.154:3447/fhir/StructureDefinition/SzChiefdomExtension',
      valueCodeableConcept: {
        coding: [
          {
            system: 'http://172.209.216.154:3447/fhir/CodeSystem/SzChiefdomCS',
            code: '7',
            display: 'Lobamba',
          },
        ],
        text: 'Lobamba',
      },
    },
  ],
  identifier: [
    {
      use: 'usual',
      type: {
        coding: [
          {
            system:
              'http://172.209.216.154:3447/fhir/CodeSystem/SzPersonIdentificationsCS',
            code: 'MR',
            display: 'Medical Record Number',
          },
        ],
      },
      system: 'http://mfl.sys/m001',
      value: 'M002111111-11',
    },
    {
      use: 'official',
      type: {
        coding: [
          {
            system:
              'http://172.209.216.154:3447/fhir/CodeSystem/SzPersonIdentificationsCS',
            code: 'PI',
            display: 'Personal ID Number',
          },
        ],
      },
      system: 'http://homeaffairs.sys',
      value: '1999001000000',
    },
  ],
  name: [
    {
      family: 'Gule',
      given: ['Jacob', 'Samuel'],
    },
  ],
  gender: 'male',
  birthDate: '1990-01-01',
  _birthDate: {
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/patient-birthTime',
        valueDateTime: '2000-01-01T14:35:45-05:00',
      },
    ],
  },
  address: [
    {
      city: 'Mbabane',
    },
  ],
};
describe('SzPatient', () => {
  it('should create an empty SzPatient', () => {
    const resource = b.patient('SzPatient', {});
    assert.isOk(resource);
  });

  it('should create a basic SzPatient', () => {
    // TODO profile names should be code assisted
    const resource = b.patient('SzPatient', {
      id: 'SampleSzMalariaPatient',
      gender: 'male', // TODO would love to code-complete this. Or abbreviate
      identifier: {
        use: 'official',
        system: 'http://homeaffairs.sys',
        value: '1999001000000',
        // TODO I want to specify this inline, without using the function explicitly
        type: b.concept([
          'PI',
          'http://172.209.216.154:3447/fhir/CodeSystem/SzPersonIdentificationsCS',
          // TODO we should be able to a) map the system and b) automate the display
          { display: 'Personal ID Number' },
        ]),
      },
      // TODO name is famously hard to simplify
      // But if there's a strong pattern in this IG, maybe we can optimise?
      // name: b.name('Jacob', 'Samuel', 'Gule') where last is always family
      // I suppose that's a util you want in the mapping script, which knows what the
      // source data looks like
      name: [
        {
          family: 'Gule',
          given: ['Jacob', 'Samuel'],
        },
      ],
      // This should be automatable
      meta: {
        profile: [
          'http://172.209.216.154:3447/fhir/StructureDefinition/SzPatient',
        ],
      },
    });
    console.log(JSON.stringify(resource, null, 2));
    assert.deepEqual(resource, sampleBasic);
  });

  it.skip('should create a full SzPatient with shorthand input', () => {
    // TODO profile names should be code assisted
    const resource = b.patient('SzPatient', {
      id: 'SampleSzMalariaPatient',
      gender: 'male',
      identifier: [
        {
          use: 'usual',
          value: 'M002111111-11',
          type: 'MR',
        },
        {
          use: 'official',
          value: '1999001000000',
          type: 'PI',
        },
      ],
      name: [
        {
          family: 'Gule',
          given: ['Jacob', 'Samuel'],
        },
      ],
      nationality: 'SWZ',
      inkhundla: 'LOBAMBA',
      chiefdom: 'Lobamba',
      birthDate: '1990-01-01',
      birthTime: '2000-01-01T14:35:45-05:00',
      address: [
        {
          city: 'Mbabane',
        },
      ],
    });
    console.log(JSON.stringify(resource, null, 2));
    assert.deepEqual(resource, sampleBasic);
  });
});
