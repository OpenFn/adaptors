
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type PlanDefinition_Props = {
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
    type?: CodeableConcept;
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
    library?: any;
    goal?: BackboneElement;
    action?: BackboneElement;
};

export default function(props: Partial<PlanDefinition_Props>) {
    const resource = {
        resourceType: "PlanDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>PlanDefinition</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
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

    if (!_.isNil(props.goal)) {
        let src = props.goal;
        if (!Array.isArray(src)) { src = [src]; }
        resource.goal = [];

        for (let item of src) {
            let _goal = {};

            if (!_.isNil(item.id)) {
                _goal.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _goal.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.category)) {
                _goal.category = item.category;
            }

            if (!_.isNil(item.description)) {
                _goal.description = item.description;
            }

            if (!_.isNil(item.priority)) {
                _goal.priority = item.priority;
            }

            if (!_.isNil(item.start)) {
                _goal.start = item.start;
            }

            if (!_.isNil(item.addresses)) {
                _goal.addresses = item.addresses;
            }

            if (!_.isNil(item.documentation)) {
                _goal.documentation = item.documentation;
            }

            if (!_.isNil(item.target)) {
                _goal.target = item.target;
            }

            resource.goal.push(_goal);
        }
    }

    if (!_.isNil(props.action)) {
        let src = props.action;
        if (!Array.isArray(src)) { src = [src]; }
        resource.action = [];

        for (let item of src) {
            let _action = {};

            if (!_.isNil(item.id)) {
                _action.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _action.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.prefix)) {
                _action.prefix = item.prefix;
            }

            if (!_.isNil(item.title)) {
                _action.title = item.title;
            }

            if (!_.isNil(item.description)) {
                _action.description = item.description;
            }

            if (!_.isNil(item.textEquivalent)) {
                _action.textEquivalent = item.textEquivalent;
            }

            if (!_.isNil(item.priority)) {
                _action.priority = item.priority;
            }

            if (!_.isNil(item.code)) {
                _action.code = item.code;
            }

            if (!_.isNil(item.reason)) {
                _action.reason = item.reason;
            }

            if (!_.isNil(item.documentation)) {
                _action.documentation = item.documentation;
            }

            if (!_.isNil(item.goalId)) {
                _action.goalId = item.goalId;
            }

            if (!_.isNil(item.subject)) {
                _action.subject = item.subject;
            }

            if (!_.isNil(item.trigger)) {
                _action.trigger = item.trigger;
            }

            if (!_.isNil(item.condition)) {
                _action.condition = item.condition;
            }

            if (!_.isNil(item.input)) {
                _action.input = item.input;
            }

            if (!_.isNil(item.output)) {
                _action.output = item.output;
            }

            if (!_.isNil(item.relatedAction)) {
                _action.relatedAction = item.relatedAction;
            }

            if (!_.isNil(item.timing)) {
                _action.timing = item.timing;
            }

            if (!_.isNil(item.participant)) {
                _action.participant = item.participant;
            }

            if (!_.isNil(item.type)) {
                _action.type = item.type;
            }

            if (!_.isNil(item.groupingBehavior)) {
                _action.groupingBehavior = item.groupingBehavior;
            }

            if (!_.isNil(item.selectionBehavior)) {
                _action.selectionBehavior = item.selectionBehavior;
            }

            if (!_.isNil(item.requiredBehavior)) {
                _action.requiredBehavior = item.requiredBehavior;
            }

            if (!_.isNil(item.precheckBehavior)) {
                _action.precheckBehavior = item.precheckBehavior;
            }

            if (!_.isNil(item.cardinalityBehavior)) {
                _action.cardinalityBehavior = item.cardinalityBehavior;
            }

            if (!_.isNil(item.definition)) {
                _action.definition = item.definition;
            }

            if (!_.isNil(item.transform)) {
                _action.transform = item.transform;
            }

            if (!_.isNil(item.dynamicValue)) {
                _action.dynamicValue = item.dynamicValue;
            }

            resource.action.push(_action);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"]
    };

    return resource;
}
