
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Immunization_Props = {
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
    vaccineCode?: CodeableConcept;
    patient?: Reference;
    encounter?: Reference;
    occurrence?: string;
    recorded?: string;
    primarySource?: boolean;
    reportOrigin?: CodeableConcept;
    location?: Reference;
    manufacturer?: Reference;
    lotNumber?: string;
    expirationDate?: string;
    site?: CodeableConcept;
    route?: CodeableConcept;
    doseQuantity?: Quantity;
    performer?: BackboneElement;
    note?: Annotation;
    reasonCode?: CodeableConcept;
    reasonReference?: Reference;
    isSubpotent?: boolean;
    subpotentReason?: CodeableConcept;
    education?: BackboneElement;
    programEligibility?: CodeableConcept;
    fundingSource?: CodeableConcept;
    reaction?: BackboneElement;
    protocolApplied?: BackboneElement;
};

export default function(props: Partial<Immunization_Props>) {
    const resource = {
        resourceType: "Immunization",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Immunization</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Immunization"]
    };

    return resource;
}
