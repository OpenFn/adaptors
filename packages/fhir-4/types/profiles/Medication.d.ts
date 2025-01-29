import * as dt from "../datatypes.js";
export declare type Medication_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    code?: any;
    status?: any;
    manufacturer?: any;
    form?: any;
    amount?: any;
    ingredient?: any;
    batch?: any;
};
export default function (props: Partial<Medication_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
