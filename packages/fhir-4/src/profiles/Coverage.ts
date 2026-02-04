
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Coverage_Props = {
    beneficiary?: string | FHIR.Reference;
    class?: FHIR.BackboneElement[];
    contained?: any[];
    contract?: MaybeArray<string | FHIR.Reference>;
    costToBeneficiary?: FHIR.BackboneElement[];
    dependent?: string;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    network?: string;
    order?: number;
    payor?: MaybeArray<string | FHIR.Reference>;
    period?: FHIR.Period;
    policyHolder?: string | FHIR.Reference;
    relationship?: string[] | FHIR.CodeableConcept;
    status?: string;
    subrogation?: boolean;
    subscriber?: string | FHIR.Reference;
    subscriberId?: string;
    text?: FHIR.Narrative;
    type?: string[] | FHIR.CodeableConcept;
    [key: string]: any;
};

export default function(props: Partial<Coverage_Props>) {
    const resource = {
        resourceType: "Coverage",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.type)) {
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.policyHolder)) {
        resource.policyHolder = dt.reference(props.policyHolder);
    }

    if (!_.isNil(props.subscriber)) {
        resource.subscriber = dt.reference(props.subscriber);
    }

    if (!_.isNil(props.beneficiary)) {
        resource.beneficiary = dt.reference(props.beneficiary);
    }

    if (!_.isNil(props.relationship)) {
        resource.relationship = dt.concept(props.relationship);
    }

    if (!_.isNil(props.payor)) {
        if (!Array.isArray(props.payor)) { props.payor = [props.payor]; }
        resource.payor = dt.reference(props.payor);
    }

    if (!_.isNil(props.class)) {
        let src = props.class;
        if (!Array.isArray(src)) { src = [src]; }
        resource.class = [];

        for (let item of src) {
            let _class = {
                ...item
            };

            resource.class.push(_class);
        }
    }

    if (!_.isNil(props.costToBeneficiary)) {
        let src = props.costToBeneficiary;
        if (!Array.isArray(src)) { src = [src]; }
        resource.costToBeneficiary = [];

        for (let item of src) {
            let _costToBeneficiary = {
                ...item
            };

            resource.costToBeneficiary.push(_costToBeneficiary);
        }
    }

    if (!_.isNil(props.contract)) {
        if (!Array.isArray(props.contract)) { props.contract = [props.contract]; }
        resource.contract = dt.reference(props.contract);
    }

    return resource;
}
