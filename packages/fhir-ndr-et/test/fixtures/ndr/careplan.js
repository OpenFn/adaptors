export default {
  "resourceType": "CarePlan",
  "id": "beffffab-5aec-43ad-9c31-3ecb90246b82CarePlan171",
  "meta": {
      "profile": [
          "http://moh.gov.et/fhir/hiv/StructureDefinition/art-follow-up-careplan"
      ]
  },
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CarePlan</b></p></div>"
  },
  "status": "active",
  "intent": "order",
  "category": [
      {
          "coding": [
            {
                "system": "http://moh.gov.et/fhir/hiv/CodeSystem/care-plan-category-code-system",
                "code": "art-follow-up-care-plan"
              }
          ],
          // "text": "ART" TODO I think we need to support this?
      }
  ],
  "subject": {
      "reference": "Patient/e6e0c715-a0d4-48ac-8112-f84ebd39d61b"
  },
  "encounter": {
      "reference": "Encounter/30120"
  },
  "created": "2014-09-21",
  // TODO need to handle this
//   "activity": [
//       {
//           "extension": [
//               {
//                   "url": "http://moh.gov.et/fhir/hiv/StructureDefinition/care-plan-next-visit",
//                   "valueDateTime": "2024-03-20"
//               },
//               {
//                   "url": "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-adherence",
//                   "valueReference": {
//                       "reference": "Observation/FairARVAdherenceExample"
//                   }
//               }
//           ],
//           "reference": {
//               "reference": "MedicationRequest/ARVMedicationRequestInitiatedARTExample"
//           }
//       }
//   ]
};
