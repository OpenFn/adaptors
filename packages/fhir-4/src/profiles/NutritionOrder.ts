
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type NutritionOrder_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    instantiatesCanonical?: any;
    instantiatesUri?: any;
    instantiates?: any;
    status?: any;
    intent?: any;
    patient?: any;
    encounter?: any;
    dateTime?: any;
    orderer?: any;
    allergyIntolerance?: any;
    foodPreferenceModifier?: any;
    excludeFoodModifier?: any;
    oralDiet?: any;
    supplement?: any;
    enteralFormula?: any;
    note?: any;
};

export default function(props: Partial<NutritionOrder_Props>) {
    const resource = {
        resourceType: "NutritionOrder",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>NutritionOrder</b></p></div>"
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

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.instantiates)) {
        resource.instantiates = props.instantiates;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.dateTime)) {
        resource.dateTime = props.dateTime;
    }

    if (!_.isNil(props.orderer)) {
        resource.orderer = dt.reference(props.orderer);
    }

    if (!_.isNil(props.allergyIntolerance)) {
        if (!Array.isArray(props.allergyIntolerance)) { props.allergyIntolerance = [props.allergyIntolerance]; }
        resource.allergyIntolerance = dt.reference(props.allergyIntolerance);
    }

    if (!_.isNil(props.foodPreferenceModifier)) {
        resource.foodPreferenceModifier = props.foodPreferenceModifier;
    }

    if (!_.isNil(props.excludeFoodModifier)) {
        resource.excludeFoodModifier = props.excludeFoodModifier;
    }

    if (!_.isNil(props.oralDiet)) {
        let src = props.oralDiet;
        let _oralDiet = {};

        if (!_.isNil(src.id)) {
            _oralDiet.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _oralDiet.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _oralDiet.type = src.type;
        }

        if (!_.isNil(src.schedule)) {
            _oralDiet.schedule = src.schedule;
        }

        if (!_.isNil(src.nutrient)) {
            _oralDiet.nutrient = src.nutrient;
        }

        if (!_.isNil(src.texture)) {
            _oralDiet.texture = src.texture;
        }

        if (!_.isNil(src.fluidConsistencyType)) {
            _oralDiet.fluidConsistencyType = src.fluidConsistencyType;
        }

        if (!_.isNil(src.instruction)) {
            _oralDiet.instruction = src.instruction;
        }

        resource.oralDiet = _oralDiet;
    }

    if (!_.isNil(props.supplement)) {
        let src = props.supplement;
        if (!Array.isArray(src)) { src = [src]; }
        resource.supplement = [];

        for (let item of src) {
            let _supplement = {};

            if (!_.isNil(item.id)) {
                _supplement.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _supplement.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _supplement.type = item.type;
            }

            if (!_.isNil(item.productName)) {
                _supplement.productName = item.productName;
            }

            if (!_.isNil(item.schedule)) {
                _supplement.schedule = item.schedule;
            }

            if (!_.isNil(item.quantity)) {
                _supplement.quantity = item.quantity;
            }

            if (!_.isNil(item.instruction)) {
                _supplement.instruction = item.instruction;
            }

            resource.supplement.push(_supplement);
        }
    }

    if (!_.isNil(props.enteralFormula)) {
        let src = props.enteralFormula;
        let _enteralFormula = {};

        if (!_.isNil(src.id)) {
            _enteralFormula.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _enteralFormula.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.baseFormulaType)) {
            _enteralFormula.baseFormulaType = src.baseFormulaType;
        }

        if (!_.isNil(src.baseFormulaProductName)) {
            _enteralFormula.baseFormulaProductName = src.baseFormulaProductName;
        }

        if (!_.isNil(src.additiveType)) {
            _enteralFormula.additiveType = src.additiveType;
        }

        if (!_.isNil(src.additiveProductName)) {
            _enteralFormula.additiveProductName = src.additiveProductName;
        }

        if (!_.isNil(src.caloricDensity)) {
            _enteralFormula.caloricDensity = src.caloricDensity;
        }

        if (!_.isNil(src.routeofAdministration)) {
            _enteralFormula.routeofAdministration = src.routeofAdministration;
        }

        if (!_.isNil(src.administration)) {
            _enteralFormula.administration = src.administration;
        }

        if (!_.isNil(src.maxVolumeToDeliver)) {
            _enteralFormula.maxVolumeToDeliver = src.maxVolumeToDeliver;
        }

        if (!_.isNil(src.administrationInstruction)) {
            _enteralFormula.administrationInstruction = src.administrationInstruction;
        }

        resource.enteralFormula = _enteralFormula;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/NutritionOrder"]
    };

    return resource;
}
