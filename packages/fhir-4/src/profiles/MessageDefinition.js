
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "MessageDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MessageDefinition</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
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

    if (!_.isNil(props.replaces)) {
        resource.replaces = props.replaces;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
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

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.base)) {
        resource.base = props.base;
    }

    if (!_.isNil(props.parent)) {
        resource.parent = props.parent;
    }

    if (!_.isNil(props.event)) {
        util.composite(resource, "event", props.event);
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.focus)) {
        let src = props.focus;
        if (!Array.isArray(src)) { src = [src]; }
        resource.focus = [];

        for (let item of src) {
            let _focus = {};

            if (!_.isNil(item.id)) {
                _focus.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _focus.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _focus.code = item.code;
            }

            if (!_.isNil(item.profile)) {
                _focus.profile = item.profile;
            }

            if (!_.isNil(item.min)) {
                _focus.min = item.min;
            }

            if (!_.isNil(item.max)) {
                _focus.max = item.max;
            }

            resource.focus.push(_focus);
        }
    }

    if (!_.isNil(props.responseRequired)) {
        resource.responseRequired = props.responseRequired;
    }

    if (!_.isNil(props.allowedResponse)) {
        let src = props.allowedResponse;
        if (!Array.isArray(src)) { src = [src]; }
        resource.allowedResponse = [];

        for (let item of src) {
            let _allowedResponse = {};

            if (!_.isNil(item.id)) {
                _allowedResponse.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _allowedResponse.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.message)) {
                _allowedResponse.message = item.message;
            }

            if (!_.isNil(item.situation)) {
                _allowedResponse.situation = item.situation;
            }

            resource.allowedResponse.push(_allowedResponse);
        }
    }

    if (!_.isNil(props.graph)) {
        resource.graph = props.graph;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MessageDefinition"]
    };

    return resource;
}
