export default {
  "resourceType": "MedicationAdministration",
  "id": "ARVMedicationAdministrationExample",
  "meta": {
      "profile": [
          "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-medication-administration"
      ]
  },
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicationAdministration</b></p></div>"
  },

  "status": "completed",
  "medicationReference": {
      "reference": "Medication/ARVMedicationExample"
  },
  "subject": {
      "reference": "Patient/30119"
  },
  "context": {
      "reference": "Encounter/e84781ed-5f02-40ac-8c97-e7280fb153e3"
  },
  "effectivePeriod": {
      "start": "2012-12-09",
      "end": "2013-04-08"
  },
  "request": {
      "reference": "MedicationRequest/ARVMedicationRequestInitiatedARTExample"
  },
  // "note": [
  //     {
  //         "authorReference": {
  //             "reference": "Practitioner/30174"
  //         },
  //         "time": "2012-12-09T13:28:17-05:00",
  //         "text": "Dose end date for a 90 day dispensation of 1j (TDF + 3TC + DTG)"
  //     }
  // ]
}