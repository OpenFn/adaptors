
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Invoice_Props = {
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
    cancelledReason?: string;
    type?: FHIR.CodeableConcept;
    subject?: FHIR.Reference;
    recipient?: FHIR.Reference;
    date?: string;
    participant?: FHIR.BackboneElement;
    issuer?: FHIR.Reference;
    account?: FHIR.Reference;
    lineItem?: FHIR.BackboneElement;
    totalPriceComponent?: any;
    totalNet?: FHIR.Money;
    totalGross?: FHIR.Money;
    paymentTerms?: FHIR.markdown;
    note?: FHIR.Annotation;
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
