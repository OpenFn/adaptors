
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Account",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Account</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.servicePeriod)) {
        resource.servicePeriod = props.servicePeriod;
    }

    if (!_.isNil(props.coverage)) {
        let src = props.coverage;
        if (!Array.isArray(src)) { src = [src]; }
        resource.coverage = [];

        for (let item of src) {
            let _coverage = {};

            if (!_.isNil(item.id)) {
                _coverage.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _coverage.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.coverage)) {
                _coverage.coverage = item.coverage;
            }

            if (!_.isNil(item.priority)) {
                _coverage.priority = item.priority;
            }

            resource.coverage.push(_coverage);
        }
    }

    if (!_.isNil(props.owner)) {
        resource.owner = util.reference(props.owner);
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.guarantor)) {
        let src = props.guarantor;
        if (!Array.isArray(src)) { src = [src]; }
        resource.guarantor = [];

        for (let item of src) {
            let _guarantor = {};

            if (!_.isNil(item.id)) {
                _guarantor.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _guarantor.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.party)) {
                _guarantor.party = item.party;
            }

            if (!_.isNil(item.onHold)) {
                _guarantor.onHold = item.onHold;
            }

            if (!_.isNil(item.period)) {
                _guarantor.period = item.period;
            }

            resource.guarantor.push(_guarantor);
        }
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Account"]
    };

    return resource;
}
