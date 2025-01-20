
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "PractitionerRole",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>PractitionerRole</b></p></div>"
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

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.practitioner)) {
        resource.practitioner = util.reference(props.practitioner);
    }

    if (!_.isNil(props.organization)) {
        resource.organization = util.reference(props.organization);
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.specialty)) {
        resource.specialty = props.specialty;
    }

    if (!_.isNil(props.location)) {
        if (!Array.isArray(props.location)) { props.location = [props.location]; }
        resource.location = util.reference(props.location);
    }

    if (!_.isNil(props.healthcareService)) {
        if (!Array.isArray(props.healthcareService)) { props.healthcareService = [props.healthcareService]; }
        resource.healthcareService = util.reference(props.healthcareService);
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.availableTime)) {
        let src = props.availableTime;
        if (!Array.isArray(src)) { src = [src]; }
        resource.availableTime = [];

        for (let item of src) {
            let _availableTime = {};

            if (!_.isNil(item.id)) {
                _availableTime.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _availableTime.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.daysOfWeek)) {
                _availableTime.daysOfWeek = item.daysOfWeek;
            }

            if (!_.isNil(item.allDay)) {
                _availableTime.allDay = item.allDay;
            }

            if (!_.isNil(item.availableStartTime)) {
                _availableTime.availableStartTime = item.availableStartTime;
            }

            if (!_.isNil(item.availableEndTime)) {
                _availableTime.availableEndTime = item.availableEndTime;
            }

            resource.availableTime.push(_availableTime);
        }
    }

    if (!_.isNil(props.notAvailable)) {
        let src = props.notAvailable;
        if (!Array.isArray(src)) { src = [src]; }
        resource.notAvailable = [];

        for (let item of src) {
            let _notAvailable = {};

            if (!_.isNil(item.id)) {
                _notAvailable.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _notAvailable.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _notAvailable.description = item.description;
            }

            if (!_.isNil(item.during)) {
                _notAvailable.during = item.during;
            }

            resource.notAvailable.push(_notAvailable);
        }
    }

    if (!_.isNil(props.availabilityExceptions)) {
        resource.availabilityExceptions = props.availabilityExceptions;
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = util.reference(props.endpoint);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/PractitionerRole"]
    };

    return resource;
}
