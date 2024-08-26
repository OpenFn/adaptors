
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import { builders } from "./Utils.js";

export function encounter(props) {
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
        resource.identifier = builders.identifier(props.identifier, undefined);
    }

    if ("status" in props) {
        resource.status = props.status;
    }

    if ("subject" in props) {
        resource.subject = props.subject;
    }

    if ("episodeOfCare" in props) {
        resource.episodeOfCare = props.episodeOfCare;
    }

    if ("basedOn" in props) {
        resource.basedOn = props.basedOn;
    }

    if ("appointment" in props) {
        resource.appointment = props.appointment;
    }

    if ("period" in props) {
        resource.period = props.period;
    }

    if ("reasonReference" in props) {
        resource.reasonReference = props.reasonReference;
    }

    if ("account" in props) {
        resource.account = props.account;
    }

    if ("serviceProvider" in props) {
        resource.serviceProvider = props.serviceProvider;
    } else {
        resource.serviceProvider = {"reference":"Organization/Patient.managingOrganization"};
    }

    if ("partOf" in props) {
        resource.partOf = props.partOf;
    }

    resource.meta = {
        profile: [
            "http://moh.gov.et/fhir/hiv/StructureDefinition/entry-from-outside-target-facility-encounter"
        ]
    };

    return resource;
}