import * as dt from "../datatypes.js";
export declare type QuestionnaireResponse_Props = {
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
    partOf?: any;
    questionnaire?: any;
    status?: any;
    subject?: any;
    encounter?: any;
    authored?: any;
    author?: any;
    source?: any;
    item?: any;
};
export default function (props: Partial<QuestionnaireResponse_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
