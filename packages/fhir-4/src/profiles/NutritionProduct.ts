
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type NutritionProduct_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    status?: string;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    code?: string[] | FHIR.CodeableConcept;
    manufacturer?: MaybeArray<string | FHIR.Reference>;
    nutrient?: FHIR.BackboneElement[];
    ingredient?: FHIR.BackboneElement[];
    knownAllergen?: FHIR.CodeableReference[];
    productCharacteristic?: FHIR.BackboneElement[];
    instance?: FHIR.BackboneElement;
    note?: FHIR.Annotation[];
    [key: string]: any;
};

export default function(props: Partial<NutritionProduct_Props>) {
    const resource = {
        resourceType: "NutritionProduct",
        ...props
    };

    if (!_.isNil(props.manufacturer)) {
        if (!Array.isArray(props.manufacturer)) { props.manufacturer = [props.manufacturer]; }
        resource.manufacturer = dt.reference(props.manufacturer);
    }

    if (!_.isNil(props.nutrient)) {
        let src = props.nutrient;
        if (!Array.isArray(src)) { src = [src]; }
        resource.nutrient = [];

        for (let item of src) {
            let _nutrient = {
                ...item
            };

            resource.nutrient.push(_nutrient);
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

    if (!_.isNil(props.productCharacteristic)) {
        let src = props.productCharacteristic;
        if (!Array.isArray(src)) { src = [src]; }
        resource.productCharacteristic = [];

        for (let item of src) {
            let _productCharacteristic = {
                ...item
            };

            resource.productCharacteristic.push(_productCharacteristic);
        }
    }

    if (!_.isNil(props.instance)) {
        let src = props.instance;

        let _instance = {
            ...item
        };

        resource.instance = _instance;
    }

    return resource;
}
