
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type Endpoint_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    status?: any;
    connectionType?: any;
    name?: any;
    managingOrganization?: any;
    contact?: any;
    period?: any;
    payloadType?: any;
    payloadMimeType?: any;
    address?: any;
    header?: any;
};

export default function(props: Partial<Endpoint_Props>) {
    const resource = {
        resourceType: "Endpoint",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Endpoint</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.implicitRules)) {
        resource.implicitRules = props.implicitRules;
    }

    if (!_.isNil(props.language)) {
        resource.language = props.language;
    }

    if (!_.isNil(props.text)) {
        resource.text = props.text;
    }

    if (!_.isNil(props.contained)) {
        resource.contained = props.contained;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.modifierExtension)) {
        resource.modifierExtension = props.modifierExtension;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.connectionType)) {
        resource.connectionType = props.connectionType;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = dt.reference(props.managingOrganization);
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.payloadType)) {
        resource.payloadType = props.payloadType;
    }

    if (!_.isNil(props.payloadMimeType)) {
        resource.payloadMimeType = props.payloadMimeType;
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.header)) {
        resource.header = props.header;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"]
    };

    return resource;
}
