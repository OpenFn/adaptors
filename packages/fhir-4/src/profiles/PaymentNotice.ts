
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type PaymentNotice_Props = {
    amount?: FHIR.Money;
    contained?: any[];
    created?: string;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    payee?: string | FHIR.Reference;
    payment?: string | FHIR.Reference;
    paymentDate?: string;
    paymentStatus?: string[] | FHIR.CodeableConcept;
    provider?: string | FHIR.Reference;
    recipient?: string | FHIR.Reference;
    request?: string | FHIR.Reference;
    response?: string | FHIR.Reference;
    status?: string;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<PaymentNotice_Props>) {
    const resource = {
        resourceType: "PaymentNotice",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.request)) {
        resource.request = dt.reference(props.request);
    }

    if (!_.isNil(props.response)) {
        resource.response = dt.reference(props.response);
    }

    if (!_.isNil(props.provider)) {
        resource.provider = dt.reference(props.provider);
    }

    if (!_.isNil(props.payment)) {
        resource.payment = dt.reference(props.payment);
    }

    if (!_.isNil(props.payee)) {
        resource.payee = dt.reference(props.payee);
    }

    if (!_.isNil(props.recipient)) {
        resource.recipient = dt.reference(props.recipient);
    }

    if (!_.isNil(props.paymentStatus)) {
        resource.paymentStatus = dt.concept(props.paymentStatus);
    }

    return resource;
}
