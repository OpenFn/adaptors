import * as dt from "../datatypes.js";
export declare type Organization_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    active?: any;
    type?: any;
    name?: any;
    alias?: any;
    telecom?: any;
    address?: any;
    partOf?: any;
    contact?: any;
    endpoint?: any;
};
export default function (props: Partial<Organization_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
