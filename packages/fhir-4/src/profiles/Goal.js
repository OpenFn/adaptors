
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Goal",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Goal</b></p></div>"
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
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.lifecycleStatus)) {
        resource.lifecycleStatus = props.lifecycleStatus;
    }

    if (!_.isNil(props.achievementStatus)) {
        resource.achievementStatus = props.achievementStatus;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.start)) {
        dt.composite(resource, "start", props.start);
    }

    if (!_.isNil(props.target)) {
        let src = props.target;
        if (!Array.isArray(src)) { src = [src]; }
        resource.target = [];

        for (let item of src) {
            let _target = {};

            if (!_.isNil(item.id)) {
                _target.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _target.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.measure)) {
                _target.measure = item.measure;
            }

            if (!_.isNil(item.detail)) {
                _target.detail = item.detail;
            }

            if (!_.isNil(item.due)) {
                _target.due = item.due;
            }

            resource.target.push(_target);
        }
    }

    if (!_.isNil(props.statusDate)) {
        resource.statusDate = props.statusDate;
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.expressedBy)) {
        resource.expressedBy = dt.reference(props.expressedBy);
    }

    if (!_.isNil(props.addresses)) {
        if (!Array.isArray(props.addresses)) { props.addresses = [props.addresses]; }
        resource.addresses = dt.reference(props.addresses);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.outcomeCode)) {
        resource.outcomeCode = props.outcomeCode;
    }

    if (!_.isNil(props.outcomeReference)) {
        if (!Array.isArray(props.outcomeReference)) { props.outcomeReference = [props.outcomeReference]; }
        resource.outcomeReference = dt.reference(props.outcomeReference);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Goal"]
    };

    return resource;
}
