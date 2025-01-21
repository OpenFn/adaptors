
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Medication",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Medication</b></p></div>"
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

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.manufacturer)) {
        resource.manufacturer = dt.reference(props.manufacturer);
    }

    if (!_.isNil(props.form)) {
        resource.form = props.form;
    }

    if (!_.isNil(props.amount)) {
        resource.amount = props.amount;
    }

    if (!_.isNil(props.ingredient)) {
        let src = props.ingredient;
        if (!Array.isArray(src)) { src = [src]; }
        resource.ingredient = [];

        for (let item of src) {
            let _ingredient = {};

            if (!_.isNil(item.id)) {
                _ingredient.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _ingredient.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.item)) {
                _ingredient.item = item.item;
            }

            if (!_.isNil(item.isActive)) {
                _ingredient.isActive = item.isActive;
            }

            if (!_.isNil(item.strength)) {
                _ingredient.strength = item.strength;
            }

            resource.ingredient.push(_ingredient);
        }
    }

    if (!_.isNil(props.batch)) {
        let src = props.batch;
        let _batch = {};

        if (!_.isNil(src.id)) {
            _batch.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _batch.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.lotNumber)) {
            _batch.lotNumber = src.lotNumber;
        }

        if (!_.isNil(src.expirationDate)) {
            _batch.expirationDate = src.expirationDate;
        }

        resource.batch = _batch;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Medication"]
    };

    return resource;
}
