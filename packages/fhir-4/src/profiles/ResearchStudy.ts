
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ResearchStudy_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    title?: string;
    protocol?: MaybeArray<string | FHIR.Reference>;
    partOf?: MaybeArray<string | FHIR.Reference>;
    status?: string;
    primaryPurposeType?: string[] | FHIR.CodeableConcept;
    phase?: string[] | FHIR.CodeableConcept;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    focus?: MaybeArray<string[] | FHIR.CodeableConcept>;
    condition?: MaybeArray<string[] | FHIR.CodeableConcept>;
    contact?: FHIR.ContactDetail[];
    relatedArtifact?: FHIR.RelatedArtifact[];
    keyword?: MaybeArray<string[] | FHIR.CodeableConcept>;
    location?: MaybeArray<string[] | FHIR.CodeableConcept>;
    description?: FHIR.markdown;
    enrollment?: MaybeArray<string | FHIR.Reference>;
    period?: FHIR.Period;
    sponsor?: string | FHIR.Reference;
    principalInvestigator?: string | FHIR.Reference;
    site?: MaybeArray<string | FHIR.Reference>;
    reasonStopped?: string[] | FHIR.CodeableConcept;
    note?: FHIR.Annotation[];
    arm?: FHIR.BackboneElement[];
    objective?: FHIR.BackboneElement[];
    [key: string]: any;
};

export default function(props: Partial<ResearchStudy_Props>) {
    const resource = {
        resourceType: "ResearchStudy",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.protocol)) {
        if (!Array.isArray(props.protocol)) { props.protocol = [props.protocol]; }
        resource.protocol = dt.reference(props.protocol);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.enrollment)) {
        if (!Array.isArray(props.enrollment)) { props.enrollment = [props.enrollment]; }
        resource.enrollment = dt.reference(props.enrollment);
    }

    if (!_.isNil(props.sponsor)) {
        resource.sponsor = dt.reference(props.sponsor);
    }

    if (!_.isNil(props.principalInvestigator)) {
        resource.principalInvestigator = dt.reference(props.principalInvestigator);
    }

    if (!_.isNil(props.site)) {
        if (!Array.isArray(props.site)) { props.site = [props.site]; }
        resource.site = dt.reference(props.site);
    }

    if (!_.isNil(props.arm)) {
        let src = props.arm;
        if (!Array.isArray(src)) { src = [src]; }
        resource.arm = [];

        for (let item of src) {
            let _arm = {
                ...item
            };

            resource.arm.push(_arm);
        }
    }

    if (!_.isNil(props.objective)) {
        let src = props.objective;
        if (!Array.isArray(src)) { src = [src]; }
        resource.objective = [];

        for (let item of src) {
            let _objective = {
                ...item
            };

            resource.objective.push(_objective);
        }
    }

    return resource;
}
