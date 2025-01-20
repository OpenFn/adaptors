
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "DeviceRequest",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DeviceRequest</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.priorRequest)) {
        if (!Array.isArray(props.priorRequest)) { props.priorRequest = [props.priorRequest]; }
        resource.priorRequest = util.reference(props.priorRequest);
    }

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = util.identifier(props.groupIdentifier, undefined);
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
        util.composite(resource, "code", props.code);
    }

    if (!_.isNil(props.parameter)) {
        let src = props.parameter;
        if (!Array.isArray(src)) { src = [src]; }
        resource.parameter = [];

        for (let item of src) {
            let _parameter = {};

            if (!_.isNil(item.id)) {
                _parameter.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _parameter.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _parameter.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _parameter.value = item.value;
            }

            resource.parameter.push(_parameter);
        }
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.occurrence)) {
        util.composite(resource, "occurrence", props.occurrence);
    }

    if (!_.isNil(props.authoredOn)) {
        resource.authoredOn = props.authoredOn;
    }

    if (!_.isNil(props.requester)) {
        resource.requester = util.reference(props.requester);
    }

    if (!_.isNil(props.performerType)) {
        resource.performerType = props.performerType;
    }

    if (!_.isNil(props.performer)) {
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = util.reference(props.insurance);
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = util.reference(props.supportingInfo);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = util.reference(props.relevantHistory);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest"]
    };

    return resource;
}
