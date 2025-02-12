// This is hand-written!
export default {
  resourceType: 'MedicationDispense',
  id: 'be953504-07b6-43e3-af33-8f8a6d6518ac',
  status: 'completed',
  subject: { reference: 'Patient/30119' }, // edited patient id
  context: {
    reference: 'Encounter/e84781ed-5f02-40ac-8c97-e7280fb153e3',
  },
  quantity: {
    system: 'http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm',
    code: 'TAB'
  },
  daysSupply: { unit: 'Day', system: 'http://unitsofmeasure.org', code: 'd' },
  whenHandedOver: '01/01/1970',
  // Bit of confusion over whether this is really an array
  medicationReference: {
    "reference": "Medication/ARVMedicationExample"
  },
  meta: {
    profile: [
      'http://moh.gov.et/fhir/hiv/StructureDefinition/arv-medication-dispense'
    ]
  },
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicationDispense</b></p></div>"
  },
}