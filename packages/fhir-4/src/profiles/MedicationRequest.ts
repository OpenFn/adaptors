
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type MedicationRequest_Props = {
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
    statusReason?: CodeableConcept;
    intent?: string;
    category?: CodeableConcept;
    priority?: string;
    doNotPerform?: boolean;
    reported?: boolean;
    medication?: CodeableConcept;
    subject?: Reference;
    encounter?: Reference;
    supportingInformation?: Reference;
    authoredOn?: string;
    requester?: Reference;
    performer?: Reference;
    performerType?: CodeableConcept;
    recorder?: Reference;
    reasonCode?: CodeableConcept;
    reasonReference?: Reference;
    instantiatesCanonical?: any;
    instantiatesUri?: string;
    basedOn?: Reference;
    groupIdentifier?: Identifier;
    courseOfTherapyType?: CodeableConcept;
    insurance?: Reference;
    note?: Annotation;
    dosageInstruction?: Dosage;
    dispenseRequest?: BackboneElement;
    substitution?: BackboneElement;
    priorPrescription?: Reference;
    detectedIssue?: Reference;
    eventHistory?: Reference;
};

export default function(props: Partial<MedicationRequest_Props>) {
    const resource = {
        resourceType: "MedicationRequest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicationRequest</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.reported)) {
        dt.composite(resource, "reported", props.reported);
    }

    if (!_.isNil(props.medication)) {
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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"]
    };

    return resource;
}
