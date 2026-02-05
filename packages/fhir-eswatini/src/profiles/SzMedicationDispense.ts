
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type MedicationDispense_SzMedicationDispense_Props = {
    authorizingPrescription?: FHIR.Reference[];
    category?: FHIR.CodeableConcept;
    contained?: any[];
    context?: FHIR.Reference;
    daysSupply?: FHIR.Quantity;
    destination?: FHIR.Reference;
    detectedIssue?: FHIR.Reference[];
    dosageInstruction?: FHIR.Dosage[];
    eventHistory?: FHIR.Reference[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    language?: string;
    location?: FHIR.Reference;
    medication?: FHIR.CodeableConcept;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    partOf?: FHIR.Reference[];
    performer?: FHIR.BackboneElement[];
    quantity?: FHIR.Quantity;
    receiver?: FHIR.Reference[];
    status?: string;
    statusReason?: FHIR.CodeableConcept | FHIR.Reference;
    subject?: FHIR.Reference;
    substitution?: FHIR.BackboneElement;
    supportingInformation?: FHIR.Reference[];
    text?: FHIR.Narrative;
    type?: FHIR.CodeableConcept;
    whenHandedOver?: string;
    whenPrepared?: string;
    [key: string]: any;
};

export default function(props: Partial<MedicationDispense_SzMedicationDispense_Props>) {
    const resource = {
        resourceType: "MedicationDispense",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.statusReason)) {
        delete resource.statusReason;
        dt.composite(resource, "statusReason", props.statusReason);
    }

    if (!_.isNil(props.category)) {
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.medication)) {
        delete resource.medication;
        dt.composite(resource, "medication", props.medication);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.context)) {
        resource.context = dt.reference(props.context);
    }

    if (!_.isNil(props.supportingInformation)) {
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = dt.reference(props.supportingInformation);
    }

    if (!_.isNil(props.performer)) {
        let src = props.performer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.performer = [];

        for (let item of src) {
            let _performer = {
                ...item
            };

            resource.performer.push(_performer);
        }
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.authorizingPrescription)) {
        if (!Array.isArray(props.authorizingPrescription)) { props.authorizingPrescription = [props.authorizingPrescription]; }
        resource.authorizingPrescription = dt.reference(props.authorizingPrescription);
    }

    if (!_.isNil(props.type)) {
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.destination)) {
        resource.destination = dt.reference(props.destination);
    }

    if (!_.isNil(props.receiver)) {
        if (!Array.isArray(props.receiver)) { props.receiver = [props.receiver]; }
        resource.receiver = dt.reference(props.receiver);
    }

    if (!_.isNil(props.substitution)) {
        let src = props.substitution;

        let _substitution = {
            ...item
        };

        resource.substitution = _substitution;
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
