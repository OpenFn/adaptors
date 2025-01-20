
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.request)) {
        resource.request = util.reference(props.request);
    }

    if (!_.isNil(props.response)) {
        resource.response = util.reference(props.response);
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.provider)) {
        resource.provider = util.reference(props.provider);
    }

    if (!_.isNil(props.payment)) {
        resource.payment = util.reference(props.payment);
    }

    if (!_.isNil(props.paymentDate)) {
        resource.paymentDate = props.paymentDate;
    }

    if (!_.isNil(props.payee)) {
        resource.payee = util.reference(props.payee);
    }

    if (!_.isNil(props.recipient)) {
        resource.recipient = util.reference(props.recipient);
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
