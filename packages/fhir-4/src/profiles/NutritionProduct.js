
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "NutritionProduct",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>NutritionProduct</b></p></div>"
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

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.manufacturer)) {
        if (!Array.isArray(props.manufacturer)) { props.manufacturer = [props.manufacturer]; }
        resource.manufacturer = util.reference(props.manufacturer);
    }

    if (!_.isNil(props.nutrient)) {
        let src = props.nutrient;
        if (!Array.isArray(src)) { src = [src]; }
        resource.nutrient = [];

        for (let item of src) {
            let _nutrient = {};

            if (!_.isNil(item.id)) {
                _nutrient.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _nutrient.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.item)) {
                _nutrient.item = item.item;
            }

            if (!_.isNil(item.amount)) {
                _nutrient.amount = item.amount;
            }

            resource.nutrient.push(_nutrient);
        }
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

            if (!_.isNil(item.amount)) {
                _ingredient.amount = item.amount;
            }

            resource.ingredient.push(_ingredient);
        }
    }

    if (!_.isNil(props.knownAllergen)) {
        resource.knownAllergen = props.knownAllergen;
    }

    if (!_.isNil(props.productCharacteristic)) {
        let src = props.productCharacteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.productCharacteristic = [];

        for (let item of src) {
            let _productCharacteristic = {};

            if (!_.isNil(item.id)) {
                _productCharacteristic.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _productCharacteristic.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _productCharacteristic.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _productCharacteristic.value = item.value;
            }

            resource.productCharacteristic.push(_productCharacteristic);
        }
    }

    if (!_.isNil(props.instance)) {
        let src = props.instance;
        let _instance = {};

        if (!_.isNil(src.id)) {
            _instance.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _instance.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.quantity)) {
            _instance.quantity = src.quantity;
        }

        if (!_.isNil(src.identifier)) {
            _instance.identifier = src.identifier;
        }

        if (!_.isNil(src.lotNumber)) {
            _instance.lotNumber = src.lotNumber;
        }

        if (!_.isNil(src.expiry)) {
            _instance.expiry = src.expiry;
        }

        if (!_.isNil(src.useBy)) {
            _instance.useBy = src.useBy;
        }

        resource.instance = _instance;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/NutritionProduct"]
    };

    return resource;
}
