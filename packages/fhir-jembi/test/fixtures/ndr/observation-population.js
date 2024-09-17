export default {
  "resourceType": "Observation",
  "status": "final",
  "category": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/observation-category",
        "code": "social-history"
      }
    ]
  },
  "code": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "385436007"
      }
    ]
  },
  "subject": {
    "reference": "b335d5b78135460d92b34a856d998493"
  },
  "valueString": "sex worker",
  "meta": {
    "profile": [
      "http://moh.gov.et/fhir/hiv/StructureDefinition/target-population-observation"
    ]
  }
}