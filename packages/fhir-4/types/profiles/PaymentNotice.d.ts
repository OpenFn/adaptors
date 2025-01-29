import * as dt from "../datatypes.js";
export declare type PaymentNotice_Props = {
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
    request?: any;
    response?: any;
    created?: any;
    provider?: any;
    payment?: any;
    paymentDate?: any;
    payee?: any;
    recipient?: any;
    amount?: any;
    paymentStatus?: any;
};
export default function (props: Partial<PaymentNotice_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
