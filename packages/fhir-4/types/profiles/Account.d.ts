import * as dt from "../datatypes.js";
export declare type Account_Props = {
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
    type?: any;
    name?: any;
    subject?: any;
    servicePeriod?: any;
    coverage?: any;
    owner?: any;
    description?: any;
    guarantor?: any;
    partOf?: any;
};
export default function (props: Partial<Account_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
