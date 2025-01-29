import * as dt from "../datatypes.js";
export declare type EnrollmentResponse_Props = {
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
    outcome?: any;
    disposition?: any;
    created?: any;
    organization?: any;
    requestProvider?: any;
};
export default function (props: Partial<EnrollmentResponse_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
