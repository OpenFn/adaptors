import * as dt from "../datatypes.js";
export declare type Invoice_Props = {
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
    cancelledReason?: any;
    type?: any;
    subject?: any;
    recipient?: any;
    date?: any;
    participant?: any;
    issuer?: any;
    account?: any;
    lineItem?: any;
    totalPriceComponent?: any;
    totalNet?: any;
    totalGross?: any;
    paymentTerms?: any;
    note?: any;
};
export default function (props: Partial<Invoice_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
