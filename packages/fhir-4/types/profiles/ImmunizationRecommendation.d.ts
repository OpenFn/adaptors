import * as dt from "../datatypes.js";
export declare type ImmunizationRecommendation_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    patient?: any;
    date?: any;
    authority?: any;
    recommendation?: any;
};
export default function (props: Partial<ImmunizationRecommendation_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
