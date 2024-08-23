import { builders } from "../src/Utils.js";

export function createEncounter(props) {
    const resource = {
        resourceType: "Encounter"
    };

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
        resource.identifier = builders.identifier(props.identifier, "http://moh.gov.et/fhir/hiv/identifier/encounter");
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/target-facility-encounter"]
    };

    return resource;
}

export function createPatient(props) {
    const resource = {
        resourceType: "Patient"
    };

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

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/patient"]
    };

    return resource;
}

export function createObservation(props) {
    const resource = {
        resourceType: "Observation"
    };

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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/respiratory-rate-observation"
        ]
    };

    return resource;
}