
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Citation_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    url?: string;
    identifier?: Identifier;
    version?: string;
    name?: string;
    title?: string;
    status?: string;
    experimental?: boolean;
    date?: string;
    publisher?: string;
    contact?: ContactDetail;
    description?: markdown;
    useContext?: UsageContext;
    jurisdiction?: CodeableConcept;
    purpose?: markdown;
    copyright?: markdown;
    approvalDate?: string;
    lastReviewDate?: string;
    effectivePeriod?: Period;
    author?: ContactDetail;
    editor?: ContactDetail;
    reviewer?: ContactDetail;
    endorser?: ContactDetail;
    summary?: BackboneElement;
    classification?: BackboneElement;
    note?: Annotation;
    currentState?: CodeableConcept;
    statusDate?: BackboneElement;
    relatesTo?: BackboneElement;
    citedArtifact?: BackboneElement;
};

export default function(props: Partial<Citation_Props>) {
    const resource = {
        resourceType: "Citation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Citation</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Citation"]
    };

    return resource;
}
