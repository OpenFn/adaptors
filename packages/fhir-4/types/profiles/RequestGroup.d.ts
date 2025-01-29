import * as dt from "../datatypes.js";
export declare type RequestGroup_Props = {
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
    basedOn?: any;
    replaces?: any;
    groupIdentifier?: dt.Identifier;
    status?: any;
    intent?: any;
    priority?: any;
    code?: any;
    subject?: any;
    encounter?: any;
    authoredOn?: any;
    author?: any;
    reasonCode?: any;
    reasonReference?: any;
    note?: any;
    action?: any;
};
export default function (props: Partial<RequestGroup_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
