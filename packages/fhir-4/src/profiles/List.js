
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "List",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>List</b></p></div>"
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

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.mode)) {
        resource.mode = props.mode;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.source)) {
        resource.source = util.reference(props.source);
    }

    if (!_.isNil(props.orderedBy)) {
        resource.orderedBy = props.orderedBy;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
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

            if (!_.isNil(item.flag)) {
                _entry.flag = item.flag;
            }

            if (!_.isNil(item.deleted)) {
                _entry.deleted = item.deleted;
            }

            if (!_.isNil(item.date)) {
                _entry.date = item.date;
            }

            if (!_.isNil(item.item)) {
                _entry.item = item.item;
            }

            resource.entry.push(_entry);
        }
    }

    if (!_.isNil(props.emptyReason)) {
        resource.emptyReason = props.emptyReason;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/List"]
    };

    return resource;
}
