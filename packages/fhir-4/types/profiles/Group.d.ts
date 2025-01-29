import * as dt from "../datatypes.js";
export declare type Group_Props = {
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
    actual?: any;
    code?: any;
    name?: any;
    quantity?: any;
    managingEntity?: any;
    characteristic?: any;
    member?: any;
};
export default function (props: Partial<Group_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
