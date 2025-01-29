import * as dt from "../datatypes.js";
export declare type RelatedPerson_Props = {
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
    patient?: any;
    relationship?: any;
    name?: any;
    telecom?: any;
    gender?: any;
    birthDate?: any;
    address?: any;
    photo?: any;
    period?: any;
    communication?: any;
};
export default function (props: Partial<RelatedPerson_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
