
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ResearchStudy_Props = {
    arm?: FHIR.BackboneElement[];
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    condition?: MaybeArray<string[] | FHIR.CodeableConcept>;
    contact?: FHIR.ContactDetail[];
    contained?: any[];
    description?: FHIR.markdown;
    enrollment?: MaybeArray<string | FHIR.Reference>;
    extension?: FHIR.Extension[];
    focus?: MaybeArray<string[] | FHIR.CodeableConcept>;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    keyword?: MaybeArray<string[] | FHIR.CodeableConcept>;
    language?: string;
    location?: MaybeArray<string[] | FHIR.CodeableConcept>;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    objective?: FHIR.BackboneElement[];
    partOf?: MaybeArray<string | FHIR.Reference>;
    period?: FHIR.Period;
    phase?: string[] | FHIR.CodeableConcept;
    primaryPurposeType?: string[] | FHIR.CodeableConcept;
    principalInvestigator?: string | FHIR.Reference;
    protocol?: MaybeArray<string | FHIR.Reference>;
    reasonStopped?: string[] | FHIR.CodeableConcept;
    relatedArtifact?: FHIR.RelatedArtifact[];
    site?: MaybeArray<string | FHIR.Reference>;
    sponsor?: string | FHIR.Reference;
    status?: string;
    text?: FHIR.Narrative;
    title?: string;
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

    if (!_.isNil(props.primaryPurposeType)) {
        resource.primaryPurposeType = dt.concept(props.primaryPurposeType);
    }

    if (!_.isNil(props.phase)) {
        resource.phase = dt.concept(props.phase);
    }

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = dt.concept(props.focus);
    }

    if (!_.isNil(props.condition)) {
        if (!Array.isArray(props.condition)) { props.condition = [props.condition]; }
        resource.condition = dt.concept(props.condition);
    }

    if (!_.isNil(props.keyword)) {
        if (!Array.isArray(props.keyword)) { props.keyword = [props.keyword]; }
        resource.keyword = dt.concept(props.keyword);
    }

    if (!_.isNil(props.location)) {
        if (!Array.isArray(props.location)) { props.location = [props.location]; }
        resource.location = dt.concept(props.location);
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

    if (!_.isNil(props.reasonStopped)) {
        resource.reasonStopped = dt.concept(props.reasonStopped);
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
