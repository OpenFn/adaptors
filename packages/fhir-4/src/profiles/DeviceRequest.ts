
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type DeviceRequest_Props = {
    authoredOn?: string;
    basedOn?: MaybeArray<string | FHIR.Reference>;
    code?: string | FHIR.Reference | string[] | FHIR.CodeableConcept;
    contained?: any[];
    encounter?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    groupIdentifier?: string | FHIR.Identifier;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: MaybeArray<string | FHIR.Reference>;
    intent?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    occurrence?: string | FHIR.Period | FHIR.Timing;
    parameter?: FHIR.BackboneElement[];
    performer?: string | FHIR.Reference;
    performerType?: string[] | FHIR.CodeableConcept;
    priorRequest?: MaybeArray<string | FHIR.Reference>;
    priority?: string;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    relevantHistory?: MaybeArray<string | FHIR.Reference>;
    requester?: string | FHIR.Reference;
    status?: string;
    subject?: string | FHIR.Reference;
    supportingInfo?: MaybeArray<string | FHIR.Reference>;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<DeviceRequest_Props>) {
    const resource = {
        resourceType: "DeviceRequest",
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

    if (!_.isNil(props.priorRequest)) {
        if (!Array.isArray(props.priorRequest)) { props.priorRequest = [props.priorRequest]; }
        resource.priorRequest = dt.reference(props.priorRequest);
    }

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = dt.identifier(props.groupIdentifier);
    }

    if (!_.isNil(props.code)) {
        delete resource.code;
        dt.composite(resource, "code", props.code);
    }

    if (!_.isNil(props.parameter)) {
        let src = props.parameter;
        if (!Array.isArray(src)) { src = [src]; }
        resource.parameter = [];

        for (let item of src) {
            let _parameter = {
                ...item
            };

            resource.parameter.push(_parameter);
        }
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

    if (!_.isNil(props.requester)) {
        resource.requester = dt.reference(props.requester);
    }

    if (!_.isNil(props.performerType)) {
        resource.performerType = dt.concept(props.performerType);
    }

    if (!_.isNil(props.performer)) {
        resource.performer = dt.reference(props.performer);
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

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = dt.reference(props.relevantHistory);
    }

    return resource;
}
