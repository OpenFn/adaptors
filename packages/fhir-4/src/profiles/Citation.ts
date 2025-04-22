
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Citation_Props = {
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
    name?: string;
    title?: string;
    status?: string;
    experimental?: boolean;
    date?: string;
    publisher?: string;
    contact?: FHIR.ContactDetail[];
    description?: FHIR.markdown;
    useContext?: FHIR.UsageContext[];
    jurisdiction?: MaybeArray<string[] | FHIR.CodeableConcept>;
    purpose?: FHIR.markdown;
    copyright?: FHIR.markdown;
    approvalDate?: string;
    lastReviewDate?: string;
    effectivePeriod?: FHIR.Period;
    author?: FHIR.ContactDetail[];
    editor?: FHIR.ContactDetail[];
    reviewer?: FHIR.ContactDetail[];
    endorser?: FHIR.ContactDetail[];
    summary?: FHIR.BackboneElement[];
    classification?: FHIR.BackboneElement[];
    note?: FHIR.Annotation[];
    currentState?: MaybeArray<string[] | FHIR.CodeableConcept>;
    statusDate?: FHIR.BackboneElement[];
    relatesTo?: FHIR.BackboneElement[];
    citedArtifact?: FHIR.BackboneElement;
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
