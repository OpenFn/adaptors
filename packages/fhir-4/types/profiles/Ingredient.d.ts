import * as dt from "../datatypes.js";
export declare type Ingredient_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    status?: any;
    for?: any;
    role?: any;
    function?: any;
    allergenicIndicator?: any;
    manufacturer?: any;
    substance?: any;
};
export default function (props: Partial<Ingredient_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
