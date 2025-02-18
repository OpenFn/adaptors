
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type List_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: FHIR.Identifier[];
    status?: string;
    mode?: string;
    title?: string;
    code?: FHIR.CodeableConcept;
    subject?: FHIR.Reference;
    encounter?: FHIR.Reference;
    date?: string;
    source?: FHIR.Reference;
    orderedBy?: FHIR.CodeableConcept;
    note?: FHIR.Annotation[];
    entry?: FHIR.BackboneElement[];
    emptyReason?: FHIR.CodeableConcept;
    initialiser?: any;
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

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.source)) {
        resource.source = dt.reference(props.source);
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

    return resource;
}
