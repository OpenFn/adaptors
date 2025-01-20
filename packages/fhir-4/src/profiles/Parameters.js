
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Parameters",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Parameters</b></p></div>"
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

            if (!_.isNil(item.value)) {
                _parameter.value = item.value;
            }

            if (!_.isNil(item.resource)) {
                _parameter.resource = item.resource;
            }

            resource.parameter.push(_parameter);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Parameters"]
    };

    return resource;
}
