export default {
  "activity": [
    {
      "detail": {
        "code": {
          "coding": [
            {
              "code": "started-art",
              "display": "Started ART",
              "system": "http://cdr.aacahb.gov.et/tracking"
            }
          ]
        },
        "description": "Address adherence barriers",
        "status": "in-progress",
        "statusReason": {
          "coding": [
            {
              "code": "",
              "system": "http://cdr.aacahb.gov.et/tracking/status-reason"
            }
          ]
        }
      }
    },
    {
      "detail": {
        "code": {
          "coding": [
            {
              "code": "linked-to-care",
              "display": "Linked to care and treatment",
              "system": "http://cdr.aacahb.gov.et/tracking"
            }
          ]
        },
        "scheduledPeriod": {
          "start": "2014-08-25"
        },
        "status": "completed"
      }
    },
    {
      "detail": {
        "code": {
          "coding": [
            {
              "code": "final-outcome",
              "display": "Final Outcome",
              "system": "http://cdr.aacahb.gov.et/tracking"
            }
          ]
        },
        "kind": "ServiceRequest",
        "location": {
          "display": "Teklehaymanot medium clinic"
        },
        "scheduledPeriod": {
          "start": "2014-09-19"
        }
      },
      "extension": [
        {
          "url": "http://cdr.aacahb.gov.et/FinalOutcomeKnown",
          "valueBoolean": true
        }
      ],
      "outcomeCodeableConcept": [
        {
          "coding": [
            {
              "code": "died",
              "display": "Died",
              "system": "http://cdr.aacahb.gov.et/final-outcome"
            }
          ]
        }
      ]
    }
  ],
  "category": [
    {
      "coding": [
        {
          "code": "hiv-positive-tracking",
          "display": "HIV Positive Tracking",
          "system": "http://cdr.aacahb.gov.et/care-plan"
        }
      ]
    }
  ],
  "created": "2014-09-21",
  "id": "beffffab-5aec-43ad-9c31-3ecb90246b82CarePlan171",
  "intent": "order",
  "period": {
    "end": "2020-09-13",
    "start": "2014-10-10"
  },
  "resourceType": "CarePlan",
  "status": "active",
  "subject": {
    "reference": "Patient/e6e0c715-a0d4-48ac-8112-f84ebd39d61b"
  },
  "encounter": {
    "reference": "Encounter/30120"
  },
  "supportingInfo": {
    "reference": "ServiceRequest/b1f58434-157a-4b9b-8976-30d8d5415b2aServiceRequest171"
  }
}