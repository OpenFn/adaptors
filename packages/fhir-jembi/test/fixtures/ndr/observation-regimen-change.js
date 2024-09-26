// This is hand made, can't find an example
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
        "system": "http://snomed.info/sct",
        "code": "182838006"
      }
    ],
    "text" : "ARV regimen change"
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
  "meta": {
    "profile": [
      "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-regimen-changed-observation"
    ]
  },
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
  },
}