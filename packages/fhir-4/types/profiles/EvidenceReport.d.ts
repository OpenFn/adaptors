import * as dt from "../datatypes.js";
export declare type EvidenceReport_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    url?: any;
    status?: any;
    useContext?: any;
    identifier?: dt.Identifier;
    relatedIdentifier?: dt.Identifier;
    citeAs?: any;
    type?: any;
    note?: any;
    relatedArtifact?: any;
    subject?: any;
    publisher?: any;
    contact?: any;
    author?: any;
    editor?: any;
    reviewer?: any;
    endorser?: any;
    relatesTo?: any;
    section?: any;
};
export default function (props: Partial<EvidenceReport_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
