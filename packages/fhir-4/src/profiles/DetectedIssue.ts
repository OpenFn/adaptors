
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type DetectedIssue_Props = {
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
    code?: string[] | FHIR.CodeableConcept;
    severity?: string;
    patient?: string | FHIR.Reference;
    identified?: string | FHIR.Period;
    author?: string | FHIR.Reference;
    implicated?: MaybeArray<string | FHIR.Reference>;
    evidence?: FHIR.BackboneElement[];
    detail?: string;
    reference?: string;
    mitigation?: FHIR.BackboneElement[];
    [key: string]: any;
};

export default function(props: Partial<DetectedIssue_Props>) {
    const resource = {
        resourceType: "DetectedIssue",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.identified)) {
        delete resource.identified;
        dt.composite(resource, "identified", props.identified);
    }

    if (!_.isNil(props.author)) {
        resource.author = dt.reference(props.author);
    }

    if (!_.isNil(props.implicated)) {
        if (!Array.isArray(props.implicated)) { props.implicated = [props.implicated]; }
        resource.implicated = dt.reference(props.implicated);
    }

    if (!_.isNil(props.evidence)) {
        let src = props.evidence;
        if (!Array.isArray(src)) { src = [src]; }
        resource.evidence = [];

        for (let item of src) {
            let _evidence = {
                ...item
            };

            resource.evidence.push(_evidence);
        }
    }

    if (!_.isNil(props.mitigation)) {
        let src = props.mitigation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.mitigation = [];

        for (let item of src) {
            let _mitigation = {
                ...item
            };

            resource.mitigation.push(_mitigation);
        }
    }

    return resource;
}
