
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type PaymentReconciliation_Props = {
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
    period?: FHIR.Period;
    created?: string;
    paymentIssuer?: FHIR.Reference;
    request?: FHIR.Reference;
    requestor?: FHIR.Reference;
    outcome?: string;
    disposition?: string;
    paymentDate?: string;
    paymentAmount?: FHIR.Money;
    paymentIdentifier?: FHIR.Identifier;
    detail?: FHIR.BackboneElement;
    formCode?: FHIR.CodeableConcept;
    processNote?: FHIR.BackboneElement;
    initialiser?: any;
};

export default function(props: Partial<PaymentReconciliation_Props>) {
    const resource = {
        resourceType: "PaymentReconciliation",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.paymentIssuer)) {
        resource.paymentIssuer = dt.reference(props.paymentIssuer);
    }

    if (!_.isNil(props.request)) {
        resource.request = dt.reference(props.request);
    }

    if (!_.isNil(props.requestor)) {
        resource.requestor = dt.reference(props.requestor);
    }

    if (!_.isNil(props.paymentIdentifier)) {
        resource.paymentIdentifier = dt.identifier(props.paymentIdentifier);
    }

    if (!_.isNil(props.detail)) {
        let src = props.detail;
        if (!Array.isArray(src)) { src = [src]; }
        resource.detail = [];

        for (let item of src) {
            let _detail = {
                ...item
            };

            resource.detail.push(_detail);
        }
    }

    if (!_.isNil(props.processNote)) {
        let src = props.processNote;
        if (!Array.isArray(src)) { src = [src]; }
        resource.processNote = [];

        for (let item of src) {
            let _processNote = {
                ...item
            };

            resource.processNote.push(_processNote);
        }
    }

    return resource;
}
