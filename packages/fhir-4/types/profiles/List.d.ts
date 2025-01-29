import * as dt from "../datatypes.js";
export declare type List_Props = {
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
    mode?: any;
    title?: any;
    code?: any;
    subject?: any;
    encounter?: any;
    date?: any;
    source?: any;
    orderedBy?: any;
    note?: any;
    entry?: any;
    emptyReason?: any;
};
export default function (props: Partial<List_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
