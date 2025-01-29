import * as dt from "../datatypes.js";
export declare type GuidanceResponse_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    requestIdentifier?: dt.Identifier;
    identifier?: dt.Identifier;
    module?: any;
    status?: any;
    subject?: any;
    encounter?: any;
    occurrenceDateTime?: any;
    performer?: any;
    reasonCode?: any;
    reasonReference?: any;
    note?: any;
    evaluationMessage?: any;
    outputParameters?: any;
    result?: any;
    dataRequirement?: any;
};
export default function (props: Partial<GuidanceResponse_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
