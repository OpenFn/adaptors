
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type AllergyIntolerance_Props = {
    asserter?: string | FHIR.Reference;
    category?: string[];
    clinicalStatus?: string[] | FHIR.CodeableConcept;
    code?: string[] | FHIR.CodeableConcept;
    contained?: any[];
    criticality?: string;
    encounter?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    lastOccurrence?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    onset?: string | FHIR.Age | FHIR.Period | FHIR.Range;
    patient?: string | FHIR.Reference;
    reaction?: FHIR.BackboneElement[];
    recordedDate?: string;
    recorder?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    type?: string;
    verificationStatus?: string[] | FHIR.CodeableConcept;
    [key: string]: any;
};

export default function(props: Partial<AllergyIntolerance_Props>) {
    const resource = {
        resourceType: "AllergyIntolerance",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.clinicalStatus)) {
        resource.clinicalStatus = dt.concept(props.clinicalStatus);
    }

    if (!_.isNil(props.verificationStatus)) {
        resource.verificationStatus = dt.concept(props.verificationStatus);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.onset)) {
        delete resource.onset;
        dt.composite(resource, "onset", props.onset);
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = dt.reference(props.recorder);
    }

    if (!_.isNil(props.asserter)) {
        resource.asserter = dt.reference(props.asserter);
    }

    if (!_.isNil(props.reaction)) {
        let src = props.reaction;
        if (!Array.isArray(src)) { src = [src]; }
        resource.reaction = [];

        for (let item of src) {
            let _reaction = {
                ...item
            };

            resource.reaction.push(_reaction);
        }
    }

    return resource;
}
