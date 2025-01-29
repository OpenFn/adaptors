import * as dt from "../datatypes.js";
export declare type Substance_Props = {
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
    description?: any;
    instance?: any;
    ingredient?: any;
};
export default function (props: Partial<Substance_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
