export default {
  "resourceType": "Observation",
  "status": "final",
  "category": [{
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/observation-category",
        "code": "social-history"
      }
    ]
  }],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "85658-3"
      }
    ]
  },
  "subject": {
    "reference": "b335d5b78135460d92b34a856d998493"
  },
  "valueCodeableConcept": {
    "text": "Foreman",
    "coding": []
  },
  "meta": {
    "profile": [
      "http://moh.gov.et/fhir/hiv/StructureDefinition/patient-occupation-observation"
    ]
  }
}