
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type NutritionProduct_Props = {
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    code?: string[] | FHIR.CodeableConcept;
    contained?: any[];
    extension?: FHIR.Extension[];
    id?: string;
    implicitRules?: string;
    ingredient?: FHIR.BackboneElement[];
    instance?: FHIR.BackboneElement;
    knownAllergen?: FHIR.CodeableReference[];
    language?: string;
    manufacturer?: MaybeArray<string | FHIR.Reference>;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    nutrient?: FHIR.BackboneElement[];
    productCharacteristic?: FHIR.BackboneElement[];
    status?: string;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<NutritionProduct_Props>) {
    const resource = {
        resourceType: "NutritionProduct",
        ...props
    };

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

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
