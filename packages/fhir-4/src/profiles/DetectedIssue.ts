
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type DetectedIssue_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    status?: string;
    code?: CodeableConcept;
    severity?: string;
    patient?: Reference;
    identified?: string;
    author?: Reference;
    implicated?: Reference;
    evidence?: BackboneElement;
    detail?: string;
    reference?: string;
    mitigation?: BackboneElement;
};

export default function(props: Partial<DetectedIssue_Props>) {
    const resource = {
        resourceType: "DetectedIssue",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DetectedIssue</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.identified)) {
        dt.composite(resource, "identified", props.identified);
    }

    if (!_.isNil(props.author)) {
        resource.author = dt.reference(props.author);
    }

    if (!_.isNil(props.implicated)) {
        if (!Array.isArray(props.implicated)) { props.implicated = [props.implicated]; }
        resource.implicated = dt.reference(props.implicated);
    }

    if (!_.isNil(props.evidence)) {
        let src = props.evidence;
        if (!Array.isArray(src)) { src = [src]; }
        resource.evidence = [];

        for (let item of src) {
            let _evidence = {
                ...item
            };

            resource.evidence.push(_evidence);
        }
    }

    if (!_.isNil(props.mitigation)) {
        let src = props.mitigation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.mitigation = [];

        for (let item of src) {
            let _mitigation = {
                ...item
            };

            resource.mitigation.push(_mitigation);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DetectedIssue"]
    };

    return resource;
}
