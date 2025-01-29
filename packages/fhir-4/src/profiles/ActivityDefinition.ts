
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type ActivityDefinition_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    url?: any;
    identifier?: dt.Identifier;
    version?: any;
    name?: any;
    title?: any;
    subtitle?: any;
    status?: any;
    experimental?: any;
    subject?: any;
    date?: any;
    publisher?: any;
    contact?: any;
    description?: any;
    useContext?: any;
    jurisdiction?: any;
    purpose?: any;
    usage?: any;
    copyright?: any;
    approvalDate?: any;
    lastReviewDate?: any;
    effectivePeriod?: any;
    topic?: any;
    author?: any;
    editor?: any;
    reviewer?: any;
    endorser?: any;
    relatedArtifact?: any;
    library?: any;
    kind?: any;
    profile?: any;
    code?: any;
    intent?: any;
    priority?: any;
    doNotPerform?: any;
    timing?: any;
    location?: any;
    participant?: any;
    product?: any;
    quantity?: any;
    dosage?: any;
    bodySite?: any;
    specimenRequirement?: any;
    observationRequirement?: any;
    observationResultRequirement?: any;
    transform?: any;
    dynamicValue?: any;
};

export default function(props: Partial<ActivityDefinition_Props>) {
    const resource = {
        resourceType: "ActivityDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ActivityDefinition</b></p></div>"
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

    if (!_.isNil(props.library)) {
        resource.library = props.library;
    }

    if (!_.isNil(props.kind)) {
        resource.kind = props.kind;
    }

    if (!_.isNil(props.profile)) {
        resource.profile = props.profile;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.doNotPerform)) {
        resource.doNotPerform = props.doNotPerform;
    }

    if (!_.isNil(props.timing)) {
        dt.composite(resource, "timing", props.timing);
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.participant)) {
        let src = props.participant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.participant = [];

        for (let item of src) {
            let _participant = {};

            if (!_.isNil(item.id)) {
                _participant.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _participant.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _participant.type = item.type;
            }

            if (!_.isNil(item.role)) {
                _participant.role = item.role;
            }

            resource.participant.push(_participant);
        }
    }

    if (!_.isNil(props.product)) {
        dt.composite(resource, "product", props.product);
    }

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.dosage)) {
        resource.dosage = props.dosage;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.specimenRequirement)) {
        if (!Array.isArray(props.specimenRequirement)) { props.specimenRequirement = [props.specimenRequirement]; }
        resource.specimenRequirement = dt.reference(props.specimenRequirement);
    }

    if (!_.isNil(props.observationRequirement)) {
        if (!Array.isArray(props.observationRequirement)) { props.observationRequirement = [props.observationRequirement]; }
        resource.observationRequirement = dt.reference(props.observationRequirement);
    }

    if (!_.isNil(props.observationResultRequirement)) {
        if (!Array.isArray(props.observationResultRequirement)) { props.observationResultRequirement = [props.observationResultRequirement]; }
        resource.observationResultRequirement = dt.reference(props.observationResultRequirement);
    }

    if (!_.isNil(props.transform)) {
        resource.transform = props.transform;
    }

    if (!_.isNil(props.dynamicValue)) {
        let src = props.dynamicValue;
        if (!Array.isArray(src)) { src = [src]; }
        resource.dynamicValue = [];

        for (let item of src) {
            let _dynamicValue = {};

            if (!_.isNil(item.id)) {
                _dynamicValue.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _dynamicValue.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.path)) {
                _dynamicValue.path = item.path;
            }

            if (!_.isNil(item.expression)) {
                _dynamicValue.expression = item.expression;
            }

            resource.dynamicValue.push(_dynamicValue);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition"]
    };

    return resource;
}
