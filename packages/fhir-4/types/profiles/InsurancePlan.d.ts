import * as dt from "../datatypes.js";
export declare type InsurancePlan_Props = {
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
    name?: any;
    alias?: any;
    period?: any;
    ownedBy?: any;
    administeredBy?: any;
    coverageArea?: any;
    contact?: any;
    endpoint?: any;
    network?: any;
    coverage?: any;
    plan?: any;
};
export default function (props: Partial<InsurancePlan_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
