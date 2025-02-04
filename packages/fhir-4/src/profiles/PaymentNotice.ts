
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type PaymentNotice_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    status?: string;
    request?: FHIR.Reference;
    response?: FHIR.Reference;
    created?: string;
    provider?: FHIR.Reference;
    payment?: FHIR.Reference;
    paymentDate?: string;
    payee?: FHIR.Reference;
    recipient?: FHIR.Reference;
    amount?: FHIR.Money;
    paymentStatus?: FHIR.CodeableConcept;
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
