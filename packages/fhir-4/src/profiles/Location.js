
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Location",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Location</b></p></div>"
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

    if (!_.isNil(props.operationalStatus)) {
        resource.operationalStatus = props.operationalStatus;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.alias)) {
        resource.alias = props.alias;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.mode)) {
        resource.mode = props.mode;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.physicalType)) {
        resource.physicalType = props.physicalType;
    }

    if (!_.isNil(props.position)) {
        let src = props.position;
        let _position = {};

        if (!_.isNil(src.id)) {
            _position.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _position.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.longitude)) {
            _position.longitude = src.longitude;
        }

        if (!_.isNil(src.latitude)) {
            _position.latitude = src.latitude;
        }

        if (!_.isNil(src.altitude)) {
            _position.altitude = src.altitude;
        }

        resource.position = _position;
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = util.reference(props.managingOrganization);
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    if (!_.isNil(props.hoursOfOperation)) {
        let src = props.hoursOfOperation;
        if (!Array.isArray(src)) { src = [src]; }
        resource.hoursOfOperation = [];

        for (let item of src) {
            let _hoursOfOperation = {};

            if (!_.isNil(item.id)) {
                _hoursOfOperation.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _hoursOfOperation.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.daysOfWeek)) {
                _hoursOfOperation.daysOfWeek = item.daysOfWeek;
            }

            if (!_.isNil(item.allDay)) {
                _hoursOfOperation.allDay = item.allDay;
            }

            if (!_.isNil(item.openingTime)) {
                _hoursOfOperation.openingTime = item.openingTime;
            }

            if (!_.isNil(item.closingTime)) {
                _hoursOfOperation.closingTime = item.closingTime;
            }

            resource.hoursOfOperation.push(_hoursOfOperation);
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
        profile: ["http://hl7.org/fhir/StructureDefinition/Location"]
    };

    return resource;
}
