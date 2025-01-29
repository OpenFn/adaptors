
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type PaymentNotice_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    status?: any;
    request?: any;
    response?: any;
    created?: any;
    provider?: any;
    payment?: any;
    paymentDate?: any;
    payee?: any;
    recipient?: any;
    amount?: any;
    paymentStatus?: any;
};

export default function(props: Partial<PaymentNotice_Props>) {
    const resource = {
        resourceType: "PaymentNotice",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>PaymentNotice</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.implicitRules)) {
        resource.implicitRules = props.implicitRules;
    }

    if (!_.isNil(props.language)) {
        resource.language = props.language;
    }

    if (!_.isNil(props.text)) {
        resource.text = props.text;
    }

    if (!_.isNil(props.contained)) {
        resource.contained = props.contained;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.modifierExtension)) {
        resource.modifierExtension = props.modifierExtension;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.request)) {
        resource.request = dt.reference(props.request);
    }

    if (!_.isNil(props.response)) {
        resource.response = dt.reference(props.response);
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.provider)) {
        resource.provider = dt.reference(props.provider);
    }

    if (!_.isNil(props.payment)) {
        resource.payment = dt.reference(props.payment);
    }

    if (!_.isNil(props.paymentDate)) {
        resource.paymentDate = props.paymentDate;
    }

    if (!_.isNil(props.payee)) {
        resource.payee = dt.reference(props.payee);
    }

    if (!_.isNil(props.recipient)) {
        resource.recipient = dt.reference(props.recipient);
    }

    if (!_.isNil(props.amount)) {
        resource.amount = props.amount;
    }

    if (!_.isNil(props.paymentStatus)) {
        resource.paymentStatus = props.paymentStatus;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/PaymentNotice"]
    };

    return resource;
}
