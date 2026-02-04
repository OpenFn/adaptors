
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Measure_Props = {
    approvalDate?: string;
    author?: FHIR.ContactDetail[];
    clinicalRecommendationStatement?: FHIR.markdown;
    compositeScoring?: string[] | FHIR.CodeableConcept;
    contact?: FHIR.ContactDetail[];
    contained?: any[];
    copyright?: FHIR.markdown;
    date?: string;
    definition?: FHIR.markdown[];
    description?: FHIR.markdown;
    disclaimer?: FHIR.markdown;
    editor?: FHIR.ContactDetail[];
    effectivePeriod?: FHIR.Period;
    endorser?: FHIR.ContactDetail[];
    experimental?: boolean;
    extension?: FHIR.Extension[];
    group?: FHIR.BackboneElement[];
    guidance?: FHIR.markdown;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    improvementNotation?: string[] | FHIR.CodeableConcept;
    jurisdiction?: MaybeArray<string[] | FHIR.CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    library?: any[];
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    publisher?: string;
    purpose?: FHIR.markdown;
    rateAggregation?: string;
    rationale?: FHIR.markdown;
    relatedArtifact?: FHIR.RelatedArtifact[];
    reviewer?: FHIR.ContactDetail[];
    riskAdjustment?: string;
    scoring?: string[] | FHIR.CodeableConcept;
    status?: string;
    subject?: string[] | FHIR.CodeableConcept | string | FHIR.Reference;
    subtitle?: string;
    supplementalData?: FHIR.BackboneElement[];
    text?: FHIR.Narrative;
    title?: string;
    topic?: MaybeArray<string[] | FHIR.CodeableConcept>;
    type?: MaybeArray<string[] | FHIR.CodeableConcept>;
    url?: string;
    usage?: string;
    useContext?: FHIR.UsageContext[];
    version?: string;
    [key: string]: any;
};

export default function(props: Partial<Measure_Props>) {
    const resource = {
        resourceType: "Measure",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.subject)) {
        delete resource.subject;
        dt.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.jurisdiction)) {
        if (!Array.isArray(props.jurisdiction)) { props.jurisdiction = [props.jurisdiction]; }
        resource.jurisdiction = dt.concept(props.jurisdiction);
    }

    if (!_.isNil(props.topic)) {
        if (!Array.isArray(props.topic)) { props.topic = [props.topic]; }
        resource.topic = dt.concept(props.topic);
    }

    if (!_.isNil(props.scoring)) {
        resource.scoring = dt.concept(props.scoring);
    }

    if (!_.isNil(props.compositeScoring)) {
        resource.compositeScoring = dt.concept(props.compositeScoring);
    }

    if (!_.isNil(props.type)) {
        if (!Array.isArray(props.type)) { props.type = [props.type]; }
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.improvementNotation)) {
        resource.improvementNotation = dt.concept(props.improvementNotation);
    }

    if (!_.isNil(props.group)) {
        let src = props.group;
        if (!Array.isArray(src)) { src = [src]; }
        resource.group = [];

        for (let item of src) {
            let _group = {
                ...item
            };

            resource.group.push(_group);
        }
    }

    if (!_.isNil(props.supplementalData)) {
        let src = props.supplementalData;
        if (!Array.isArray(src)) { src = [src]; }
        resource.supplementalData = [];

        for (let item of src) {
            let _supplementalData = {
                ...item
            };

            resource.supplementalData.push(_supplementalData);
        }
    }

    return resource;
}
