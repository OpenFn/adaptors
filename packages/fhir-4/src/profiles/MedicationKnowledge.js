
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "MedicationKnowledge",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicationKnowledge</b></p></div>"
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

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.manufacturer)) {
        resource.manufacturer = dt.reference(props.manufacturer);
    }

    if (!_.isNil(props.doseForm)) {
        resource.doseForm = props.doseForm;
    }

    if (!_.isNil(props.amount)) {
        resource.amount = props.amount;
    }

    if (!_.isNil(props.synonym)) {
        resource.synonym = props.synonym;
    }

    if (!_.isNil(props.relatedMedicationKnowledge)) {
        let src = props.relatedMedicationKnowledge;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relatedMedicationKnowledge = [];

        for (let item of src) {
            let _relatedMedicationKnowledge = {};

            if (!_.isNil(item.id)) {
                _relatedMedicationKnowledge.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _relatedMedicationKnowledge.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _relatedMedicationKnowledge.type = item.type;
            }

            if (!_.isNil(item.reference)) {
                _relatedMedicationKnowledge.reference = item.reference;
            }

            resource.relatedMedicationKnowledge.push(_relatedMedicationKnowledge);
        }
    }

    if (!_.isNil(props.associatedMedication)) {
        if (!Array.isArray(props.associatedMedication)) { props.associatedMedication = [props.associatedMedication]; }
        resource.associatedMedication = dt.reference(props.associatedMedication);
    }

    if (!_.isNil(props.productType)) {
        resource.productType = props.productType;
    }

    if (!_.isNil(props.monograph)) {
        let src = props.monograph;
        if (!Array.isArray(src)) { src = [src]; }
        resource.monograph = [];

        for (let item of src) {
            let _monograph = {};

            if (!_.isNil(item.id)) {
                _monograph.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _monograph.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _monograph.type = item.type;
            }

            if (!_.isNil(item.source)) {
                _monograph.source = item.source;
            }

            resource.monograph.push(_monograph);
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

            if (!_.isNil(item.isActive)) {
                _ingredient.isActive = item.isActive;
            }

            if (!_.isNil(item.strength)) {
                _ingredient.strength = item.strength;
            }

            resource.ingredient.push(_ingredient);
        }
    }

    if (!_.isNil(props.preparationInstruction)) {
        resource.preparationInstruction = props.preparationInstruction;
    }

    if (!_.isNil(props.intendedRoute)) {
        resource.intendedRoute = props.intendedRoute;
    }

    if (!_.isNil(props.cost)) {
        let src = props.cost;
        if (!Array.isArray(src)) { src = [src]; }
        resource.cost = [];

        for (let item of src) {
            let _cost = {};

            if (!_.isNil(item.id)) {
                _cost.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _cost.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _cost.type = item.type;
            }

            if (!_.isNil(item.source)) {
                _cost.source = item.source;
            }

            if (!_.isNil(item.cost)) {
                _cost.cost = item.cost;
            }

            resource.cost.push(_cost);
        }
    }

    if (!_.isNil(props.monitoringProgram)) {
        let src = props.monitoringProgram;
        if (!Array.isArray(src)) { src = [src]; }
        resource.monitoringProgram = [];

        for (let item of src) {
            let _monitoringProgram = {};

            if (!_.isNil(item.id)) {
                _monitoringProgram.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _monitoringProgram.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _monitoringProgram.type = item.type;
            }

            if (!_.isNil(item.name)) {
                _monitoringProgram.name = item.name;
            }

            resource.monitoringProgram.push(_monitoringProgram);
        }
    }

    if (!_.isNil(props.administrationGuidelines)) {
        let src = props.administrationGuidelines;
        if (!Array.isArray(src)) { src = [src]; }
        resource.administrationGuidelines = [];

        for (let item of src) {
            let _administrationGuidelines = {};

            if (!_.isNil(item.id)) {
                _administrationGuidelines.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _administrationGuidelines.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.dosage)) {
                _administrationGuidelines.dosage = item.dosage;
            }

            if (!_.isNil(item.indication)) {
                _administrationGuidelines.indication = item.indication;
            }

            if (!_.isNil(item.patientCharacteristics)) {
                _administrationGuidelines.patientCharacteristics = item.patientCharacteristics;
            }

            resource.administrationGuidelines.push(_administrationGuidelines);
        }
    }

    if (!_.isNil(props.medicineClassification)) {
        let src = props.medicineClassification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.medicineClassification = [];

        for (let item of src) {
            let _medicineClassification = {};

            if (!_.isNil(item.id)) {
                _medicineClassification.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _medicineClassification.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _medicineClassification.type = item.type;
            }

            if (!_.isNil(item.classification)) {
                _medicineClassification.classification = item.classification;
            }

            resource.medicineClassification.push(_medicineClassification);
        }
    }

    if (!_.isNil(props.packaging)) {
        let src = props.packaging;
        let _packaging = {};

        if (!_.isNil(src.id)) {
            _packaging.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _packaging.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _packaging.type = src.type;
        }

        if (!_.isNil(src.quantity)) {
            _packaging.quantity = src.quantity;
        }

        resource.packaging = _packaging;
    }

    if (!_.isNil(props.drugCharacteristic)) {
        let src = props.drugCharacteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.drugCharacteristic = [];

        for (let item of src) {
            let _drugCharacteristic = {};

            if (!_.isNil(item.id)) {
                _drugCharacteristic.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _drugCharacteristic.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _drugCharacteristic.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _drugCharacteristic.value = item.value;
            }

            resource.drugCharacteristic.push(_drugCharacteristic);
        }
    }

    if (!_.isNil(props.contraindication)) {
        if (!Array.isArray(props.contraindication)) { props.contraindication = [props.contraindication]; }
        resource.contraindication = dt.reference(props.contraindication);
    }

    if (!_.isNil(props.regulatory)) {
        let src = props.regulatory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.regulatory = [];

        for (let item of src) {
            let _regulatory = {};

            if (!_.isNil(item.id)) {
                _regulatory.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _regulatory.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.regulatoryAuthority)) {
                _regulatory.regulatoryAuthority = item.regulatoryAuthority;
            }

            if (!_.isNil(item.substitution)) {
                _regulatory.substitution = item.substitution;
            }

            if (!_.isNil(item.schedule)) {
                _regulatory.schedule = item.schedule;
            }

            if (!_.isNil(item.maxDispense)) {
                _regulatory.maxDispense = item.maxDispense;
            }

            resource.regulatory.push(_regulatory);
        }
    }

    if (!_.isNil(props.kinetics)) {
        let src = props.kinetics;
        if (!Array.isArray(src)) { src = [src]; }
        resource.kinetics = [];

        for (let item of src) {
            let _kinetics = {};

            if (!_.isNil(item.id)) {
                _kinetics.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _kinetics.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.areaUnderCurve)) {
                _kinetics.areaUnderCurve = item.areaUnderCurve;
            }

            if (!_.isNil(item.lethalDose50)) {
                _kinetics.lethalDose50 = item.lethalDose50;
            }

            if (!_.isNil(item.halfLifePeriod)) {
                _kinetics.halfLifePeriod = item.halfLifePeriod;
            }

            resource.kinetics.push(_kinetics);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MedicationKnowledge"]
    };

    return resource;
}
