
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type RequestGroup_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    instantiatesCanonical?: any;
    instantiatesUri?: any;
    basedOn?: any;
    replaces?: any;
    groupIdentifier?: dt.Identifier;
    status?: any;
    intent?: any;
    priority?: any;
    code?: any;
    subject?: any;
    encounter?: any;
    authoredOn?: any;
    author?: any;
    reasonCode?: any;
    reasonReference?: any;
    note?: any;
    action?: any;
};

export default function(props: Partial<RequestGroup_Props>) {
    const resource = {
        resourceType: "RequestGroup",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>RequestGroup</b></p></div>"
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

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.replaces)) {
        if (!Array.isArray(props.replaces)) { props.replaces = [props.replaces]; }
        resource.replaces = dt.reference(props.replaces);
    }

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = dt.identifier(props.groupIdentifier);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.authoredOn)) {
        resource.authoredOn = props.authoredOn;
    }

    if (!_.isNil(props.author)) {
        resource.author = dt.reference(props.author);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
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

            if (!_.isNil(item.documentation)) {
                _action.documentation = item.documentation;
            }

            if (!_.isNil(item.condition)) {
                _action.condition = item.condition;
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

            if (!_.isNil(item.resource)) {
                _action.resource = item.resource;
            }

            resource.action.push(_action);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/RequestGroup"]
    };

    return resource;
}
