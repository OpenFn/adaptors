
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type MeasureReport_Props = {
    contained?: any[];
    date?: string;
    evaluatedResource?: MaybeArray<string | FHIR.Reference>;
    extension?: FHIR.Extension[];
    group?: FHIR.BackboneElement[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    improvementNotation?: string[] | FHIR.CodeableConcept;
    language?: string;
    measure?: any;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    period?: FHIR.Period;
    reporter?: string | FHIR.Reference;
    status?: string;
    subject?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    type?: string;
    [key: string]: any;
};

export default function(props: Partial<MeasureReport_Props>) {
    const resource = {
        resourceType: "MeasureReport",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.reporter)) {
        resource.reporter = dt.reference(props.reporter);
    }

    if (!_.isNil(props.improvementNotation)) {
        resource.improvementNotation = dt.concept(props.improvementNotation);
    }

    if (!_.isNil(props.group)) {
        let src = props.group;
        if (!Array.isArray(src)) { src = [src]; }
        resource.group = [];

        for (let item of src) {
            let _group = {
                ...item
            };

            resource.group.push(_group);
        }
    }

    if (!_.isNil(props.evaluatedResource)) {
        if (!Array.isArray(props.evaluatedResource)) { props.evaluatedResource = [props.evaluatedResource]; }
        resource.evaluatedResource = dt.reference(props.evaluatedResource);
    }

    return resource;
}
