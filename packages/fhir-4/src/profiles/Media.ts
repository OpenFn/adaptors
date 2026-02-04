
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Media_Props = {
    basedOn?: MaybeArray<string | FHIR.Reference>;
    bodySite?: string[] | FHIR.CodeableConcept;
    contained?: any[];
    content?: FHIR.Attachment;
    created?: string | FHIR.Period;
    device?: string | FHIR.Reference;
    deviceName?: string;
    duration?: number;
    encounter?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    frames?: number;
    height?: number;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    issued?: string;
    language?: string;
    meta?: FHIR.Meta;
    modality?: string[] | FHIR.CodeableConcept;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    operator?: string | FHIR.Reference;
    partOf?: MaybeArray<string | FHIR.Reference>;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    status?: string;
    subject?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    type?: string[] | FHIR.CodeableConcept;
    view?: string[] | FHIR.CodeableConcept;
    width?: number;
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

    if (!_.isNil(props.type)) {
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.modality)) {
        resource.modality = dt.concept(props.modality);
    }

    if (!_.isNil(props.view)) {
        resource.view = dt.concept(props.view);
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

    if (!_.isNil(props.reasonCode)) {
        if (!Array.isArray(props.reasonCode)) { props.reasonCode = [props.reasonCode]; }
        resource.reasonCode = dt.concept(props.reasonCode);
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = dt.concept(props.bodySite);
    }

    if (!_.isNil(props.device)) {
        resource.device = dt.reference(props.device);
    }

    return resource;
}
