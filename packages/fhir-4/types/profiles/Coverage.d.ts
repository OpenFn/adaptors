import * as dt from "../datatypes.js";
export declare type Coverage_Props = {
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
    policyHolder?: any;
    subscriber?: any;
    subscriberId?: any;
    beneficiary?: any;
    dependent?: any;
    relationship?: any;
    period?: any;
    payor?: any;
    class?: any;
    order?: any;
    network?: any;
    costToBeneficiary?: any;
    subrogation?: any;
    contract?: any;
};
export default function (props: Partial<Coverage_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
