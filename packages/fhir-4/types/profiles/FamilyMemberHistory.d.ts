import * as dt from "../datatypes.js";
export declare type FamilyMemberHistory_Props = {
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
    status?: any;
    dataAbsentReason?: any;
    patient?: any;
    date?: any;
    name?: any;
    relationship?: any;
    sex?: any;
    born?: any;
    age?: any;
    estimatedAge?: any;
    deceased?: any;
    reasonCode?: any;
    reasonReference?: any;
    note?: any;
    condition?: any;
};
export default function (props: Partial<FamilyMemberHistory_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
