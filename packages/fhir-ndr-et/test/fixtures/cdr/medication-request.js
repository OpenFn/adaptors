export default {
  "resourceType": "MedicationRequest",
  "id": "ARVMedicationRequestInitiatedARTExample",
  "meta": {
      "profile": [
          "http://moh.gov.et/fhir/hiv/StructureDefinition/arv-medication-request"
      ]
  },
  "text": {
      "status": "generated",
      "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><a name=\"MedicationRequest_ARVMedicationRequestInitiatedARTExample\"> </a><p class=\"res-header-id\"><b>Generated Narrative: MedicationRequest ARVMedicationRequestInitiatedARTExample</b></p><a name=\"ARVMedicationRequestInitiatedARTExample\"> </a><a name=\"hcARVMedicationRequestInitiatedARTExample\"> </a><a name=\"ARVMedicationRequestInitiatedARTExample-en-US\"> </a><p><b>identifier</b>: Prescription identifier/prescription-12345</p><p><b>status</b>: Completed</p><p><b>intent</b>: Order</p><p><b>medication</b>: <a href=\"Medication-ARVMedicationExample.html\">Medication TDF + 3TC + DTG</a></p><p><b>subject</b>: <a href=\"Patient-GeneralPatientExample.html\">Mark Adams  Male, DoB: 2000-11-11 ( Medical record number:\u00a0MRN12345671)</a></p><p><b>encounter</b>: <a href=\"Encounter-GeneralEncounterExample.html\">Encounter: identifier = http://moh.gov.et/fhir/hiv/identifier/encounter#001; status = finished; class = observation encounter (ActCode#OBSENC); type = Follow-up encounter (procedure); period = 2012-12-09 --&gt; 2012-12-09</a></p><p><b>authoredOn</b>: 2023-10-11 17:21:33-0800</p><p><b>reasonReference</b>: <a href=\"Observation-InitiatedArtARTFollowupStatusExample.html\">Observation HIV Antiretroviral therapy Antiretroviral therapy status section</a></p><p><b>basedOn</b>: <a href=\"CarePlan-ARTInitiatedARTFollowUpCareplanExample.html\">CarePlan: status = active; intent = order; category = ART; created = 2024-03-20</a></p><h3>DispenseRequests</h3><table class=\"grid\"><tr><td style=\"display: none\">-</td><td><b>Quantity</b></td></tr><tr><td style=\"display: none\">*</td><td>90 TAB<span style=\"background: LightGoldenRodYellow\"> (Details: Orderable Drug Form  codeTAB = 'Tablet')</span></td></tr></table></div>"
  },
  "identifier": [
      {
          "type": {
              "coding": [
                  {
                      "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                      "code": "FILL"
                  }
              ],
              "text": "Prescription identifier"
          },
          "system": "http://moh.gov.et/fhir/hiv/identifier/medication",
          "value": "prescription-12345"
      }
  ],
  "status": "completed",
  "intent": "order",
  "medicationReference": {
      "reference": "Medication/ARVMedicationExample"
  },
  "subject": {
      "reference": "Patient/30119"
  },
  "encounter": {
      "reference": "Encounter/30120"
  },
  "authoredOn": "2023-10-11T17:21:33-08:00",
  "reasonReference": [
      {
          "reference": "Observation/InitiatedArtARTFollowupStatusExample"
      }
  ],
  "basedOn": [
      {
          "reference": "CarePlan/ARTInitiatedARTFollowUpCareplanExample"
      }
  ],
  "dispenseRequest": {
      "quantity": {
          "value": 90,
          "unit": "TAB",
          "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
          "code": "TAB"
      }
  }
}