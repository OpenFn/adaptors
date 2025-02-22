
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type MedicationDispense_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: Array<string | FHIR.Identifier>;
    partOf?: Array<string | FHIR.Reference>;
    status?: string;
    statusReason?: string[] | FHIR.CodeableConcept;
    category?: string[] | FHIR.CodeableConcept;
    medication?: string[] | FHIR.CodeableConcept;
    subject?: string | FHIR.Reference;
    context?: string | FHIR.Reference;
    supportingInformation?: Array<string | FHIR.Reference>;
    performer?: FHIR.BackboneElement[];
    location?: string | FHIR.Reference;
    authorizingPrescription?: Array<string | FHIR.Reference>;
    type?: string[] | FHIR.CodeableConcept;
    quantity?: FHIR.Quantity;
    daysSupply?: FHIR.Quantity;
    whenPrepared?: string;
    whenHandedOver?: string;
    destination?: string | FHIR.Reference;
    receiver?: Array<string | FHIR.Reference>;
    note?: FHIR.Annotation[];
    dosageInstruction?: FHIR.Dosage[];
    substitution?: FHIR.BackboneElement;
    detectedIssue?: Array<string | FHIR.Reference>;
    eventHistory?: Array<string | FHIR.Reference>;
    initialiser?: any;
    typeShorthands?: any;
    [key: string]: any;
};

export default function(props: Partial<MedicationDispense_Props>) {
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

    return resource;
}
