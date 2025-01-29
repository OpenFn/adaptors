import * as dt from "../datatypes.js";
export declare type NutritionOrder_Props = {
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
export default function (props: Partial<NutritionOrder_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
