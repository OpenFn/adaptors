
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Endpoint_Props = {
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
    connectionType?: Coding;
    name?: string;
    managingOrganization?: Reference;
    contact?: ContactPoint;
    period?: Period;
    payloadType?: CodeableConcept;
    payloadMimeType?: string;
    address?: url;
    header?: string;
};

export default function(props: Partial<Endpoint_Props>) {
    const resource = {
        resourceType: "Endpoint",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Endpoint</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = dt.reference(props.managingOrganization);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"]
    };

    return resource;
}
