import * as dt from "../datatypes.js";
export declare type SupplyRequest_Props = {
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
    category?: any;
    priority?: any;
    item?: any;
    quantity?: any;
    parameter?: any;
    occurrence?: any;
    authoredOn?: any;
    requester?: any;
    supplier?: any;
    reasonCode?: any;
    reasonReference?: any;
    deliverFrom?: any;
    deliverTo?: any;
};
export default function (props: Partial<SupplyRequest_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
