
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type ImmunizationEvaluation_Props = {
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
    patient?: FHIR.Reference;
    date?: string;
    authority?: FHIR.Reference;
    targetDisease?: FHIR.CodeableConcept;
    immunizationEvent?: FHIR.Reference;
    doseStatus?: FHIR.CodeableConcept;
    doseStatusReason?: FHIR.CodeableConcept[];
    description?: string;
    series?: string;
    doseNumber?: number;
    seriesDoses?: number;
    initialiser?: any;
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

    if (!_.isNil(props.immunizationEvent)) {
        resource.immunizationEvent = dt.reference(props.immunizationEvent);
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
