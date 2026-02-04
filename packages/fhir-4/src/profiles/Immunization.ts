
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Immunization_Props = {
    contained?: any[];
    doseQuantity?: FHIR.Quantity;
    education?: FHIR.BackboneElement[];
    encounter?: string | FHIR.Reference;
    expirationDate?: string;
    extension?: FHIR.Extension[];
    fundingSource?: string[] | FHIR.CodeableConcept;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    isSubpotent?: boolean;
    language?: string;
    location?: string | FHIR.Reference;
    lotNumber?: string;
    manufacturer?: string | FHIR.Reference;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    occurrence?: string;
    patient?: string | FHIR.Reference;
    performer?: FHIR.BackboneElement[];
    primarySource?: boolean;
    programEligibility?: MaybeArray<string[] | FHIR.CodeableConcept>;
    protocolApplied?: FHIR.BackboneElement[];
    reaction?: FHIR.BackboneElement[];
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    recorded?: string;
    reportOrigin?: string[] | FHIR.CodeableConcept;
    route?: string[] | FHIR.CodeableConcept;
    site?: string[] | FHIR.CodeableConcept;
    status?: string;
    statusReason?: string[] | FHIR.CodeableConcept;
    subpotentReason?: MaybeArray<string[] | FHIR.CodeableConcept>;
    text?: FHIR.Narrative;
    vaccineCode?: string[] | FHIR.CodeableConcept;
    [key: string]: any;
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

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = dt.concept(props.statusReason);
    }

    if (!_.isNil(props.vaccineCode)) {
        resource.vaccineCode = dt.concept(props.vaccineCode);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.occurrence)) {
        delete resource.occurrence;
        dt.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.reportOrigin)) {
        resource.reportOrigin = dt.concept(props.reportOrigin);
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.manufacturer)) {
        resource.manufacturer = dt.reference(props.manufacturer);
    }

    if (!_.isNil(props.site)) {
        resource.site = dt.concept(props.site);
    }

    if (!_.isNil(props.route)) {
        resource.route = dt.concept(props.route);
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

    if (!_.isNil(props.reasonCode)) {
        if (!Array.isArray(props.reasonCode)) { props.reasonCode = [props.reasonCode]; }
        resource.reasonCode = dt.concept(props.reasonCode);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.subpotentReason)) {
        if (!Array.isArray(props.subpotentReason)) { props.subpotentReason = [props.subpotentReason]; }
        resource.subpotentReason = dt.concept(props.subpotentReason);
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

    if (!_.isNil(props.programEligibility)) {
        if (!Array.isArray(props.programEligibility)) { props.programEligibility = [props.programEligibility]; }
        resource.programEligibility = dt.concept(props.programEligibility);
    }

    if (!_.isNil(props.fundingSource)) {
        resource.fundingSource = dt.concept(props.fundingSource);
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
