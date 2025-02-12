export default {
  "resourceType": "Observation",
  // "id": "InitiatedArtARTFollowupStatusExample",
  "meta": {
      "profile": [
          "http://moh.gov.et/fhir/hiv/StructureDefinition/art-followup-status-observation"
      ]
  },
  "status": "final",
  "category": [
      {
          "coding": [
              {
                  "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                  "code": "therapy"
              }
          ]
      }
  ],
  "code": {
      "coding": [
          {
              "system": "http://loinc.org",
              "code": "47248-0"
          }
      ]
  },
  "subject": {
      "reference": "Patient/30119"
  },
  "encounter": {
      "reference": "Encounter/e84781ed-5f02-40ac-8c97-e7280fb153e3"
  },
  "effectiveDateTime": "2024-01-25",
  "performer": [
      {
          "reference": "Organization/5852"
      }
  ],
  // TODO not sure about mapping this yet
//   "valueCodeableConcept": {
//       "coding": [
//           {
//               "system": "http://loinc.org",
//               "code": "63936-9"
//           }
//       ]
//   },
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
  },
}