
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type EnrollmentRequest_Props = {
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
    created?: string;
    insurer?: Reference;
    provider?: Reference;
    candidate?: Reference;
    coverage?: Reference;
};

export default function(props: Partial<EnrollmentRequest_Props>) {
    const resource = {
        resourceType: "EnrollmentRequest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>EnrollmentRequest</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = dt.reference(props.insurer);
    }

    if (!_.isNil(props.provider)) {
        resource.provider = dt.reference(props.provider);
    }

    if (!_.isNil(props.candidate)) {
        resource.candidate = dt.reference(props.candidate);
    }

    if (!_.isNil(props.coverage)) {
        resource.coverage = dt.reference(props.coverage);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/EnrollmentRequest"]
    };

    return resource;
}
