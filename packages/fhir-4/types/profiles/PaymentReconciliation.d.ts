import * as dt from "../datatypes.js";
export declare type PaymentReconciliation_Props = {
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
    period?: any;
    created?: any;
    paymentIssuer?: any;
    request?: any;
    requestor?: any;
    outcome?: any;
    disposition?: any;
    paymentDate?: any;
    paymentAmount?: any;
    paymentIdentifier?: dt.Identifier;
    detail?: any;
    formCode?: any;
    processNote?: any;
};
export default function (props: Partial<PaymentReconciliation_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
