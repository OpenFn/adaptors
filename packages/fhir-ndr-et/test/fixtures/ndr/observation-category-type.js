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
  "valueString": "abc",
  "effectiveDateTime": "2024-01-25",
  "meta": {
    "profile": [
      "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-change-category-type-observation"
    ]
  },
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
  },
}