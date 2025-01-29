import * as dt from "../datatypes.js";
export declare type Condition_Props = {
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
    category?: any;
    severity?: any;
    code?: any;
    bodySite?: any;
    subject?: any;
    encounter?: any;
    onset?: any;
    abatement?: any;
    recordedDate?: any;
    recorder?: any;
    asserter?: any;
    stage?: any;
    evidence?: any;
    note?: any;
};
export default function (props: Partial<Condition_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
