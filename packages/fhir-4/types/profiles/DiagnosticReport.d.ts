import * as dt from "../datatypes.js";
export declare type DiagnosticReport_Props = {
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
    status?: any;
    category?: any;
    code?: any;
    subject?: any;
    encounter?: any;
    effective?: any;
    issued?: any;
    performer?: any;
    resultsInterpreter?: any;
    specimen?: any;
    result?: any;
    imagingStudy?: any;
    media?: any;
    conclusion?: any;
    conclusionCode?: any;
    presentedForm?: any;
};
export default function (props: Partial<DiagnosticReport_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
