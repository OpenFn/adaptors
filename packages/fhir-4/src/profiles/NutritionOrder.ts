
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type NutritionOrder_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    instantiatesCanonical?: any;
    instantiatesUri?: string;
    instantiates?: string;
    status?: string;
    intent?: string;
    patient?: Reference;
    encounter?: Reference;
    dateTime?: string;
    orderer?: Reference;
    allergyIntolerance?: Reference;
    foodPreferenceModifier?: CodeableConcept;
    excludeFoodModifier?: CodeableConcept;
    oralDiet?: BackboneElement;
    supplement?: BackboneElement;
    enteralFormula?: BackboneElement;
    note?: Annotation;
};

export default function(props: Partial<NutritionOrder_Props>) {
    const resource = {
        resourceType: "NutritionOrder",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>NutritionOrder</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/NutritionOrder"]
    };

    return resource;
}
