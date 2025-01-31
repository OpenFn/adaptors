
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type EventDefinition_Props = {
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
    subtitle?: string;
    status?: string;
    experimental?: boolean;
    subject?: CodeableConcept;
    date?: string;
    publisher?: string;
    contact?: ContactDetail;
    description?: markdown;
    useContext?: UsageContext;
    jurisdiction?: CodeableConcept;
    purpose?: markdown;
    usage?: string;
    copyright?: markdown;
    approvalDate?: string;
    lastReviewDate?: string;
    effectivePeriod?: Period;
    topic?: CodeableConcept;
    author?: ContactDetail;
    editor?: ContactDetail;
    reviewer?: ContactDetail;
    endorser?: ContactDetail;
    relatedArtifact?: RelatedArtifact;
    trigger?: TriggerDefinition;
};

export default function(props: Partial<EventDefinition_Props>) {
    const resource = {
        resourceType: "EventDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>EventDefinition</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.subtitle)) {
        resource.subtitle = props.subtitle;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.subject)) {
        dt.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.usage)) {
        resource.usage = props.usage;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.trigger)) {
        resource.trigger = props.trigger;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/EventDefinition"]
    };

    return resource;
}
