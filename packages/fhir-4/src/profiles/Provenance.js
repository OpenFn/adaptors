
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Provenance",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Provenance</b></p></div>"
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

    if (!_.isNil(props.target)) {
        if (!Array.isArray(props.target)) { props.target = [props.target]; }
        resource.target = util.reference(props.target);
    }

    if (!_.isNil(props.occurred)) {
        util.composite(resource, "occurred", props.occurred);
    }

    if (!_.isNil(props.recorded)) {
        resource.recorded = props.recorded;
    }

    if (!_.isNil(props.policy)) {
        resource.policy = props.policy;
    }

    if (!_.isNil(props.location)) {
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.reason)) {
        resource.reason = props.reason;
    }

    if (!_.isNil(props.activity)) {
        resource.activity = props.activity;
    }

    if (!_.isNil(props.agent)) {
        let src = props.agent;
        if (!Array.isArray(src)) { src = [src]; }
        resource.agent = [];

        for (let item of src) {
            let _agent = {};

            if (!_.isNil(item.id)) {
                _agent.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _agent.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _agent.type = item.type;
            }

            if (!_.isNil(item.role)) {
                _agent.role = item.role;
            }

            if (!_.isNil(item.who)) {
                _agent.who = item.who;
            }

            if (!_.isNil(item.onBehalfOf)) {
                _agent.onBehalfOf = item.onBehalfOf;
            }

            resource.agent.push(_agent);
        }
    }

    if (!_.isNil(props.entity)) {
        let src = props.entity;
        if (!Array.isArray(src)) { src = [src]; }
        resource.entity = [];

        for (let item of src) {
            let _entity = {};

            if (!_.isNil(item.id)) {
                _entity.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _entity.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.role)) {
                _entity.role = item.role;
            }

            if (!_.isNil(item.what)) {
                _entity.what = item.what;
            }

            resource.entity.push(_entity);
        }
    }

    if (!_.isNil(props.signature)) {
        resource.signature = props.signature;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Provenance"]
    };

    return resource;
}
