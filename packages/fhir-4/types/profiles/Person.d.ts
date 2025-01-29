import * as dt from "../datatypes.js";
export declare type Person_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    name?: any;
    telecom?: any;
    gender?: any;
    birthDate?: any;
    address?: any;
    photo?: any;
    managingOrganization?: any;
    active?: any;
    link?: any;
};
export default function (props: Partial<Person_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
