import { expect, assert } from 'chai';
import { builders } from '../../src/index';

describe('SzCauseOfDeath', () => {
  it('should create a simple SzCauseOfDeath', () => {
    const resource = builders.observation('SzCauseOfDeath', {});
    assert.isOk(resource);
  });
});

describe('SzClinicalObservation', () => {
  it('should create a simple SzClinicalObservation', () => {
    const resource = builders.observation('SzClinicalObservation', {});
    assert.isOk(resource);
  });
});

describe('SzLabResult', () => {
  it('should create a simple SzLabResult', () => {
    const resource = builders.observation('SzLabResult', {});
    assert.isOk(resource);
  });

  it('should create a SzLabResult with a testingLab extension (with builder)', () => {
    const result = builders.observation('SzLabResult', {
      testingLaboratory: builders.ref(`Location/abc`),

      // This doesn't work because there's no hint that the string is reference
      //   testingLaboratory: 'Location/abc',s
    });

    assert.deepEqual(result.extension, [
      {
        url: 'https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzTestingLabExtension',
        valueReference: { reference: 'Location/abc' },
      },
    ]);
  });

  it('should create a SzLabResult with a testingLab extension (pass string)', () => {
    const result = builders.observation('SzLabResult', {
      testingLaboratory: 'Location/abc',
    });

    assert.deepEqual(result.extension, [
      {
        url: 'https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzTestingLabExtension',
        valueReference: { reference: 'Location/abc' },
      },
    ]);
  });

  it.skip('should create a SzLabResult with a testingLab extension (pass resource directly)', () => {
    const lab = {
      id: 'abc',
      resourceType: 'Location',
    };

    const result = builders.observation('SzLabResult', {
      // sadly this doesn't seem to work
      testingLaboratory: lab,
    });

    // skip narrative generation
    delete result.text;

    assert.deepEqual(result.extension, [
      {
        url: 'https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzTestingLabExtension',
        valueReference: { reference: 'Location/abc' },
      },
    ]);
  });

  it('should create a SzLabResult for code CD4 ', () => {
    const result = builders.observation('SzLabResult', {
      code: 'CD4',
    });

    // skip narrative generation
    delete result.text;

    assert.deepEqual(result, {
      resourceType: 'Observation',
      code: {
        coding: [
          {
            code: 'CD4',
            display: 'CD4 Count',
            system:
              'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzTestParameterCodeCS',
          },
        ],
        text: 'CD4 Count',
      },
      meta: {
        profile: [
          'https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzLabResult',
        ],
      },
    });
  });

  it.skip('should create a SzLabResult with a category ', () => {
    const result = builders.observation('SzLabResult', {
      category: 'Laboratory',
    });

    assert.deepEqual(result.category, {
      resourceType: 'Observation',
      code: {
        coding: [
          {
            code: 'CD4',
            display: 'CD4 Count',
            system:
              'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzTestParameterCodeCS',
          },
        ],
        text: 'CD4 Count',
      },
      meta: {
        profile: [
          'https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzLabResult',
        ],
      },
    });
  });

  // TODO!
  it.skip('should build an example resource', () => {
    // http://172.209.216.154/Observation-9DEEB700-F330-40BE-B0C8-DDD12C960857.json.html
    const example = {
      resourceType: 'Observation',
      id: '9DEEB700-F330-40BE-B0C8-DDD12C960857',
      meta: {
        profile: [
          'https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzLabResult',
        ],
      },
      //   text: {
      //     status: 'extensions',
      //     div: '<div xmlns="http://www.w3.org/1999/xhtml"><p class="res-header-id"><b>Generated Narrative: Observation 9DEEB700-F330-40BE-B0C8-DDD12C960857</b></p><a name="9DEEB700-F330-40BE-B0C8-DDD12C960857"> </a><a name="hc9DEEB700-F330-40BE-B0C8-DDD12C960857"> </a><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px"/><p style="margin-bottom: 0px">Profile: <a href="StructureDefinition-SzLabResult.html">Eswatini Lab Result Profile</a></p></div><p><b>Extention: Eswatini Lab Result Authorizer</b>: <a href="Practitioner-576E19CD-CED4-47A0-8BF7-3B030153E245.html">Practitioner Thabile Celiwe Dlamini </a></p><p><b>Extention: Eswatini Testing Laboratory</b>: <a href="Location-BD06C72F-FCCE-42E0-BF55-E72C298DF11E.html">Location Mbabane Central Laboratory</a></p><p><b>status</b>: Final</p><p><b>category</b>: <span title="Codes:{http://terminology.hl7.org/CodeSystem/observation-category laboratory}">Laboratory</span></p><p><b>code</b>: <span title="Codes:{https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzTestParameterCodeCS PSCD}">HIV Viral Load</span></p><p><b>subject</b>: <a href="Patient-13EA147E-8E3B-498C-8D35-6FCB8BC6DEFB.html">Celucolo Celani Sacolo  Male, DoB: 2000-01-01 ( Medical Record Number: Client Management Information System#M001010101-1\u00a0(use:\u00a0usual,\u00a0))</a></p><p><b>encounter</b>: <a href="Encounter-C4ACF791-2B64-4A45-8E6E-87A5B1295032.html">Encounter: status = finished; class = Out Patient Department (Code System: Encounter Classification#OPD); period = 2023-10-01 10:00:00+0000 --&gt; (ongoing)</a></p><p><b>performer</b>: <a href="Practitioner-576E19CD-CED4-47A0-8BF7-3B030153E245.html">Practitioner Thabile Celiwe Dlamini </a></p><p><b>value</b>: 16.5 Copies/ml</p><p><b>interpretation</b>: <span title="Codes:{http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation L}">Low</span></p><p><b>specimen</b>: <a href="Specimen-D1FB3038-1B78-44E1-8244-897F243284B4.html">Specimen: status = available; type = Blood</a></p></div>',
      //   },
      extension: [
        {
          url: 'https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzAuthorizerExtension',
          valueReference: {
            reference: 'Practitioner/576E19CD-CED4-47A0-8BF7-3B030153E245',
          },
        },
        {
          url: 'https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzTestingLabExtension',
          valueReference: {
            reference: 'Location/BD06C72F-FCCE-42E0-BF55-E72C298DF11E',
          },
        },
      ],
      status: 'final',
      category: [
        {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/observation-category',
              code: 'laboratory',
              display: 'Laboratory',
            },
          ],
          text: 'Laboratory',
        },
      ],
      code: {
        coding: [
          {
            system:
              'https://hapifhir.eswatinihie.com/fhir/CodeSystem/SzTestParameterCodeCS',
            code: 'PSCD',
            display: 'HIV Viral Load',
          },
        ],
        text: 'HIV Viral Load',
      },
      subject: {
        reference: 'Patient/13EA147E-8E3B-498C-8D35-6FCB8BC6DEFB',
      },
      encounter: {
        reference: 'Encounter/C4ACF791-2B64-4A45-8E6E-87A5B1295032',
      },
      performer: [
        {
          reference: 'Practitioner/576E19CD-CED4-47A0-8BF7-3B030153E245',
        },
      ],
      valueQuantity: {
        value: 16.5,
        unit: 'Copies/ml',
      },
      interpretation: [
        {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
              code: 'L',
              display: 'Low',
            },
          ],
          text: 'Low',
        },
      ],
      specimen: {
        reference: 'Specimen/D1FB3038-1B78-44E1-8244-897F243284B4',
      },
    };
  });
});

describe('SzMannerOfDeath', () => {
  it('should create a simple SzMannerOfDeath', () => {
    const resource = builders.observation('SzMannerOfDeath', {});
    assert.isOk(resource);
  });
});

describe('SzVitalSigns', () => {
  it('should create a simple SzVitalSigns', () => {
    const resource = builders.observation('SzVitalSigns', {});
    assert.isOk(resource);
  });

  it.skip('should expand category', () => {
    const resource = builders.observation('SzVitalSigns', {
      category: 'vital-signs',
    });
    console.log(resource);
    expect(resource.category).eql([
      {
        coding: [
          {
            system:
              'http://terminology.hl7.org/CodeSystem/observation-category',
            code: 'vital-signs',
          },
        ],
      },
    ]);
  });

  it('should accept a value as a quantity', () => {
    const resource = builders.observation('SzVitalSigns', {
      value: {
        value: 75,
        unit: 'kg',
      },
    });

    expect(resource.valueQuantity).eql({
      value: 75,
      unit: 'kg',
    });
  });
});
