
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type FamilyMemberHistory_Props = {
    age?: FHIR.Age | FHIR.Range | string;
    born?: FHIR.Period | string;
    condition?: FHIR.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: string[] | FHIR.CodeableConcept;
    date?: string;
    deceased?: boolean | FHIR.Age | FHIR.Range | string;
    estimatedAge?: boolean;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    note?: FHIR.Annotation[];
    patient?: string | FHIR.Reference;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    relationship?: string[] | FHIR.CodeableConcept;
    sex?: string[] | FHIR.CodeableConcept;
    status?: string;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<FamilyMemberHistory_Props>) {
    const resource = {
        resourceType: "FamilyMemberHistory",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = dt.concept(props.dataAbsentReason);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.relationship)) {
        resource.relationship = dt.concept(props.relationship);
    }

    if (!_.isNil(props.sex)) {
        resource.sex = dt.concept(props.sex);
    }

    if (!_.isNil(props.born)) {
        delete resource.born;
        dt.composite(resource, "born", props.born);
    }

    if (!_.isNil(props.age)) {
        delete resource.age;
        dt.composite(resource, "age", props.age);
    }

    if (!_.isNil(props.deceased)) {
        delete resource.deceased;
        dt.composite(resource, "deceased", props.deceased);
    }

    if (!_.isNil(props.reasonCode)) {
        if (!Array.isArray(props.reasonCode)) { props.reasonCode = [props.reasonCode]; }
        resource.reasonCode = dt.concept(props.reasonCode);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.condition)) {
        let src = props.condition;
        if (!Array.isArray(src)) { src = [src]; }
        resource.condition = [];

        for (let item of src) {
            let _condition = {
                ...item
            };

            resource.condition.push(_condition);
        }
    }

    return resource;
}
