
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type PaymentNotice_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    status?: string;
    request?: Reference;
    response?: Reference;
    created?: string;
    provider?: Reference;
    payment?: Reference;
    paymentDate?: string;
    payee?: Reference;
    recipient?: Reference;
    amount?: Money;
    paymentStatus?: CodeableConcept;
};

export default function(props: Partial<PaymentNotice_Props>) {
    const resource = {
        resourceType: "PaymentNotice",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>PaymentNotice</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/PaymentNotice"]
    };

    return resource;
}
