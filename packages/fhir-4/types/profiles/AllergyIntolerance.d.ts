import * as dt from "../datatypes.js";
export declare type AllergyIntolerance_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    clinicalStatus?: any;
    verificationStatus?: any;
    type?: any;
    category?: any;
    criticality?: any;
    code?: any;
    patient?: any;
    encounter?: any;
    onset?: any;
    recordedDate?: any;
    recorder?: any;
    asserter?: any;
    lastOccurrence?: any;
    note?: any;
    reaction?: any;
};
export default function (props: Partial<AllergyIntolerance_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
