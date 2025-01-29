import * as dt from "../datatypes.js";
export declare type MeasureReport_Props = {
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
    measure?: any;
    subject?: any;
    date?: any;
    reporter?: any;
    period?: any;
    improvementNotation?: any;
    group?: any;
    evaluatedResource?: any;
};
export default function (props: Partial<MeasureReport_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
