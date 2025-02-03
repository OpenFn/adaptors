
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Communication_Props = {
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
    partOf?: Reference;
    inResponseTo?: Reference;
    status?: string;
    statusReason?: CodeableConcept;
    category?: CodeableConcept;
    priority?: string;
    medium?: CodeableConcept;
    subject?: Reference;
    topic?: CodeableConcept;
    about?: Reference;
    encounter?: Reference;
    sent?: string;
    received?: string;
    recipient?: Reference;
    sender?: Reference;
    reasonCode?: CodeableConcept;
    reasonReference?: Reference;
    payload?: BackboneElement;
    note?: Annotation;
};

export default function(props: Partial<Communication_Props>) {
    const resource = {
        resourceType: "Communication",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Communication</b></p></div>"
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

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.inResponseTo)) {
        if (!Array.isArray(props.inResponseTo)) { props.inResponseTo = [props.inResponseTo]; }
        resource.inResponseTo = dt.reference(props.inResponseTo);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.about)) {
        if (!Array.isArray(props.about)) { props.about = [props.about]; }
        resource.about = dt.reference(props.about);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.recipient)) {
        if (!Array.isArray(props.recipient)) { props.recipient = [props.recipient]; }
        resource.recipient = dt.reference(props.recipient);
    }

    if (!_.isNil(props.sender)) {
        resource.sender = dt.reference(props.sender);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.payload)) {
        let src = props.payload;
        if (!Array.isArray(src)) { src = [src]; }
        resource.payload = [];

        for (let item of src) {
            let _payload = {
                ...item
            };

            resource.payload.push(_payload);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Communication"]
    };

    return resource;
}
