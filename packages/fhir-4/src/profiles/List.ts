
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type List_Props = {
    code?: string[] | FHIR.CodeableConcept;
    contained?: any[];
    date?: string;
    emptyReason?: string[] | FHIR.CodeableConcept;
    encounter?: string | FHIR.Reference;
    entry?: FHIR.BackboneElement[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    mode?: string;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    orderedBy?: string[] | FHIR.CodeableConcept;
    source?: string | FHIR.Reference;
    status?: string;
    subject?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    title?: string;
    [key: string]: any;
};

export default function(props: Partial<List_Props>) {
    const resource = {
        resourceType: "List",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.source)) {
        resource.source = dt.reference(props.source);
    }

    if (!_.isNil(props.orderedBy)) {
        resource.orderedBy = dt.concept(props.orderedBy);
    }

    if (!_.isNil(props.entry)) {
        let src = props.entry;
        if (!Array.isArray(src)) { src = [src]; }
        resource.entry = [];

        for (let item of src) {
            let _entry = {
                ...item
            };

            resource.entry.push(_entry);
        }
    }

    if (!_.isNil(props.emptyReason)) {
        resource.emptyReason = dt.concept(props.emptyReason);
    }

    return resource;
}
