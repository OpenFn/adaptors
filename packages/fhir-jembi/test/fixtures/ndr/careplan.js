export default {
  "resourceType": "CarePlan",
  "id": "beffffab-5aec-43ad-9c31-3ecb90246b82CarePlan171",
  "meta": {
      "profile": [
          "http://moh.gov.et/fhir/hiv/StructureDefinition/art-follow-up-careplan"
      ]
  },
  "status": "active",
  "intent": "order",
  "category": [
      {
          "coding": [
              {
                  "system": "http://loinc.org",
                  "code": "LP66375-4"
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
// export default {
//   "activity": [
//     {
//       "detail": {
//         "code": {
//           "coding": [
//             {
//               "code": "started-art",
//               "display": "Started ART",
//               "system": "http://cdr.aacahb.gov.et/tracking"
//             }
//           ]
//         },
//         "description": "Address adherence barriers",
//         "status": "in-progress",
//         "statusReason": {
//           "coding": [
//             {
//               "code": "",
//               "system": "http://cdr.aacahb.gov.et/tracking/status-reason"
//             }
//           ]
//         }
//       }
//     },
//     {
//       "detail": {
//         "code": {
//           "coding": [
//             {
//               "code": "linked-to-care",
//               "display": "Linked to care and treatment",
//               "system": "http://cdr.aacahb.gov.et/tracking"
//             }
//           ]
//         },
//         "scheduledPeriod": {
//           "start": "2014-08-25"
//         },
//         "status": "completed"
//       }
//     },
//     {
//       "detail": {
//         "code": {
//           "coding": [
//             {
//               "code": "final-outcome",
//               "display": "Final Outcome",
//               "system": "http://cdr.aacahb.gov.et/tracking"
//             }
//           ]
//         },
//         "kind": "ServiceRequest",
//         "location": {
//           "display": "Teklehaymanot medium clinic"
//         },
//         "scheduledPeriod": {
//           "start": "2014-09-19"
//         }
//       },
//       "extension": [
//         {
//           "url": "http://cdr.aacahb.gov.et/FinalOutcomeKnown",
//           "valueBoolean": true
//         }
//       ],
//       "outcomeCodeableConcept": [
//         {
//           "coding": [
//             {
//               "code": "died",
//               "display": "Died",
//               "system": "http://cdr.aacahb.gov.et/final-outcome"
//             }
//           ]
//         }
//       ]
//     }
//   ],
//   "category": {
//     "coding": [
//       {
//         "system": "http://loinc.org",
//         "code": "LP66375-4"
//       }
//       // TODO should we hardcode the string "ART" ?
//     ]
//   },
//   "created": "2014-09-21",
//   "id": "beffffab-5aec-43ad-9c31-3ecb90246b82CarePlan171",
//   "intent": "order",
//   "period": {
//     "end": "2020-09-13",
//     "start": "2014-10-10"
//   },
//   "resourceType": "CarePlan",
//   "status": "active",
//   "subject": {
//     "reference": "Patient/e6e0c715-a0d4-48ac-8112-f84ebd39d61b"
//   },
//   "supportingInfo": {
//     "reference": "ServiceRequest/b1f58434-157a-4b9b-8976-30d8d5415b2aServiceRequest171"
//   }
// }