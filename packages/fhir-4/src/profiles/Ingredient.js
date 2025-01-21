
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Ingredient",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Ingredient</b></p></div>"
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
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.for)) {
        if (!Array.isArray(props.for)) { props.for = [props.for]; }
        resource.for = dt.reference(props.for);
    }

    if (!_.isNil(props.role)) {
        resource.role = props.role;
    }

    if (!_.isNil(props.function)) {
        resource.function = props.function;
    }

    if (!_.isNil(props.allergenicIndicator)) {
        resource.allergenicIndicator = props.allergenicIndicator;
    }

    if (!_.isNil(props.manufacturer)) {
        let src = props.manufacturer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.manufacturer = [];

        for (let item of src) {
            let _manufacturer = {};

            if (!_.isNil(item.id)) {
                _manufacturer.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _manufacturer.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.role)) {
                _manufacturer.role = item.role;
            }

            if (!_.isNil(item.manufacturer)) {
                _manufacturer.manufacturer = item.manufacturer;
            }

            resource.manufacturer.push(_manufacturer);
        }
    }

    if (!_.isNil(props.substance)) {
        let src = props.substance;
        let _substance = {};

        if (!_.isNil(src.id)) {
            _substance.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _substance.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.code)) {
            _substance.code = src.code;
        }

        if (!_.isNil(src.strength)) {
            _substance.strength = src.strength;
        }

        resource.substance = _substance;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Ingredient"]
    };

    return resource;
}
