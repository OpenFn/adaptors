import * as dt from "../datatypes.js";
export declare type CoverageEligibilityResponse_Props = {
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
    purpose?: any;
    patient?: any;
    serviced?: any;
    created?: any;
    requestor?: any;
    request?: any;
    outcome?: any;
    disposition?: any;
    insurer?: any;
    insurance?: any;
    preAuthRef?: any;
    form?: any;
    error?: any;
};
export default function (props: Partial<CoverageEligibilityResponse_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
