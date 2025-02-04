
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Endpoint_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    status?: string;
    connectionType?: FHIR.Coding;
    name?: string;
    managingOrganization?: FHIR.Reference;
    contact?: FHIR.ContactPoint;
    period?: FHIR.Period;
    payloadType?: FHIR.CodeableConcept;
    payloadMimeType?: string;
    address?: FHIR.url;
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
