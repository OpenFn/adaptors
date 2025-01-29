import * as dt from "../datatypes.js";
export declare type SupplyDelivery_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    basedOn?: any;
    partOf?: any;
    status?: any;
    patient?: any;
    type?: any;
    suppliedItem?: any;
    occurrence?: any;
    supplier?: any;
    destination?: any;
    receiver?: any;
};
export default function (props: Partial<SupplyDelivery_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
