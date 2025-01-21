
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "CodeSystem",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CodeSystem</b></p></div>"
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
        resource.identifier = dt.identifier(props.identifier);
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

    if (!_.isNil(props.caseSensitive)) {
        resource.caseSensitive = props.caseSensitive;
    }

    if (!_.isNil(props.valueSet)) {
        resource.valueSet = props.valueSet;
    }

    if (!_.isNil(props.hierarchyMeaning)) {
        resource.hierarchyMeaning = props.hierarchyMeaning;
    }

    if (!_.isNil(props.compositional)) {
        resource.compositional = props.compositional;
    }

    if (!_.isNil(props.versionNeeded)) {
        resource.versionNeeded = props.versionNeeded;
    }

    if (!_.isNil(props.content)) {
        resource.content = props.content;
    }

    if (!_.isNil(props.supplements)) {
        resource.supplements = props.supplements;
    }

    if (!_.isNil(props.count)) {
        resource.count = props.count;
    }

    if (!_.isNil(props.filter)) {
        let src = props.filter;
        if (!Array.isArray(src)) { src = [src]; }
        resource.filter = [];

        for (let item of src) {
            let _filter = {};

            if (!_.isNil(item.id)) {
                _filter.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _filter.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _filter.code = item.code;
            }

            if (!_.isNil(item.description)) {
                _filter.description = item.description;
            }

            if (!_.isNil(item.operator)) {
                _filter.operator = item.operator;
            }

            if (!_.isNil(item.value)) {
                _filter.value = item.value;
            }

            resource.filter.push(_filter);
        }
    }

    if (!_.isNil(props.property)) {
        let src = props.property;
        if (!Array.isArray(src)) { src = [src]; }
        resource.property = [];

        for (let item of src) {
            let _property = {};

            if (!_.isNil(item.id)) {
                _property.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _property.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _property.code = item.code;
            }

            if (!_.isNil(item.uri)) {
                _property.uri = item.uri;
            }

            if (!_.isNil(item.description)) {
                _property.description = item.description;
            }

            if (!_.isNil(item.type)) {
                _property.type = item.type;
            }

            resource.property.push(_property);
        }
    }

    if (!_.isNil(props.concept)) {
        let src = props.concept;
        if (!Array.isArray(src)) { src = [src]; }
        resource.concept = [];

        for (let item of src) {
            let _concept = {};

            if (!_.isNil(item.id)) {
                _concept.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _concept.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _concept.code = item.code;
            }

            if (!_.isNil(item.display)) {
                _concept.display = item.display;
            }

            if (!_.isNil(item.definition)) {
                _concept.definition = item.definition;
            }

            if (!_.isNil(item.designation)) {
                _concept.designation = item.designation;
            }

            if (!_.isNil(item.property)) {
                _concept.property = item.property;
            }

            resource.concept.push(_concept);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CodeSystem"]
    };

    return resource;
}
