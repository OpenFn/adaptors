
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Invoice_Props = {
    account?: string | FHIR.Reference;
    cancelledReason?: string;
    contained?: any[];
    date?: string;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    issuer?: string | FHIR.Reference;
    language?: string;
    lineItem?: FHIR.BackboneElement[];
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    participant?: FHIR.BackboneElement[];
    paymentTerms?: FHIR.markdown;
    recipient?: string | FHIR.Reference;
    status?: string;
    subject?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    totalGross?: FHIR.Money;
    totalNet?: FHIR.Money;
    totalPriceComponent?: any[];
    type?: string[] | FHIR.CodeableConcept;
    [key: string]: any;
};

export default function(props: Partial<Invoice_Props>) {
    const resource = {
        resourceType: "Invoice",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.type)) {
        resource.type = dt.concept(props.type);
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

    return resource;
}
