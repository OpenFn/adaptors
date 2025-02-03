
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type EnrollmentResponse_Props = {
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
    request?: Reference;
    outcome?: string;
    disposition?: string;
    created?: string;
    organization?: Reference;
    requestProvider?: Reference;
};

export default function(props: Partial<EnrollmentResponse_Props>) {
    const resource = {
        resourceType: "EnrollmentResponse",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>EnrollmentResponse</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.request)) {
        resource.request = dt.reference(props.request);
    }

    if (!_.isNil(props.organization)) {
        resource.organization = dt.reference(props.organization);
    }

    if (!_.isNil(props.requestProvider)) {
        resource.requestProvider = dt.reference(props.requestProvider);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/EnrollmentResponse"]
    };

    return resource;
}
