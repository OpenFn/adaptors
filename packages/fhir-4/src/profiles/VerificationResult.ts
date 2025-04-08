
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type VerificationResult_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    target?: MaybeArray<string | FHIR.Reference>;
    targetLocation?: string[];
    need?: string[] | FHIR.CodeableConcept;
    status?: string;
    statusDate?: string;
    validationType?: string[] | FHIR.CodeableConcept;
    validationProcess?: MaybeArray<string[] | FHIR.CodeableConcept>;
    frequency?: FHIR.Timing;
    lastPerformed?: string;
    nextScheduled?: string;
    failureAction?: string[] | FHIR.CodeableConcept;
    primarySource?: FHIR.BackboneElement[];
    attestation?: FHIR.BackboneElement;
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
