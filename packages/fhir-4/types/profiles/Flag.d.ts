import * as dt from "../datatypes.js";
export declare type Flag_Props = {
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
    category?: any;
    code?: any;
    subject?: any;
    period?: any;
    encounter?: any;
    author?: any;
};
export default function (props: Partial<Flag_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
