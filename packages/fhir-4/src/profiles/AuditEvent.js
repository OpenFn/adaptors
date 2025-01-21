
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "AuditEvent",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AuditEvent</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.subtype)) {
        resource.subtype = props.subtype;
    }

    if (!_.isNil(props.action)) {
        resource.action = props.action;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.recorded)) {
        resource.recorded = props.recorded;
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = props.outcome;
    }

    if (!_.isNil(props.outcomeDesc)) {
        resource.outcomeDesc = props.outcomeDesc;
    }

    if (!_.isNil(props.purposeOfEvent)) {
        resource.purposeOfEvent = props.purposeOfEvent;
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

            if (!_.isNil(item.altId)) {
                _agent.altId = item.altId;
            }

            if (!_.isNil(item.name)) {
                _agent.name = item.name;
            }

            if (!_.isNil(item.requestor)) {
                _agent.requestor = item.requestor;
            }

            if (!_.isNil(item.location)) {
                _agent.location = item.location;
            }

            if (!_.isNil(item.policy)) {
                _agent.policy = item.policy;
            }

            if (!_.isNil(item.media)) {
                _agent.media = item.media;
            }

            if (!_.isNil(item.network)) {
                _agent.network = item.network;
            }

            if (!_.isNil(item.purposeOfUse)) {
                _agent.purposeOfUse = item.purposeOfUse;
            }

            resource.agent.push(_agent);
        }
    }

    if (!_.isNil(props.source)) {
        let src = props.source;
        let _source = {};

        if (!_.isNil(src.id)) {
            _source.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _source.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.site)) {
            _source.site = src.site;
        }

        if (!_.isNil(src.observer)) {
            _source.observer = src.observer;
        }

        if (!_.isNil(src.type)) {
            _source.type = src.type;
        }

        resource.source = _source;
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

            if (!_.isNil(item.what)) {
                _entity.what = item.what;
            }

            if (!_.isNil(item.type)) {
                _entity.type = item.type;
            }

            if (!_.isNil(item.role)) {
                _entity.role = item.role;
            }

            if (!_.isNil(item.lifecycle)) {
                _entity.lifecycle = item.lifecycle;
            }

            if (!_.isNil(item.securityLabel)) {
                _entity.securityLabel = item.securityLabel;
            }

            if (!_.isNil(item.name)) {
                _entity.name = item.name;
            }

            if (!_.isNil(item.description)) {
                _entity.description = item.description;
            }

            if (!_.isNil(item.query)) {
                _entity.query = item.query;
            }

            if (!_.isNil(item.detail)) {
                _entity.detail = item.detail;
            }

            resource.entity.push(_entity);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/AuditEvent"]
    };

    return resource;
}
