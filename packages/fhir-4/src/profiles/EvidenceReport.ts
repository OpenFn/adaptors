
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type EvidenceReport_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    url?: string;
    status?: string;
    useContext?: UsageContext;
    identifier?: Identifier;
    relatedIdentifier?: Identifier;
    citeAs?: Reference;
    type?: CodeableConcept;
    note?: Annotation;
    relatedArtifact?: RelatedArtifact;
    subject?: BackboneElement;
    publisher?: string;
    contact?: ContactDetail;
    author?: ContactDetail;
    editor?: ContactDetail;
    reviewer?: ContactDetail;
    endorser?: ContactDetail;
    relatesTo?: BackboneElement;
    section?: BackboneElement;
};

export default function(props: Partial<EvidenceReport_Props>) {
    const resource = {
        resourceType: "EvidenceReport",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>EvidenceReport</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/EvidenceReport"]
    };

    return resource;
}
