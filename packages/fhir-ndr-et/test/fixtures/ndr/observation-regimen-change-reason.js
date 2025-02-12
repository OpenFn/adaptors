// hand-written
export default {
  "resourceType": "Observation",
  "status": "final",
  "category": [{
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/observation-category",
        "code": "therapy"
      }
    ]
  }],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "LL354-2"
      }
    ],
    "text" : "ARV regimen change reason"
  },
  "subject": {
    "reference": "Patient/30119"
  },
  "encounter": {
    "reference": "Encounter/e84781ed-5f02-40ac-8c97-e7280fb153e3"
  },
  "performer": [{
    "reference": "abc"
  }],
  "valueCodeableConcept": {
    "text": "Virologic-Failure",
    "coding": [
      {
        "code": "http://loinc.org",
        "system": "1234"
      }
    ],
    "extension": [
      {
        "url": "http://moh.gov.et/fhir/hiv/StructureDefinition/cd4-vl-classification-for-treatment-failure",
        "valueCodeableConcept": {
          "coding": [
            {
              "code": "http://moh.gov.et/fhir/hiv/CodeSystem/cd4-vl-classification-for-treatment-failure-code-system",
              "system": "1234"
            }
          ]
        }
      }
    ]
  },
  "meta": {
    "profile": [
      "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-regimen-change-reason-observation"
    ]
  },
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
  },
}