import * as dt from "../datatypes.js";
export declare type DetectedIssue_Props = {
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
    code?: any;
    severity?: any;
    patient?: any;
    identified?: any;
    author?: any;
    implicated?: any;
    evidence?: any;
    detail?: any;
    reference?: any;
    mitigation?: any;
};
export default function (props: Partial<DetectedIssue_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
