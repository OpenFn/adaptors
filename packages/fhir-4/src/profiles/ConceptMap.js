
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "ConceptMap",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ConceptMap</b></p></div>"
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

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.source)) {
        util.composite(resource, "source", props.source);
    }

    if (!_.isNil(props.target)) {
        util.composite(resource, "target", props.target);
    }

    if (!_.isNil(props.group)) {
        let src = props.group;
        if (!Array.isArray(src)) { src = [src]; }
        resource.group = [];

        for (let item of src) {
            let _group = {};

            if (!_.isNil(item.id)) {
                _group.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _group.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.source)) {
                _group.source = item.source;
            }

            if (!_.isNil(item.sourceVersion)) {
                _group.sourceVersion = item.sourceVersion;
            }

            if (!_.isNil(item.target)) {
                _group.target = item.target;
            }

            if (!_.isNil(item.targetVersion)) {
                _group.targetVersion = item.targetVersion;
            }

            if (!_.isNil(item.element)) {
                _group.element = item.element;
            }

            if (!_.isNil(item.unmapped)) {
                _group.unmapped = item.unmapped;
            }

            resource.group.push(_group);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ConceptMap"]
    };

    return resource;
}
