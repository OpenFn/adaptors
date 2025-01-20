
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "StructureMap",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>StructureMap</b></p></div>"
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

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.structure)) {
        let src = props.structure;
        if (!Array.isArray(src)) { src = [src]; }
        resource.structure = [];

        for (let item of src) {
            let _structure = {};

            if (!_.isNil(item.id)) {
                _structure.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _structure.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.url)) {
                _structure.url = item.url;
            }

            if (!_.isNil(item.mode)) {
                _structure.mode = item.mode;
            }

            if (!_.isNil(item.alias)) {
                _structure.alias = item.alias;
            }

            if (!_.isNil(item.documentation)) {
                _structure.documentation = item.documentation;
            }

            resource.structure.push(_structure);
        }
    }

    if (!_.isNil(props.import)) {
        resource.import = props.import;
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

            if (!_.isNil(item.name)) {
                _group.name = item.name;
            }

            if (!_.isNil(item.extends)) {
                _group.extends = item.extends;
            }

            if (!_.isNil(item.typeMode)) {
                _group.typeMode = item.typeMode;
            }

            if (!_.isNil(item.documentation)) {
                _group.documentation = item.documentation;
            }

            if (!_.isNil(item.input)) {
                _group.input = item.input;
            }

            if (!_.isNil(item.rule)) {
                _group.rule = item.rule;
            }

            resource.group.push(_group);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/StructureMap"]
    };

    return resource;
}
