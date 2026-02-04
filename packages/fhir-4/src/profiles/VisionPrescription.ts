
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type VisionPrescription_Props = {
    contained?: any[];
    created?: string;
    dateWritten?: string;
    encounter?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    lensSpecification?: FHIR.BackboneElement[];
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    patient?: string | FHIR.Reference;
    prescriber?: string | FHIR.Reference;
    status?: string;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<VisionPrescription_Props>) {
    const resource = {
        resourceType: "VisionPrescription",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.prescriber)) {
        resource.prescriber = dt.reference(props.prescriber);
    }

    if (!_.isNil(props.lensSpecification)) {
        let src = props.lensSpecification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.lensSpecification = [];

        for (let item of src) {
            let _lensSpecification = {
                ...item
            };

            resource.lensSpecification.push(_lensSpecification);
        }
    }

    return resource;
}
