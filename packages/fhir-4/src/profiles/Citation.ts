
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Citation_Props = {
    approvalDate?: string;
    author?: FHIR.ContactDetail[];
    citedArtifact?: FHIR.BackboneElement;
    classification?: FHIR.BackboneElement[];
    contact?: FHIR.ContactDetail[];
    contained?: any[];
    copyright?: FHIR.markdown;
    currentState?: MaybeArray<string[] | FHIR.CodeableConcept>;
    date?: string;
    description?: FHIR.markdown;
    editor?: FHIR.ContactDetail[];
    effectivePeriod?: FHIR.Period;
    endorser?: FHIR.ContactDetail[];
    experimental?: boolean;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    jurisdiction?: MaybeArray<string[] | FHIR.CodeableConcept>;
    language?: string;
    lastReviewDate?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    name?: string;
    note?: FHIR.Annotation[];
    publisher?: string;
    purpose?: FHIR.markdown;
    relatesTo?: FHIR.BackboneElement[];
    reviewer?: FHIR.ContactDetail[];
    status?: string;
    statusDate?: FHIR.BackboneElement[];
    summary?: FHIR.BackboneElement[];
    text?: FHIR.Narrative;
    title?: string;
    url?: string;
    useContext?: FHIR.UsageContext[];
    version?: string;
    [key: string]: any;
};

export default function(props: Partial<Citation_Props>) {
    const resource = {
        resourceType: "Citation",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.jurisdiction)) {
        if (!Array.isArray(props.jurisdiction)) { props.jurisdiction = [props.jurisdiction]; }
        resource.jurisdiction = dt.concept(props.jurisdiction);
    }

    if (!_.isNil(props.summary)) {
        let src = props.summary;
        if (!Array.isArray(src)) { src = [src]; }
        resource.summary = [];

        for (let item of src) {
            let _summary = {
                ...item
            };

            resource.summary.push(_summary);
        }
    }

    if (!_.isNil(props.classification)) {
        let src = props.classification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.classification = [];

        for (let item of src) {
            let _classification = {
                ...item
            };

            resource.classification.push(_classification);
        }
    }

    if (!_.isNil(props.currentState)) {
        if (!Array.isArray(props.currentState)) { props.currentState = [props.currentState]; }
        resource.currentState = dt.concept(props.currentState);
    }

    if (!_.isNil(props.statusDate)) {
        let src = props.statusDate;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statusDate = [];

        for (let item of src) {
            let _statusDate = {
                ...item
            };

            resource.statusDate.push(_statusDate);
        }
    }

    if (!_.isNil(props.relatesTo)) {
        let src = props.relatesTo;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relatesTo = [];

        for (let item of src) {
            let _relatesTo = {
                ...item
            };

            resource.relatesTo.push(_relatesTo);
        }
    }

    if (!_.isNil(props.citedArtifact)) {
        let src = props.citedArtifact;

        let _citedArtifact = {
            ...item
        };

        resource.citedArtifact = _citedArtifact;
    }

    return resource;
}
