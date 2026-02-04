
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Evidence_Props = {
    approvalDate?: string;
    assertion?: FHIR.markdown;
    author?: FHIR.ContactDetail[];
    certainty?: FHIR.BackboneElement[];
    citeAs?: string | FHIR.Reference | FHIR.markdown;
    contact?: FHIR.ContactDetail[];
    contained?: any[];
    date?: string;
    description?: FHIR.markdown;
    editor?: FHIR.ContactDetail[];
    endorser?: FHIR.ContactDetail[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    lastReviewDate?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    publisher?: string;
    relatedArtifact?: FHIR.RelatedArtifact[];
    reviewer?: FHIR.ContactDetail[];
    statistic?: FHIR.BackboneElement[];
    status?: string;
    studyType?: string[] | FHIR.CodeableConcept;
    synthesisType?: string[] | FHIR.CodeableConcept;
    text?: FHIR.Narrative;
    title?: string;
    url?: string;
    useContext?: FHIR.UsageContext[];
    variableDefinition?: FHIR.BackboneElement[];
    version?: string;
    [key: string]: any;
};

export default function(props: Partial<Evidence_Props>) {
    const resource = {
        resourceType: "Evidence",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.citeAs)) {
        delete resource.citeAs;
        dt.composite(resource, "citeAs", props.citeAs);
    }

    if (!_.isNil(props.variableDefinition)) {
        let src = props.variableDefinition;
        if (!Array.isArray(src)) { src = [src]; }
        resource.variableDefinition = [];

        for (let item of src) {
            let _variableDefinition = {
                ...item
            };

            resource.variableDefinition.push(_variableDefinition);
        }
    }

    if (!_.isNil(props.synthesisType)) {
        resource.synthesisType = dt.concept(props.synthesisType);
    }

    if (!_.isNil(props.studyType)) {
        resource.studyType = dt.concept(props.studyType);
    }

    if (!_.isNil(props.statistic)) {
        let src = props.statistic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statistic = [];

        for (let item of src) {
            let _statistic = {
                ...item
            };

            resource.statistic.push(_statistic);
        }
    }

    if (!_.isNil(props.certainty)) {
        let src = props.certainty;
        if (!Array.isArray(src)) { src = [src]; }
        resource.certainty = [];

        for (let item of src) {
            let _certainty = {
                ...item
            };

            resource.certainty.push(_certainty);
        }
    }

    return resource;
}
