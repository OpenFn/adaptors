
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Communication_Props = {
    about?: MaybeArray<string | FHIR.Reference>;
    basedOn?: MaybeArray<string | FHIR.Reference>;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    contained?: any[];
    encounter?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    inResponseTo?: MaybeArray<string | FHIR.Reference>;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    language?: string;
    medium?: MaybeArray<string[] | FHIR.CodeableConcept>;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    partOf?: MaybeArray<string | FHIR.Reference>;
    payload?: FHIR.BackboneElement[];
    priority?: string;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    received?: string;
    recipient?: MaybeArray<string | FHIR.Reference>;
    sender?: string | FHIR.Reference;
    sent?: string;
    status?: string;
    statusReason?: string[] | FHIR.CodeableConcept;
    subject?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    topic?: string[] | FHIR.CodeableConcept;
    [key: string]: any;
};

export default function(props: Partial<Communication_Props>) {
    const resource = {
        resourceType: "Communication",
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

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = dt.concept(props.statusReason);
    }

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.medium)) {
        if (!Array.isArray(props.medium)) { props.medium = [props.medium]; }
        resource.medium = dt.concept(props.medium);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.topic)) {
        resource.topic = dt.concept(props.topic);
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

    if (!_.isNil(props.reasonCode)) {
        if (!Array.isArray(props.reasonCode)) { props.reasonCode = [props.reasonCode]; }
        resource.reasonCode = dt.concept(props.reasonCode);
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

    return resource;
}
