
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Invoice_Props = {
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
    cancelledReason?: string;
    type?: CodeableConcept;
    subject?: Reference;
    recipient?: Reference;
    date?: string;
    participant?: BackboneElement;
    issuer?: Reference;
    account?: Reference;
    lineItem?: BackboneElement;
    totalPriceComponent?: any;
    totalNet?: Money;
    totalGross?: Money;
    paymentTerms?: markdown;
    note?: Annotation;
};

export default function(props: Partial<Invoice_Props>) {
    const resource = {
        resourceType: "Invoice",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Invoice</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.recipient)) {
        resource.recipient = dt.reference(props.recipient);
    }

    if (!_.isNil(props.participant)) {
        let src = props.participant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.participant = [];

        for (let item of src) {
            let _participant = {
                ...item
            };

            resource.participant.push(_participant);
        }
    }

    if (!_.isNil(props.issuer)) {
        resource.issuer = dt.reference(props.issuer);
    }

    if (!_.isNil(props.account)) {
        resource.account = dt.reference(props.account);
    }

    if (!_.isNil(props.lineItem)) {
        let src = props.lineItem;
        if (!Array.isArray(src)) { src = [src]; }
        resource.lineItem = [];

        for (let item of src) {
            let _lineItem = {
                ...item
            };

            resource.lineItem.push(_lineItem);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Invoice"]
    };

    return resource;
}
