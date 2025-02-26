
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type EvidenceReport_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    url?: string;
    status?: string;
    useContext?: FHIR.UsageContext[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    relatedIdentifier?: MaybeArray<string | FHIR.Identifier>;
    citeAs?: string | FHIR.Reference | FHIR.markdown;
    type?: string[] | FHIR.CodeableConcept;
    note?: FHIR.Annotation[];
    relatedArtifact?: FHIR.RelatedArtifact[];
    subject?: FHIR.BackboneElement;
    publisher?: string;
    contact?: FHIR.ContactDetail[];
    author?: FHIR.ContactDetail[];
    editor?: FHIR.ContactDetail[];
    reviewer?: FHIR.ContactDetail[];
    endorser?: FHIR.ContactDetail[];
    relatesTo?: FHIR.BackboneElement[];
    section?: FHIR.BackboneElement[];
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
