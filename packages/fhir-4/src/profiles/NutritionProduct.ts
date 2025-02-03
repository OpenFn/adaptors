
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type NutritionProduct_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    status?: string;
    category?: CodeableConcept;
    code?: CodeableConcept;
    manufacturer?: Reference;
    nutrient?: BackboneElement;
    ingredient?: BackboneElement;
    knownAllergen?: CodeableReference;
    productCharacteristic?: BackboneElement;
    instance?: BackboneElement;
    note?: Annotation;
};

export default function(props: Partial<NutritionProduct_Props>) {
    const resource = {
        resourceType: "NutritionProduct",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>NutritionProduct</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/NutritionProduct"]
    };

    return resource;
}
