export default {
  "resourceType": "MedicationAdministration",
  "id": "ARVMedicationAdministrationExample",
  "meta": {
      "profile": [
          "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-medication-administration"
      ]
  },
  "status": "completed",
  "medicationReference": {
      "reference": "Medication/ARVMedicationExample"
  },
  "subject": {
      "reference": "Patient/30119"
  },
  "context": {
      "reference": "Encounter/30120"
  },
  "effectivePeriod": {
      "start": "2012-12-09",
      "end": "2013-04-08"
  },
  "request": {
      "reference": "ARVMedicationRequestInitiatedARTExample"
  },
  "note": [
      {
          "authorReference": {
              "reference": "Practitioner/30174"
          },
          "time": "2012-12-09T13:28:17-05:00",
          "text": "Dose end date for a 90 day dispensation of 1j (TDF + 3TC + DTG)"
      }
  ]
}