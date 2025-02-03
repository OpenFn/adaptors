
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type RequestGroup_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    instantiatesCanonical?: any;
    instantiatesUri?: string;
    basedOn?: Reference;
    replaces?: Reference;
    groupIdentifier?: Identifier;
    status?: string;
    intent?: string;
    priority?: string;
    code?: CodeableConcept;
    subject?: Reference;
    encounter?: Reference;
    authoredOn?: string;
    author?: Reference;
    reasonCode?: CodeableConcept;
    reasonReference?: Reference;
    note?: Annotation;
    action?: BackboneElement;
};

export default function(props: Partial<RequestGroup_Props>) {
    const resource = {
        resourceType: "RequestGroup",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>RequestGroup</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.replaces)) {
        if (!Array.isArray(props.replaces)) { props.replaces = [props.replaces]; }
        resource.replaces = dt.reference(props.replaces);
    }

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = dt.identifier(props.groupIdentifier);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.author)) {
        resource.author = dt.reference(props.author);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.action)) {
        let src = props.action;
        if (!Array.isArray(src)) { src = [src]; }
        resource.action = [];

        for (let item of src) {
            let _action = {
                ...item
            };

            resource.action.push(_action);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/RequestGroup"]
    };

    return resource;
}
