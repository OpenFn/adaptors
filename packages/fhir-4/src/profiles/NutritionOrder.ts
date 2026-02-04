
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type NutritionOrder_Props = {
    allergyIntolerance?: MaybeArray<string | FHIR.Reference>;
    contained?: any[];
    dateTime?: string;
    encounter?: string | FHIR.Reference;
    enteralFormula?: FHIR.BackboneElement;
    excludeFoodModifier?: MaybeArray<string[] | FHIR.CodeableConcept>;
    extension?: FHIR.Extension[];
    foodPreferenceModifier?: MaybeArray<string[] | FHIR.CodeableConcept>;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    instantiates?: string[];
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    intent?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    oralDiet?: FHIR.BackboneElement;
    orderer?: string | FHIR.Reference;
    patient?: string | FHIR.Reference;
    status?: string;
    supplement?: FHIR.BackboneElement[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<NutritionOrder_Props>) {
    const resource = {
        resourceType: "NutritionOrder",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.orderer)) {
        resource.orderer = dt.reference(props.orderer);
    }

    if (!_.isNil(props.allergyIntolerance)) {
        if (!Array.isArray(props.allergyIntolerance)) { props.allergyIntolerance = [props.allergyIntolerance]; }
        resource.allergyIntolerance = dt.reference(props.allergyIntolerance);
    }

    if (!_.isNil(props.foodPreferenceModifier)) {
        if (!Array.isArray(props.foodPreferenceModifier)) { props.foodPreferenceModifier = [props.foodPreferenceModifier]; }
        resource.foodPreferenceModifier = dt.concept(props.foodPreferenceModifier);
    }

    if (!_.isNil(props.excludeFoodModifier)) {
        if (!Array.isArray(props.excludeFoodModifier)) { props.excludeFoodModifier = [props.excludeFoodModifier]; }
        resource.excludeFoodModifier = dt.concept(props.excludeFoodModifier);
    }

    if (!_.isNil(props.oralDiet)) {
        let src = props.oralDiet;

        let _oralDiet = {
            ...item
        };

        resource.oralDiet = _oralDiet;
    }

    if (!_.isNil(props.supplement)) {
        let src = props.supplement;
        if (!Array.isArray(src)) { src = [src]; }
        resource.supplement = [];

        for (let item of src) {
            let _supplement = {
                ...item
            };

            resource.supplement.push(_supplement);
        }
    }

    if (!_.isNil(props.enteralFormula)) {
        let src = props.enteralFormula;

        let _enteralFormula = {
            ...item
        };

        resource.enteralFormula = _enteralFormula;
    }

    return resource;
}
