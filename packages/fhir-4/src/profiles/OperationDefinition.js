
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "OperationDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>OperationDefinition</b></p></div>"
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

    if (!_.isNil(props.kind)) {
        resource.kind = props.kind;
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

    if (!_.isNil(props.affectsState)) {
        resource.affectsState = props.affectsState;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    if (!_.isNil(props.base)) {
        resource.base = props.base;
    }

    if (!_.isNil(props.resource)) {
        resource.resource = props.resource;
    }

    if (!_.isNil(props.system)) {
        resource.system = props.system;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.instance)) {
        resource.instance = props.instance;
    }

    if (!_.isNil(props.inputProfile)) {
        resource.inputProfile = props.inputProfile;
    }

    if (!_.isNil(props.outputProfile)) {
        resource.outputProfile = props.outputProfile;
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

            if (!_.isNil(item.name)) {
                _parameter.name = item.name;
            }

            if (!_.isNil(item.use)) {
                _parameter.use = item.use;
            }

            if (!_.isNil(item.min)) {
                _parameter.min = item.min;
            }

            if (!_.isNil(item.max)) {
                _parameter.max = item.max;
            }

            if (!_.isNil(item.documentation)) {
                _parameter.documentation = item.documentation;
            }

            if (!_.isNil(item.type)) {
                _parameter.type = item.type;
            }

            if (!_.isNil(item.targetProfile)) {
                _parameter.targetProfile = item.targetProfile;
            }

            if (!_.isNil(item.searchType)) {
                _parameter.searchType = item.searchType;
            }

            if (!_.isNil(item.binding)) {
                _parameter.binding = item.binding;
            }

            if (!_.isNil(item.referencedFrom)) {
                _parameter.referencedFrom = item.referencedFrom;
            }

            resource.parameter.push(_parameter);
        }
    }

    if (!_.isNil(props.overload)) {
        let src = props.overload;
        if (!Array.isArray(src)) { src = [src]; }
        resource.overload = [];

        for (let item of src) {
            let _overload = {};

            if (!_.isNil(item.id)) {
                _overload.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _overload.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.parameterName)) {
                _overload.parameterName = item.parameterName;
            }

            if (!_.isNil(item.comment)) {
                _overload.comment = item.comment;
            }

            resource.overload.push(_overload);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/OperationDefinition"]
    };

    return resource;
}
