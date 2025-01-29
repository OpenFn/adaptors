import * as dt from "../datatypes.js";
export declare type EnrollmentRequest_Props = {
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
    created?: any;
    insurer?: any;
    provider?: any;
    candidate?: any;
    coverage?: any;
};
export default function (props: Partial<EnrollmentRequest_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
