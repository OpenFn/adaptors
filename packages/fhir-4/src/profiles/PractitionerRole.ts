
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type PractitionerRole_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    active?: boolean;
    period?: FHIR.Period;
    practitioner?: FHIR.Reference;
    organization?: FHIR.Reference;
    code?: FHIR.CodeableConcept;
    specialty?: FHIR.CodeableConcept;
    location?: FHIR.Reference;
    healthcareService?: FHIR.Reference;
    telecom?: FHIR.ContactPoint;
    availableTime?: FHIR.BackboneElement;
    notAvailable?: FHIR.BackboneElement;
    availabilityExceptions?: string;
    endpoint?: FHIR.Reference;
};

export default function(props: Partial<PractitionerRole_Props>) {
    const resource = {
        resourceType: "PractitionerRole",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>PractitionerRole</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.practitioner)) {
        resource.practitioner = dt.reference(props.practitioner);
    }

    if (!_.isNil(props.organization)) {
        resource.organization = dt.reference(props.organization);
    }

    if (!_.isNil(props.location)) {
        if (!Array.isArray(props.location)) { props.location = [props.location]; }
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.healthcareService)) {
        if (!Array.isArray(props.healthcareService)) { props.healthcareService = [props.healthcareService]; }
        resource.healthcareService = dt.reference(props.healthcareService);
    }

    if (!_.isNil(props.availableTime)) {
        let src = props.availableTime;
        if (!Array.isArray(src)) { src = [src]; }
        resource.availableTime = [];

        for (let item of src) {
            let _availableTime = {
                ...item
            };

            resource.availableTime.push(_availableTime);
        }
    }

    if (!_.isNil(props.notAvailable)) {
        let src = props.notAvailable;
        if (!Array.isArray(src)) { src = [src]; }
        resource.notAvailable = [];

        for (let item of src) {
            let _notAvailable = {
                ...item
            };

            resource.notAvailable.push(_notAvailable);
        }
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = dt.reference(props.endpoint);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/PractitionerRole"]
    };

    return resource;
}
