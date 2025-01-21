
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Communication",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Communication</b></p></div>"
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

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.inResponseTo)) {
        if (!Array.isArray(props.inResponseTo)) { props.inResponseTo = [props.inResponseTo]; }
        resource.inResponseTo = dt.reference(props.inResponseTo);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.medium)) {
        resource.medium = props.medium;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
    }

    if (!_.isNil(props.about)) {
        if (!Array.isArray(props.about)) { props.about = [props.about]; }
        resource.about = dt.reference(props.about);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.sent)) {
        resource.sent = props.sent;
    }

    if (!_.isNil(props.received)) {
        resource.received = props.received;
    }

    if (!_.isNil(props.recipient)) {
        if (!Array.isArray(props.recipient)) { props.recipient = [props.recipient]; }
        resource.recipient = dt.reference(props.recipient);
    }

    if (!_.isNil(props.sender)) {
        resource.sender = dt.reference(props.sender);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.payload)) {
        let src = props.payload;
        if (!Array.isArray(src)) { src = [src]; }
        resource.payload = [];

        for (let item of src) {
            let _payload = {};

            if (!_.isNil(item.id)) {
                _payload.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _payload.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.content)) {
                _payload.content = item.content;
            }

            resource.payload.push(_payload);
        }
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Communication"]
    };

    return resource;
}
