
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ServiceRequest_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    basedOn?: MaybeArray<string | FHIR.Reference>;
    replaces?: MaybeArray<string | FHIR.Reference>;
    requisition?: string | FHIR.Identifier;
    status?: string;
    intent?: string;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    priority?: string;
    doNotPerform?: boolean;
    code?: string[] | FHIR.CodeableConcept;
    orderDetail?: MaybeArray<string[] | FHIR.CodeableConcept>;
    quantity?: FHIR.Quantity | FHIR.Ratio | FHIR.Range;
    subject?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    occurrence?: string | FHIR.Period | FHIR.Timing;
    asNeeded?: boolean | string[] | FHIR.CodeableConcept;
    authoredOn?: string;
    requester?: string | FHIR.Reference;
    performerType?: string[] | FHIR.CodeableConcept;
    performer?: MaybeArray<string | FHIR.Reference>;
    locationCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    locationReference?: MaybeArray<string | FHIR.Reference>;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    insurance?: MaybeArray<string | FHIR.Reference>;
    supportingInfo?: MaybeArray<string | FHIR.Reference>;
    specimen?: MaybeArray<string | FHIR.Reference>;
    bodySite?: MaybeArray<string[] | FHIR.CodeableConcept>;
    note?: FHIR.Annotation[];
    patientInstruction?: string;
    relevantHistory?: MaybeArray<string | FHIR.Reference>;
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

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.locationReference)) {
        if (!Array.isArray(props.locationReference)) { props.locationReference = [props.locationReference]; }
        resource.locationReference = dt.reference(props.locationReference);
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

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = dt.reference(props.relevantHistory);
    }

    return resource;
}
