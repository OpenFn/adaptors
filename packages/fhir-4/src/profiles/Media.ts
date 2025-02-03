
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Media_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    basedOn?: Reference;
    partOf?: Reference;
    status?: string;
    type?: CodeableConcept;
    modality?: CodeableConcept;
    view?: CodeableConcept;
    subject?: Reference;
    encounter?: Reference;
    created?: string;
    issued?: string;
    operator?: Reference;
    reasonCode?: CodeableConcept;
    bodySite?: CodeableConcept;
    deviceName?: string;
    device?: Reference;
    height?: number;
    width?: number;
    frames?: number;
    duration?: number;
    content?: Attachment;
    note?: Annotation;
};

export default function(props: Partial<Media_Props>) {
    const resource = {
        resourceType: "Media",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Media</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.created)) {
        dt.composite(resource, "created", props.created);
    }

    if (!_.isNil(props.operator)) {
        resource.operator = dt.reference(props.operator);
    }

    if (!_.isNil(props.device)) {
        resource.device = dt.reference(props.device);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Media"]
    };

    return resource;
}
