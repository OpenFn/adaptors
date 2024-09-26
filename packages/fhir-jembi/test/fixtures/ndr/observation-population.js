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
        "system": "http://snomed.info/sct",
        "code": "385436007"
      }
    ],
    "text" : "Target population"
  },
  "subject": {
    "reference": "b335d5b78135460d92b34a856d998493"
  },
  "valueString": "sex worker",
  "meta": {
    "profile": [
      "http://moh.gov.et/fhir/hiv/StructureDefinition/target-population-observation"
    ]
  },
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
  },
}