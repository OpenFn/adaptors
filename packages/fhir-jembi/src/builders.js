
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import { builders } from "./Utils.js";

export function patient(type, props) {
    const mappings = {
        "patient": patient_patient
    };

    return mappings[type](props)
}

function patient_patient(props) {
    const resource = {
        resourceType: "Patient"
    };

    Object.assign(resource, props);

    if ("id" in props) {
        resource.id = props.id;
    }

    if ("implicitRules" in props) {
        resource.implicitRules = props.implicitRules;
    }

    if ("language" in props) {
        resource.language = props.language;
    }

    if ("identifier" in props) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = builders.identifier(props.identifier, "http://moh.gov.et/fhir/hiv/identifier/MRN");
    }

    if ("gender" in props) {
        resource.gender = props.gender;
    }

    if ("generalPractitioner" in props) {
        resource.generalPractitioner = props.generalPractitioner;
    }

    if ("managingOrganization" in props) {
        resource.managingOrganization = props.managingOrganization;
    }

    if ("religion" in props) {
        builders.addExtension(
            resource,
            "http://hl7.org/fhir/StructureDefinition/patient-religion",
            props.religion
        );
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/patient"]
    };

    return resource;
}