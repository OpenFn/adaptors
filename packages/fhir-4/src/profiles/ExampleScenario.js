
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "ExampleScenario",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ExampleScenario</b></p></div>"
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

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.actor)) {
        let src = props.actor;
        if (!Array.isArray(src)) { src = [src]; }
        resource.actor = [];

        for (let item of src) {
            let _actor = {};

            if (!_.isNil(item.id)) {
                _actor.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _actor.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.actorId)) {
                _actor.actorId = item.actorId;
            }

            if (!_.isNil(item.type)) {
                _actor.type = item.type;
            }

            if (!_.isNil(item.name)) {
                _actor.name = item.name;
            }

            if (!_.isNil(item.description)) {
                _actor.description = item.description;
            }

            resource.actor.push(_actor);
        }
    }

    if (!_.isNil(props.instance)) {
        let src = props.instance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.instance = [];

        for (let item of src) {
            let _instance = {};

            if (!_.isNil(item.id)) {
                _instance.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _instance.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.resourceId)) {
                _instance.resourceId = item.resourceId;
            }

            if (!_.isNil(item.resourceType)) {
                _instance.resourceType = item.resourceType;
            }

            if (!_.isNil(item.name)) {
                _instance.name = item.name;
            }

            if (!_.isNil(item.description)) {
                _instance.description = item.description;
            }

            if (!_.isNil(item.version)) {
                _instance.version = item.version;
            }

            if (!_.isNil(item.containedInstance)) {
                _instance.containedInstance = item.containedInstance;
            }

            resource.instance.push(_instance);
        }
    }

    if (!_.isNil(props.process)) {
        let src = props.process;
        if (!Array.isArray(src)) { src = [src]; }
        resource.process = [];

        for (let item of src) {
            let _process = {};

            if (!_.isNil(item.id)) {
                _process.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _process.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.title)) {
                _process.title = item.title;
            }

            if (!_.isNil(item.description)) {
                _process.description = item.description;
            }

            if (!_.isNil(item.preConditions)) {
                _process.preConditions = item.preConditions;
            }

            if (!_.isNil(item.postConditions)) {
                _process.postConditions = item.postConditions;
            }

            if (!_.isNil(item.step)) {
                _process.step = item.step;
            }

            resource.process.push(_process);
        }
    }

    if (!_.isNil(props.workflow)) {
        resource.workflow = props.workflow;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ExampleScenario"]
    };

    return resource;
}
