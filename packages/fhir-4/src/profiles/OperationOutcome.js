
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "OperationOutcome",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>OperationOutcome</b></p></div>"
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

    if (!_.isNil(props.issue)) {
        let src = props.issue;
        if (!Array.isArray(src)) { src = [src]; }
        resource.issue = [];

        for (let item of src) {
            let _issue = {};

            if (!_.isNil(item.id)) {
                _issue.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _issue.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.severity)) {
                _issue.severity = item.severity;
            }

            if (!_.isNil(item.code)) {
                _issue.code = item.code;
            }

            if (!_.isNil(item.details)) {
                _issue.details = item.details;
            }

            if (!_.isNil(item.diagnostics)) {
                _issue.diagnostics = item.diagnostics;
            }

            if (!_.isNil(item.location)) {
                _issue.location = item.location;
            }

            if (!_.isNil(item.expression)) {
                _issue.expression = item.expression;
            }

            resource.issue.push(_issue);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/OperationOutcome"]
    };

    return resource;
}
