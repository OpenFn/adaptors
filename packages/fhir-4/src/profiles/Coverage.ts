
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Coverage_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    status?: string;
    type?: string[] | FHIR.CodeableConcept;
    policyHolder?: string | FHIR.Reference;
    subscriber?: string | FHIR.Reference;
    subscriberId?: string;
    beneficiary?: string | FHIR.Reference;
    dependent?: string;
    relationship?: string[] | FHIR.CodeableConcept;
    period?: FHIR.Period;
    payor?: MaybeArray<string | FHIR.Reference>;
    class?: FHIR.BackboneElement[];
    order?: number;
    network?: string;
    costToBeneficiary?: FHIR.BackboneElement[];
    subrogation?: boolean;
    contract?: MaybeArray<string | FHIR.Reference>;
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

    if (!_.isNil(props.policyHolder)) {
        resource.policyHolder = dt.reference(props.policyHolder);
    }

    if (!_.isNil(props.subscriber)) {
        resource.subscriber = dt.reference(props.subscriber);
    }

    if (!_.isNil(props.beneficiary)) {
        resource.beneficiary = dt.reference(props.beneficiary);
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
