
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
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.implicitRules)) {
        resource.implicitRules = props.implicitRules;
    }

    if (!_.isNil(props.language)) {
        resource.language = props.language;
    }

    if (!_.isNil(props.text)) {
        resource.text = props.text;
    }

    if (!_.isNil(props.contained)) {
        resource.contained = props.contained;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.modifierExtension)) {
        resource.modifierExtension = props.modifierExtension;
    }

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

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.modality)) {
        resource.modality = props.modality;
    }

    if (!_.isNil(props.view)) {
        resource.view = props.view;
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

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.operator)) {
        resource.operator = dt.reference(props.operator);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.deviceName)) {
        resource.deviceName = props.deviceName;
    }

    if (!_.isNil(props.device)) {
        resource.device = dt.reference(props.device);
    }

    if (!_.isNil(props.height)) {
        resource.height = props.height;
    }

    if (!_.isNil(props.width)) {
        resource.width = props.width;
    }

    if (!_.isNil(props.frames)) {
        resource.frames = props.frames;
    }

    if (!_.isNil(props.duration)) {
        resource.duration = props.duration;
    }

    if (!_.isNil(props.content)) {
        resource.content = props.content;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Media"]
    };

    return resource;
}
