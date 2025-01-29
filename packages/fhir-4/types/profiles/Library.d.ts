import * as dt from "../datatypes.js";
export declare type Library_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    url?: any;
    identifier?: dt.Identifier;
    version?: any;
    name?: any;
    title?: any;
    subtitle?: any;
    status?: any;
    experimental?: any;
    type?: any;
    subject?: any;
    date?: any;
    publisher?: any;
    contact?: any;
    description?: any;
    useContext?: any;
    jurisdiction?: any;
    purpose?: any;
    usage?: any;
    copyright?: any;
    approvalDate?: any;
    lastReviewDate?: any;
    effectivePeriod?: any;
    topic?: any;
    author?: any;
    editor?: any;
    reviewer?: any;
    endorser?: any;
    relatedArtifact?: any;
    parameter?: any;
    dataRequirement?: any;
    content?: any;
};
export default function (props: Partial<Library_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
