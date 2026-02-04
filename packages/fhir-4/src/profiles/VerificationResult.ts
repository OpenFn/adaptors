
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type VerificationResult_Props = {
    attestation?: FHIR.BackboneElement;
    contained?: any[];
    extension?: FHIR.Extension[];
    failureAction?: string[] | FHIR.CodeableConcept;
    frequency?: FHIR.Timing;
    id?: string;
    implicitRules?: string;
    language?: string;
    lastPerformed?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    need?: string[] | FHIR.CodeableConcept;
    nextScheduled?: string;
    primarySource?: FHIR.BackboneElement[];
    status?: string;
    statusDate?: string;
    target?: MaybeArray<string | FHIR.Reference>;
    targetLocation?: string[];
    text?: FHIR.Narrative;
    validationProcess?: MaybeArray<string[] | FHIR.CodeableConcept>;
    validationType?: string[] | FHIR.CodeableConcept;
    validator?: FHIR.BackboneElement[];
    [key: string]: any;
};

export default function(props: Partial<VerificationResult_Props>) {
    const resource = {
        resourceType: "VerificationResult",
        ...props
    };

    if (!_.isNil(props.target)) {
        if (!Array.isArray(props.target)) { props.target = [props.target]; }
        resource.target = dt.reference(props.target);
    }

    if (!_.isNil(props.need)) {
        resource.need = dt.concept(props.need);
    }

    if (!_.isNil(props.validationType)) {
        resource.validationType = dt.concept(props.validationType);
    }

    if (!_.isNil(props.validationProcess)) {
        if (!Array.isArray(props.validationProcess)) { props.validationProcess = [props.validationProcess]; }
        resource.validationProcess = dt.concept(props.validationProcess);
    }

    if (!_.isNil(props.failureAction)) {
        resource.failureAction = dt.concept(props.failureAction);
    }

    if (!_.isNil(props.primarySource)) {
        let src = props.primarySource;
        if (!Array.isArray(src)) { src = [src]; }
        resource.primarySource = [];

        for (let item of src) {
            let _primarySource = {
                ...item
            };

            resource.primarySource.push(_primarySource);
        }
    }

    if (!_.isNil(props.attestation)) {
        let src = props.attestation;

        let _attestation = {
            ...item
        };

        resource.attestation = _attestation;
    }

    if (!_.isNil(props.validator)) {
        let src = props.validator;
        if (!Array.isArray(src)) { src = [src]; }
        resource.validator = [];

        for (let item of src) {
            let _validator = {
                ...item
            };

            resource.validator.push(_validator);
        }
    }

    return resource;
}
