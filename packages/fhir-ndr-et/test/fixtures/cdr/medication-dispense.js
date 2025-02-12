export default {
  "resourceType": "MedicationDispense",
  "id": "be953504-07b6-43e3-af33-8f8a6d6518ac",
  "extension": [

    {
      "url": "http://cdr.aacahb.gov.et/dose-end-date",
      "valueDateTime": "01/01/1970" // JC edit
    }
  ],
  "status": "completed",
  "statusReasonCodeableConcept": {
    "coding": [
      {
        "system": "http://cdr.aacahb.gov.et/medication-dispense/status-reason",
        "code": ""
      }
    ]
  },
  "context": {
    "reference": "Encounter/e84781ed-5f02-40ac-8c97-e7280fb153e3"
  },
  // JC removed this for now....
  // "medicationCodeableConcept": {
  //   "coding": [
  //     {
  //       "system": "http://snomed.info/sct",
  //       "code": "874950001",
  //       "display": "Product containing only efavirenz and lamivudine and tenofovir"
  //     },
  //     {
  //       "system": "http://cdr.aacahb.gov.et/hiv-regimen-codes",
  //       "code": "abc" // JC changed
  //     }
  //   ]
  // },
  // .. and added this instead
  reference: {
    "reference": "Medication/ARVMedicationExample"
  },
  "subject": {
    "reference": "Patient/30119"
  },
  "quantity": {
    "value": null,
    "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
    "code": "TAB"
  },
  "daysSupply": {
    "value": null,
    "unit": "Day",
    "system": "http://unitsofmeasure.org",
    "code": "d"
  }
};
