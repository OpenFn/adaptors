
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Organization_Props = {
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
    type?: FHIR.CodeableConcept;
    name?: string;
    alias?: string;
    telecom?: FHIR.ContactPoint;
    address?: FHIR.Address;
    partOf?: FHIR.Reference;
    contact?: FHIR.BackboneElement;
    endpoint?: FHIR.Reference;
};

export default function(props: Partial<Organization_Props>) {
    const resource = {
        resourceType: "Organization",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Organization</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (let item of src) {
            let _contact = {
                ...item
            };

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = dt.reference(props.endpoint);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Organization"]
    };

    return resource;
}
