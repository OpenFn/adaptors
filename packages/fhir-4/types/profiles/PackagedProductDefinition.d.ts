import * as dt from "../datatypes.js";
export declare type PackagedProductDefinition_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    name?: any;
    type?: any;
    packageFor?: any;
    status?: any;
    statusDate?: any;
    containedItemQuantity?: any;
    description?: any;
    legalStatusOfSupply?: any;
    marketingStatus?: any;
    characteristic?: any;
    copackagedIndicator?: any;
    manufacturer?: any;
    package?: any;
};
export default function (props: Partial<PackagedProductDefinition_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
