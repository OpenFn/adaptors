
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Group",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Group</b></p></div>"
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

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.actual)) {
        resource.actual = props.actual;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.managingEntity)) {
        resource.managingEntity = dt.reference(props.managingEntity);
    }

    if (!_.isNil(props.characteristic)) {
        let src = props.characteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.characteristic = [];

        for (let item of src) {
            let _characteristic = {};

            if (!_.isNil(item.id)) {
                _characteristic.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _characteristic.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _characteristic.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _characteristic.value = item.value;
            }

            if (!_.isNil(item.exclude)) {
                _characteristic.exclude = item.exclude;
            }

            if (!_.isNil(item.period)) {
                _characteristic.period = item.period;
            }

            resource.characteristic.push(_characteristic);
        }
    }

    if (!_.isNil(props.member)) {
        let src = props.member;
        if (!Array.isArray(src)) { src = [src]; }
        resource.member = [];

        for (let item of src) {
            let _member = {};

            if (!_.isNil(item.id)) {
                _member.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _member.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.entity)) {
                _member.entity = item.entity;
            }

            if (!_.isNil(item.period)) {
                _member.period = item.period;
            }

            if (!_.isNil(item.inactive)) {
                _member.inactive = item.inactive;
            }

            resource.member.push(_member);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Group"]
    };

    return resource;
}
