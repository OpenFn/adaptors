
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "HealthcareService",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>HealthcareService</b></p></div>"
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

    if (!_.isNil(props.providedBy)) {
        resource.providedBy = dt.reference(props.providedBy);
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.specialty)) {
        resource.specialty = props.specialty;
    }

    if (!_.isNil(props.location)) {
        if (!Array.isArray(props.location)) { props.location = [props.location]; }
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.comment)) {
        resource.comment = props.comment;
    }

    if (!_.isNil(props.extraDetails)) {
        resource.extraDetails = props.extraDetails;
    }

    if (!_.isNil(props.photo)) {
        resource.photo = props.photo;
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.coverageArea)) {
        if (!Array.isArray(props.coverageArea)) { props.coverageArea = [props.coverageArea]; }
        resource.coverageArea = dt.reference(props.coverageArea);
    }

    if (!_.isNil(props.serviceProvisionCode)) {
        resource.serviceProvisionCode = props.serviceProvisionCode;
    }

    if (!_.isNil(props.eligibility)) {
        let src = props.eligibility;
        if (!Array.isArray(src)) { src = [src]; }
        resource.eligibility = [];

        for (let item of src) {
            let _eligibility = {};

            if (!_.isNil(item.id)) {
                _eligibility.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _eligibility.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _eligibility.code = item.code;
            }

            if (!_.isNil(item.comment)) {
                _eligibility.comment = item.comment;
            }

            resource.eligibility.push(_eligibility);
        }
    }

    if (!_.isNil(props.program)) {
        resource.program = props.program;
    }

    if (!_.isNil(props.characteristic)) {
        resource.characteristic = props.characteristic;
    }

    if (!_.isNil(props.communication)) {
        resource.communication = props.communication;
    }

    if (!_.isNil(props.referralMethod)) {
        resource.referralMethod = props.referralMethod;
    }

    if (!_.isNil(props.appointmentRequired)) {
        resource.appointmentRequired = props.appointmentRequired;
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
        resource.endpoint = dt.reference(props.endpoint);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"]
    };

    return resource;
}
