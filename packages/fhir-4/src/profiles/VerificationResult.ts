
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type VerificationResult_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    target?: Reference;
    targetLocation?: string;
    need?: CodeableConcept;
    status?: string;
    statusDate?: string;
    validationType?: CodeableConcept;
    validationProcess?: CodeableConcept;
    frequency?: Timing;
    lastPerformed?: string;
    nextScheduled?: string;
    failureAction?: CodeableConcept;
    primarySource?: BackboneElement;
    attestation?: BackboneElement;
    validator?: BackboneElement;
};

export default function(props: Partial<VerificationResult_Props>) {
    const resource = {
        resourceType: "VerificationResult",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>VerificationResult</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/VerificationResult"]
    };

    return resource;
}
