// Note that I've generated this structure, it's not from an example
export default {
  resourceType: 'MedicationRequest',
  identifier: [
    {
      type: {
        coding: [
            {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                "code": "FILL"
            }
        ],
        text: "Prescription identifier"
      },
      system: 'http://moh.gov.et/fhir/hiv/identifier/medication',
      value: 'prescription-12345'
    }
  ],
  status: 'completed',
  intent: 'order',
  doNotPerform: true,
  medicationReference: { reference: 'Medication/f29d782985424800b3b309b60e39c229' },
  subject: { reference: 'Patient/30119' },
  encounter: { reference: 'Encounter/e84781ed-5f02-40ac-8c97-e7280fb153e3' },
  reasonReference: [{ reference: 'observartion/arv-regimen-changed-observation' }],
  basedOn: [{ reference: 'CarePlan/beffffab-5aec-43ad-9c31-3ecb90246b82CarePlan171' }],
  dispenseRequest: {},
  meta: {
    profile: [
      'http://moh.gov.et/fhir/hiv/StructureDefinition/arv-medication-request'
    ]
  },
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicationRequest</b></p></div>"
  },
}