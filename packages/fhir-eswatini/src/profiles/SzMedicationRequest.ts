
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type MedicationRequest_SzMedicationRequest_Props = {
    authoredOn?: string;
    basedOn?: FHIR.Reference[];
    category?: FHIR.CodeableConcept[];
    contained?: any[];
    courseOfTherapyType?: FHIR.CodeableConcept;
    detectedIssue?: FHIR.Reference[];
    dispenseRequest?: FHIR.BackboneElement;
    doNotPerform?: boolean;
    dosageInstruction?: FHIR.Dosage[];
    encounter?: FHIR.Reference;
    eventHistory?: FHIR.Reference[];
    extension?: FHIR.Extension[];
    groupIdentifier?: FHIR.Identifier;
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    insurance?: FHIR.Reference[];
    intent?: string;
    language?: string;
    medication?: FHIR.CodeableConcept;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    performer?: FHIR.Reference;
    performerType?: FHIR.CodeableConcept;
    priorPrescription?: FHIR.Reference;
    priority?: string;
    reasonCode?: FHIR.CodeableConcept[];
    reasonReference?: FHIR.Reference[];
    recorder?: FHIR.Reference;
    reported?: boolean | FHIR.Reference;
    requester?: FHIR.Reference;
    status?: string;
    statusReason?: FHIR.CodeableConcept;
    subject?: FHIR.Reference;
    substitution?: FHIR.BackboneElement;
    supportingInformation?: FHIR.Reference[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<MedicationRequest_SzMedicationRequest_Props>) {
    const resource = {
        resourceType: "MedicationRequest",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = dt.concept(props.statusReason);
    }

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }
        resource.category = dt.concept(props.category);
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

    if (!_.isNil(props.performerType)) {
        resource.performerType = dt.concept(props.performerType);
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = dt.reference(props.recorder);
    }

    if (!_.isNil(props.reasonCode)) {
        if (!Array.isArray(props.reasonCode)) { props.reasonCode = [props.reasonCode]; }
        resource.reasonCode = dt.concept(props.reasonCode);
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

    if (!_.isNil(props.courseOfTherapyType)) {
        resource.courseOfTherapyType = dt.concept(props.courseOfTherapyType);
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = dt.reference(props.insurance);
    }

    if (!_.isNil(props.dosageInstruction)) {
        let src = props.dosageInstruction;
        if (!Array.isArray(src)) { src = [src]; }
        resource.dosageInstruction = [];

        for (let item of src) {
            let _dosageInstruction = {
                ...item
            };

            resource.dosageInstruction.push(_dosageInstruction);
        }
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
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
    return resource;
}
