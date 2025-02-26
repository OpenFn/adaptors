
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type MedicationRequest_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    status?: string;
    statusReason?: string[] | FHIR.CodeableConcept;
    intent?: string;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    priority?: string;
    doNotPerform?: boolean;
    reported?: boolean | string | FHIR.Reference;
    medication?: string[] | FHIR.CodeableConcept | string | FHIR.Reference;
    subject?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    supportingInformation?: MaybeArray<string | FHIR.Reference>;
    authoredOn?: string;
    requester?: string | FHIR.Reference;
    performer?: string | FHIR.Reference;
    performerType?: string[] | FHIR.CodeableConcept;
    recorder?: string | FHIR.Reference;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    basedOn?: MaybeArray<string | FHIR.Reference>;
    groupIdentifier?: string | FHIR.Identifier;
    courseOfTherapyType?: string[] | FHIR.CodeableConcept;
    insurance?: MaybeArray<string | FHIR.Reference>;
    note?: FHIR.Annotation[];
    dosageInstruction?: FHIR.Dosage[];
    dispenseRequest?: FHIR.BackboneElement;
    substitution?: FHIR.BackboneElement;
    priorPrescription?: string | FHIR.Reference;
    detectedIssue?: MaybeArray<string | FHIR.Reference>;
    eventHistory?: MaybeArray<string | FHIR.Reference>;
    [key: string]: any;
};

export default function(props: Partial<MedicationRequest_Props>) {
    const resource = {
        resourceType: "MedicationRequest",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.reported)) {
        delete resource.reported;
        dt.composite(resource, "reported", props.reported);
    }

    if (!_.isNil(props.medication)) {
        delete resource.medication;
        dt.composite(resource, "medication", props.medication);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.supportingInformation)) {
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = dt.reference(props.supportingInformation);
    }

    if (!_.isNil(props.requester)) {
        resource.requester = dt.reference(props.requester);
    }

    if (!_.isNil(props.performer)) {
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = dt.reference(props.recorder);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = dt.identifier(props.groupIdentifier);
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = dt.reference(props.insurance);
    }

    if (!_.isNil(props.dispenseRequest)) {
        let src = props.dispenseRequest;

        let _dispenseRequest = {
            ...item
        };

        resource.dispenseRequest = _dispenseRequest;
    }

    if (!_.isNil(props.substitution)) {
        let src = props.substitution;

        let _substitution = {
            ...item
        };

        resource.substitution = _substitution;
    }

    if (!_.isNil(props.priorPrescription)) {
        resource.priorPrescription = dt.reference(props.priorPrescription);
    }

    if (!_.isNil(props.detectedIssue)) {
        if (!Array.isArray(props.detectedIssue)) { props.detectedIssue = [props.detectedIssue]; }
        resource.detectedIssue = dt.reference(props.detectedIssue);
    }

    if (!_.isNil(props.eventHistory)) {
        if (!Array.isArray(props.eventHistory)) { props.eventHistory = [props.eventHistory]; }
        resource.eventHistory = dt.reference(props.eventHistory);
    }

    return resource;
}
