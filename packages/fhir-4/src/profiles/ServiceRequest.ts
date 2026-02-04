
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ServiceRequest_Props = {
    asNeeded?: boolean | string[] | FHIR.CodeableConcept;
    authoredOn?: string;
    basedOn?: MaybeArray<string | FHIR.Reference>;
    bodySite?: MaybeArray<string[] | FHIR.CodeableConcept>;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    code?: string[] | FHIR.CodeableConcept;
    contained?: any[];
    doNotPerform?: boolean;
    encounter?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: MaybeArray<string | FHIR.Reference>;
    intent?: string;
    language?: string;
    locationCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    locationReference?: MaybeArray<string | FHIR.Reference>;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    occurrence?: string | FHIR.Period | FHIR.Timing;
    orderDetail?: MaybeArray<string[] | FHIR.CodeableConcept>;
    patientInstruction?: string;
    performer?: MaybeArray<string | FHIR.Reference>;
    performerType?: string[] | FHIR.CodeableConcept;
    priority?: string;
    quantity?: FHIR.Quantity | FHIR.Ratio | FHIR.Range;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    relevantHistory?: MaybeArray<string | FHIR.Reference>;
    replaces?: MaybeArray<string | FHIR.Reference>;
    requester?: string | FHIR.Reference;
    requisition?: string | FHIR.Identifier;
    specimen?: MaybeArray<string | FHIR.Reference>;
    status?: string;
    subject?: string | FHIR.Reference;
    supportingInfo?: MaybeArray<string | FHIR.Reference>;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<ServiceRequest_Props>) {
    const resource = {
        resourceType: "ServiceRequest",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.replaces)) {
        if (!Array.isArray(props.replaces)) { props.replaces = [props.replaces]; }
        resource.replaces = dt.reference(props.replaces);
    }

    if (!_.isNil(props.requisition)) {
        resource.requisition = dt.identifier(props.requisition);
    }

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.orderDetail)) {
        if (!Array.isArray(props.orderDetail)) { props.orderDetail = [props.orderDetail]; }
        resource.orderDetail = dt.concept(props.orderDetail);
    }

    if (!_.isNil(props.quantity)) {
        delete resource.quantity;
        dt.composite(resource, "quantity", props.quantity);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.occurrence)) {
        delete resource.occurrence;
        dt.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.asNeeded)) {
        delete resource.asNeeded;
        dt.composite(resource, "asNeeded", props.asNeeded);
    }

    if (!_.isNil(props.requester)) {
        resource.requester = dt.reference(props.requester);
    }

    if (!_.isNil(props.performerType)) {
        resource.performerType = dt.concept(props.performerType);
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.locationCode)) {
        if (!Array.isArray(props.locationCode)) { props.locationCode = [props.locationCode]; }
        resource.locationCode = dt.concept(props.locationCode);
    }

    if (!_.isNil(props.locationReference)) {
        if (!Array.isArray(props.locationReference)) { props.locationReference = [props.locationReference]; }
        resource.locationReference = dt.reference(props.locationReference);
    }

    if (!_.isNil(props.reasonCode)) {
        if (!Array.isArray(props.reasonCode)) { props.reasonCode = [props.reasonCode]; }
        resource.reasonCode = dt.concept(props.reasonCode);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = dt.reference(props.insurance);
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = dt.reference(props.supportingInfo);
    }

    if (!_.isNil(props.specimen)) {
        if (!Array.isArray(props.specimen)) { props.specimen = [props.specimen]; }
        resource.specimen = dt.reference(props.specimen);
    }

    if (!_.isNil(props.bodySite)) {
        if (!Array.isArray(props.bodySite)) { props.bodySite = [props.bodySite]; }
        resource.bodySite = dt.concept(props.bodySite);
    }

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = dt.reference(props.relevantHistory);
    }

    return resource;
}
