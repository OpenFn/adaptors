
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "SubscriptionStatus",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SubscriptionStatus</b></p></div>"
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

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.eventsSinceSubscriptionStart)) {
        resource.eventsSinceSubscriptionStart = props.eventsSinceSubscriptionStart;
    }

    if (!_.isNil(props.notificationEvent)) {
        let src = props.notificationEvent;
        if (!Array.isArray(src)) { src = [src]; }
        resource.notificationEvent = [];

        for (let item of src) {
            let _notificationEvent = {};

            if (!_.isNil(item.id)) {
                _notificationEvent.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _notificationEvent.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.eventNumber)) {
                _notificationEvent.eventNumber = item.eventNumber;
            }

            if (!_.isNil(item.timestamp)) {
                _notificationEvent.timestamp = item.timestamp;
            }

            if (!_.isNil(item.focus)) {
                _notificationEvent.focus = item.focus;
            }

            if (!_.isNil(item.additionalContext)) {
                _notificationEvent.additionalContext = item.additionalContext;
            }

            resource.notificationEvent.push(_notificationEvent);
        }
    }

    if (!_.isNil(props.subscription)) {
        resource.subscription = util.reference(props.subscription);
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
    }

    if (!_.isNil(props.error)) {
        resource.error = props.error;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SubscriptionStatus"]
    };

    return resource;
}
