
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type RelatedPerson_Props = {
    active?: boolean;
    address?: FHIR.Address[];
    birthDate?: string;
    communication?: FHIR.BackboneElement[];
    contained?: any[];
    extension?: FHIR.Extension[];
    gender?: string;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: FHIR.HumanName[];
    patient?: string | FHIR.Reference;
    period?: FHIR.Period;
    photo?: FHIR.Attachment[];
    relationship?: MaybeArray<string[] | FHIR.CodeableConcept>;
    telecom?: FHIR.ContactPoint[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<RelatedPerson_Props>) {
    const resource = {
        resourceType: "RelatedPerson",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.relationship)) {
        if (!Array.isArray(props.relationship)) { props.relationship = [props.relationship]; }
        resource.relationship = dt.concept(props.relationship);
    }

    if (!_.isNil(props.communication)) {
        let src = props.communication;
        if (!Array.isArray(src)) { src = [src]; }
        resource.communication = [];

        for (let item of src) {
            let _communication = {
                ...item
            };

            resource.communication.push(_communication);
        }
    }

    return resource;
}
