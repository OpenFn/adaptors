
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type MeasureReport_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    status?: string;
    type?: string;
    measure?: any;
    subject?: string | FHIR.Reference;
    date?: string;
    reporter?: string | FHIR.Reference;
    period?: FHIR.Period;
    improvementNotation?: string[] | FHIR.CodeableConcept;
    group?: FHIR.BackboneElement[];
    evaluatedResource?: MaybeArray<string | FHIR.Reference>;
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
