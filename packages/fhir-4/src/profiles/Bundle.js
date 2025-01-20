
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Bundle",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Bundle</b></p></div>"
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

    if (!_.isNil(props.identifier)) {
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.timestamp)) {
        resource.timestamp = props.timestamp;
    }

    if (!_.isNil(props.total)) {
        resource.total = props.total;
    }

    if (!_.isNil(props.link)) {
        let src = props.link;
        if (!Array.isArray(src)) { src = [src]; }
        resource.link = [];

        for (let item of src) {
            let _link = {};

            if (!_.isNil(item.id)) {
                _link.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _link.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.relation)) {
                _link.relation = item.relation;
            }

            if (!_.isNil(item.url)) {
                _link.url = item.url;
            }

            resource.link.push(_link);
        }
    }

    if (!_.isNil(props.entry)) {
        let src = props.entry;
        if (!Array.isArray(src)) { src = [src]; }
        resource.entry = [];

        for (let item of src) {
            let _entry = {};

            if (!_.isNil(item.id)) {
                _entry.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _entry.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.fullUrl)) {
                _entry.fullUrl = item.fullUrl;
            }

            if (!_.isNil(item.resource)) {
                _entry.resource = item.resource;
            }

            if (!_.isNil(item.search)) {
                _entry.search = item.search;
            }

            if (!_.isNil(item.request)) {
                _entry.request = item.request;
            }

            if (!_.isNil(item.response)) {
                _entry.response = item.response;
            }

            resource.entry.push(_entry);
        }
    }

    if (!_.isNil(props.signature)) {
        resource.signature = props.signature;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Bundle"]
    };

    return resource;
}
