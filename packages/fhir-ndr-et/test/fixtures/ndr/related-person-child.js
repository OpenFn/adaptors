export default {
  "resourceType" : "RelatedPerson",
  "id" : "ChildRelatedPersonExample",
  "meta" : {
    "profile" : ["http://moh.gov.et/fhir/hiv/StructureDefinition/related-person"]
  },
  "patient" : {
    "reference" : "Patient/b335d5b78135460d92b34a856d998493"
  },
  "relationship" : [{
    "coding" : [{
      "system" : "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
      "code" : "CHILD"
    }],
    "text" : "Child"
  }],
  "name" : [{
    "family" : "Adams",
    "given" : ["Mary"]
  }],
  "gender" : "female",
  "birthDate" : "1973-04-12",
  text: {
    status: "generated",
    div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>RelatedPerson</b></p></div>"
  },
}