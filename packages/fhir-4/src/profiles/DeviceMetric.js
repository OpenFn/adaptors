
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "DeviceMetric",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DeviceMetric</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.unit)) {
        resource.unit = props.unit;
    }

    if (!_.isNil(props.source)) {
        resource.source = util.reference(props.source);
    }

    if (!_.isNil(props.parent)) {
        resource.parent = util.reference(props.parent);
    }

    if (!_.isNil(props.operationalStatus)) {
        resource.operationalStatus = props.operationalStatus;
    }

    if (!_.isNil(props.color)) {
        resource.color = props.color;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.measurementPeriod)) {
        resource.measurementPeriod = props.measurementPeriod;
    }

    if (!_.isNil(props.calibration)) {
        let src = props.calibration;
        if (!Array.isArray(src)) { src = [src]; }
        resource.calibration = [];

        for (let item of src) {
            let _calibration = {};

            if (!_.isNil(item.id)) {
                _calibration.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _calibration.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _calibration.type = item.type;
            }

            if (!_.isNil(item.state)) {
                _calibration.state = item.state;
            }

            if (!_.isNil(item.time)) {
                _calibration.time = item.time;
            }

            resource.calibration.push(_calibration);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DeviceMetric"]
    };

    return resource;
}
