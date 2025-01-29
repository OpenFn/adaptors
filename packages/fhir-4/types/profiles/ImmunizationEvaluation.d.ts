import * as dt from "../datatypes.js";
export declare type ImmunizationEvaluation_Props = {
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
    patient?: any;
    date?: any;
    authority?: any;
    targetDisease?: any;
    immunizationEvent?: any;
    doseStatus?: any;
    doseStatusReason?: any;
    description?: any;
    series?: any;
    doseNumber?: any;
    seriesDoses?: any;
};
export default function (props: Partial<ImmunizationEvaluation_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
