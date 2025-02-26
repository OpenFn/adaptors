
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type MedicationKnowledge_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    code?: string[] | FHIR.CodeableConcept;
    status?: string;
    manufacturer?: string | FHIR.Reference;
    doseForm?: string[] | FHIR.CodeableConcept;
    amount?: FHIR.Quantity;
    synonym?: string[];
    relatedMedicationKnowledge?: FHIR.BackboneElement[];
    associatedMedication?: MaybeArray<string | FHIR.Reference>;
    productType?: MaybeArray<string[] | FHIR.CodeableConcept>;
    monograph?: FHIR.BackboneElement[];
    ingredient?: FHIR.BackboneElement[];
    preparationInstruction?: FHIR.markdown;
    intendedRoute?: MaybeArray<string[] | FHIR.CodeableConcept>;
    cost?: FHIR.BackboneElement[];
    monitoringProgram?: FHIR.BackboneElement[];
    administrationGuidelines?: FHIR.BackboneElement[];
    medicineClassification?: FHIR.BackboneElement[];
    packaging?: FHIR.BackboneElement;
    drugCharacteristic?: FHIR.BackboneElement[];
    contraindication?: MaybeArray<string | FHIR.Reference>;
    regulatory?: FHIR.BackboneElement[];
    kinetics?: FHIR.BackboneElement[];
    [key: string]: any;
};

export default function(props: Partial<MedicationKnowledge_Props>) {
    const resource = {
        resourceType: "MedicationKnowledge",
        ...props
    };

    if (!_.isNil(props.manufacturer)) {
        resource.manufacturer = dt.reference(props.manufacturer);
    }

    if (!_.isNil(props.relatedMedicationKnowledge)) {
        let src = props.relatedMedicationKnowledge;
        if (!Array.isArray(src)) { src = [src]; }
        resource.relatedMedicationKnowledge = [];

        for (let item of src) {
            let _relatedMedicationKnowledge = {
                ...item
            };

            resource.relatedMedicationKnowledge.push(_relatedMedicationKnowledge);
        }
    }

    if (!_.isNil(props.associatedMedication)) {
        if (!Array.isArray(props.associatedMedication)) { props.associatedMedication = [props.associatedMedication]; }
        resource.associatedMedication = dt.reference(props.associatedMedication);
    }

    if (!_.isNil(props.monograph)) {
        let src = props.monograph;
        if (!Array.isArray(src)) { src = [src]; }
        resource.monograph = [];

        for (let item of src) {
            let _monograph = {
                ...item
            };

            resource.monograph.push(_monograph);
        }
    }

    if (!_.isNil(props.ingredient)) {
        let src = props.ingredient;
        if (!Array.isArray(src)) { src = [src]; }
        resource.ingredient = [];

        for (let item of src) {
            let _ingredient = {
                ...item
            };

            resource.ingredient.push(_ingredient);
        }
    }

    if (!_.isNil(props.cost)) {
        let src = props.cost;
        if (!Array.isArray(src)) { src = [src]; }
        resource.cost = [];

        for (let item of src) {
            let _cost = {
                ...item
            };

            resource.cost.push(_cost);
        }
    }

    if (!_.isNil(props.monitoringProgram)) {
        let src = props.monitoringProgram;
        if (!Array.isArray(src)) { src = [src]; }
        resource.monitoringProgram = [];

        for (let item of src) {
            let _monitoringProgram = {
                ...item
            };

            resource.monitoringProgram.push(_monitoringProgram);
        }
    }

    if (!_.isNil(props.administrationGuidelines)) {
        let src = props.administrationGuidelines;
        if (!Array.isArray(src)) { src = [src]; }
        resource.administrationGuidelines = [];

        for (let item of src) {
            let _administrationGuidelines = {
                ...item
            };

            resource.administrationGuidelines.push(_administrationGuidelines);
        }
    }

    if (!_.isNil(props.medicineClassification)) {
        let src = props.medicineClassification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.medicineClassification = [];

        for (let item of src) {
            let _medicineClassification = {
                ...item
            };

            resource.medicineClassification.push(_medicineClassification);
        }
    }

    if (!_.isNil(props.packaging)) {
        let src = props.packaging;

        let _packaging = {
            ...item
        };

        resource.packaging = _packaging;
    }

    if (!_.isNil(props.drugCharacteristic)) {
        let src = props.drugCharacteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.drugCharacteristic = [];

        for (let item of src) {
            let _drugCharacteristic = {
                ...item
            };

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
            let _regulatory = {
                ...item
            };

            resource.regulatory.push(_regulatory);
        }
    }

    if (!_.isNil(props.kinetics)) {
        let src = props.kinetics;
        if (!Array.isArray(src)) { src = [src]; }
        resource.kinetics = [];

        for (let item of src) {
            let _kinetics = {
                ...item
            };

            resource.kinetics.push(_kinetics);
        }
    }

    return resource;
}
