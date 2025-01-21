
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Subscription",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Subscription</b></p></div>"
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

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.end)) {
        resource.end = props.end;
    }

    if (!_.isNil(props.reason)) {
        resource.reason = props.reason;
    }

    if (!_.isNil(props.criteria)) {
        resource.criteria = props.criteria;
    }

    if (!_.isNil(props.error)) {
        resource.error = props.error;
    }

    if (!_.isNil(props.channel)) {
        let src = props.channel;
        let _channel = {};

        if (!_.isNil(src.id)) {
            _channel.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _channel.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _channel.type = src.type;
        }

        if (!_.isNil(src.endpoint)) {
            _channel.endpoint = src.endpoint;
        }

        if (!_.isNil(src.payload)) {
            _channel.payload = src.payload;
        }

        if (!_.isNil(src.header)) {
            _channel.header = src.header;
        }

        resource.channel = _channel;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Subscription"]
    };

    return resource;
}
