
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Media_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    basedOn?: MaybeArray<string | FHIR.Reference>;
    partOf?: MaybeArray<string | FHIR.Reference>;
    status?: string;
    type?: string[] | FHIR.CodeableConcept;
    modality?: string[] | FHIR.CodeableConcept;
    view?: string[] | FHIR.CodeableConcept;
    subject?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    created?: string | FHIR.Period;
    issued?: string;
    operator?: string | FHIR.Reference;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    bodySite?: string[] | FHIR.CodeableConcept;
    deviceName?: string;
    device?: string | FHIR.Reference;
    height?: number;
    width?: number;
    frames?: number;
    duration?: number;
    content?: FHIR.Attachment;
    note?: FHIR.Annotation[];
    [key: string]: any;
};

export default function(props: Partial<Media_Props>) {
    const resource = {
        resourceType: "Media",
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

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.created)) {
        delete resource.created;
        dt.composite(resource, "created", props.created);
    }

    if (!_.isNil(props.operator)) {
        resource.operator = dt.reference(props.operator);
    }

    if (!_.isNil(props.device)) {
        resource.device = dt.reference(props.device);
    }

    return resource;
}
