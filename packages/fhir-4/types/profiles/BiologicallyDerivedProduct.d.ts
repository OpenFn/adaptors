import * as dt from "../datatypes.js";
export declare type BiologicallyDerivedProduct_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    productCategory?: any;
    productCode?: any;
    status?: any;
    request?: any;
    quantity?: any;
    parent?: any;
    collection?: any;
    processing?: any;
    manipulation?: any;
    storage?: any;
};
export default function (props: Partial<BiologicallyDerivedProduct_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
