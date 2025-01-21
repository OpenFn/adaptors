
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "NamingSystem",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>NamingSystem</b></p></div>"
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

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.kind)) {
        resource.kind = props.kind;
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

    if (!_.isNil(props.responsible)) {
        resource.responsible = props.responsible;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
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

    if (!_.isNil(props.usage)) {
        resource.usage = props.usage;
    }

    if (!_.isNil(props.uniqueId)) {
        let src = props.uniqueId;
        if (!Array.isArray(src)) { src = [src]; }
        resource.uniqueId = [];

        for (let item of src) {
            let _uniqueId = {};

            if (!_.isNil(item.id)) {
                _uniqueId.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _uniqueId.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _uniqueId.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _uniqueId.value = item.value;
            }

            if (!_.isNil(item.preferred)) {
                _uniqueId.preferred = item.preferred;
            }

            if (!_.isNil(item.comment)) {
                _uniqueId.comment = item.comment;
            }

            if (!_.isNil(item.period)) {
                _uniqueId.period = item.period;
            }

            resource.uniqueId.push(_uniqueId);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/NamingSystem"]
    };

    return resource;
}
