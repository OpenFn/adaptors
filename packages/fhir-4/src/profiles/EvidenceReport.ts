
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type EvidenceReport_Props = {
    author?: FHIR.ContactDetail[];
    citeAs?: string | FHIR.Reference | FHIR.markdown;
    contact?: FHIR.ContactDetail[];
    contained?: any[];
    editor?: FHIR.ContactDetail[];
    endorser?: FHIR.ContactDetail[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    publisher?: string;
    relatedArtifact?: FHIR.RelatedArtifact[];
    relatedIdentifier?: MaybeArray<string | FHIR.Identifier>;
    relatesTo?: FHIR.BackboneElement[];
    reviewer?: FHIR.ContactDetail[];
    section?: FHIR.BackboneElement[];
    status?: string;
    subject?: FHIR.BackboneElement;
    text?: FHIR.Narrative;
    type?: string[] | FHIR.CodeableConcept;
    url?: string;
    useContext?: FHIR.UsageContext[];
    [key: string]: any;
};

export default function(props: Partial<EvidenceReport_Props>) {
    const resource = {
        resourceType: "EvidenceReport",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.relatedIdentifier)) {
        if (!Array.isArray(props.relatedIdentifier)) { props.relatedIdentifier = [props.relatedIdentifier]; }
        resource.relatedIdentifier = dt.identifier(props.relatedIdentifier);
    }

    if (!_.isNil(props.citeAs)) {
        delete resource.citeAs;
        dt.composite(resource, "citeAs", props.citeAs);
    }

    if (!_.isNil(props.type)) {
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.subject)) {
        let src = props.subject;

        let _subject = {
            ...item
        };

        resource.subject = _subject;
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

    if (!_.isNil(props.section)) {
        let src = props.section;
        if (!Array.isArray(src)) { src = [src]; }
        resource.section = [];

        for (let item of src) {
            let _section = {
                ...item
            };

            resource.section.push(_section);
        }
    }

    return resource;
}
