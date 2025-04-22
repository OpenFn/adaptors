
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type PaymentNotice_Props = {
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
    request?: string | FHIR.Reference;
    response?: string | FHIR.Reference;
    created?: string;
    provider?: string | FHIR.Reference;
    payment?: string | FHIR.Reference;
    paymentDate?: string;
    payee?: string | FHIR.Reference;
    recipient?: string | FHIR.Reference;
    amount?: FHIR.Money;
    paymentStatus?: string[] | FHIR.CodeableConcept;
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

    return resource;
}
