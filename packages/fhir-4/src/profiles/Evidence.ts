
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Evidence_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    url?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    version?: string;
    title?: string;
    citeAs?: string | FHIR.Reference | FHIR.markdown;
    status?: string;
    date?: string;
    useContext?: FHIR.UsageContext[];
    approvalDate?: string;
    lastReviewDate?: string;
    publisher?: string;
    contact?: FHIR.ContactDetail[];
    author?: FHIR.ContactDetail[];
    editor?: FHIR.ContactDetail[];
    reviewer?: FHIR.ContactDetail[];
    endorser?: FHIR.ContactDetail[];
    relatedArtifact?: FHIR.RelatedArtifact[];
    description?: FHIR.markdown;
    assertion?: FHIR.markdown;
    note?: FHIR.Annotation[];
    variableDefinition?: FHIR.BackboneElement[];
    synthesisType?: string[] | FHIR.CodeableConcept;
    studyType?: string[] | FHIR.CodeableConcept;
    statistic?: FHIR.BackboneElement[];
    certainty?: FHIR.BackboneElement[];
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
