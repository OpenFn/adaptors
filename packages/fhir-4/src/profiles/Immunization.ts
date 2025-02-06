
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Immunization_Props = {
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
    statusReason?: FHIR.CodeableConcept;
    vaccineCode?: FHIR.CodeableConcept;
    patient?: FHIR.Reference;
    encounter?: FHIR.Reference;
    occurrence?: string;
    recorded?: string;
    primarySource?: boolean;
    reportOrigin?: FHIR.CodeableConcept;
    location?: FHIR.Reference;
    manufacturer?: FHIR.Reference;
    lotNumber?: string;
    expirationDate?: string;
    site?: FHIR.CodeableConcept;
    route?: FHIR.CodeableConcept;
    doseQuantity?: FHIR.Quantity;
    performer?: FHIR.BackboneElement;
    note?: FHIR.Annotation;
    reasonCode?: FHIR.CodeableConcept;
    reasonReference?: FHIR.Reference;
    isSubpotent?: boolean;
    subpotentReason?: FHIR.CodeableConcept;
    education?: FHIR.BackboneElement;
    programEligibility?: FHIR.CodeableConcept;
    fundingSource?: FHIR.CodeableConcept;
    reaction?: FHIR.BackboneElement;
    protocolApplied?: FHIR.BackboneElement;
    initialiser?: any;
};

export default function(props: Partial<Immunization_Props>) {
    const resource = {
        resourceType: "Immunization",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.occurrence)) {
        dt.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.manufacturer)) {
        resource.manufacturer = dt.reference(props.manufacturer);
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

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.education)) {
        let src = props.education;
        if (!Array.isArray(src)) { src = [src]; }
        resource.education = [];

        for (let item of src) {
            let _education = {
                ...item
            };

            resource.education.push(_education);
        }
    }

    if (!_.isNil(props.reaction)) {
        let src = props.reaction;
        if (!Array.isArray(src)) { src = [src]; }
        resource.reaction = [];

        for (let item of src) {
            let _reaction = {
                ...item
            };

            resource.reaction.push(_reaction);
        }
    }

    if (!_.isNil(props.protocolApplied)) {
        let src = props.protocolApplied;
        if (!Array.isArray(src)) { src = [src]; }
        resource.protocolApplied = [];

        for (let item of src) {
            let _protocolApplied = {
                ...item
            };

            resource.protocolApplied.push(_protocolApplied);
        }
    }

    return resource;
}
