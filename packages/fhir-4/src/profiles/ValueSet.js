
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "ValueSet",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ValueSet</b></p></div>"
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

    if (!_.isNil(props.immutable)) {
        resource.immutable = props.immutable;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.compose)) {
        let src = props.compose;
        let _compose = {};

        if (!_.isNil(src.id)) {
            _compose.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _compose.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.lockedDate)) {
            _compose.lockedDate = src.lockedDate;
        }

        if (!_.isNil(src.inactive)) {
            _compose.inactive = src.inactive;
        }

        if (!_.isNil(src.include)) {
            _compose.include = src.include;
        }

        resource.compose = _compose;
    }

    if (!_.isNil(props.expansion)) {
        let src = props.expansion;
        let _expansion = {};

        if (!_.isNil(src.id)) {
            _expansion.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _expansion.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.identifier)) {
            _expansion.identifier = src.identifier;
        }

        if (!_.isNil(src.timestamp)) {
            _expansion.timestamp = src.timestamp;
        }

        if (!_.isNil(src.total)) {
            _expansion.total = src.total;
        }

        if (!_.isNil(src.offset)) {
            _expansion.offset = src.offset;
        }

        if (!_.isNil(src.parameter)) {
            _expansion.parameter = src.parameter;
        }

        if (!_.isNil(src.contains)) {
            _expansion.contains = src.contains;
        }

        resource.expansion = _expansion;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"]
    };

    return resource;
}
