import * as dt from "../datatypes.js";
export declare type Practitioner_Props = {
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
    name?: any;
    telecom?: any;
    address?: any;
    gender?: any;
    birthDate?: any;
    photo?: any;
    qualification?: any;
    communication?: any;
};
export default function (props: Partial<Practitioner_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
