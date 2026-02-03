
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ImmunizationEvaluation_Props = {
    authority?: string | FHIR.Reference;
    contained?: any[];
    date?: string;
    description?: string;
    doseNumber?: number | string;
    doseStatus?: string[] | FHIR.CodeableConcept;
    doseStatusReason?: MaybeArray<string[] | FHIR.CodeableConcept>;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    immunizationEvent?: string | FHIR.Reference;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    patient?: string | FHIR.Reference;
    series?: string;
    seriesDoses?: number | string;
    status?: string;
    targetDisease?: string[] | FHIR.CodeableConcept;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<ImmunizationEvaluation_Props>) {
    const resource = {
        resourceType: "ImmunizationEvaluation",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.authority)) {
        resource.authority = dt.reference(props.authority);
    }

    if (!_.isNil(props.targetDisease)) {
        resource.targetDisease = dt.concept(props.targetDisease);
    }

    if (!_.isNil(props.immunizationEvent)) {
        resource.immunizationEvent = dt.reference(props.immunizationEvent);
    }

    if (!_.isNil(props.doseStatus)) {
        resource.doseStatus = dt.concept(props.doseStatus);
    }

    if (!_.isNil(props.doseStatusReason)) {
        if (!Array.isArray(props.doseStatusReason)) { props.doseStatusReason = [props.doseStatusReason]; }
        resource.doseStatusReason = dt.concept(props.doseStatusReason);
    }

    if (!_.isNil(props.doseNumber)) {
        delete resource.doseNumber;
        dt.composite(resource, "doseNumber", props.doseNumber);
    }

    if (!_.isNil(props.seriesDoses)) {
        delete resource.seriesDoses;
        dt.composite(resource, "seriesDoses", props.seriesDoses);
    }

    return resource;
}
