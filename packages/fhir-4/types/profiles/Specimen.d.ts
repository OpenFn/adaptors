import * as dt from "../datatypes.js";
export declare type Specimen_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    accessionIdentifier?: dt.Identifier;
    status?: any;
    type?: any;
    subject?: any;
    receivedTime?: any;
    parent?: any;
    request?: any;
    collection?: any;
    processing?: any;
    container?: any;
    condition?: any;
    note?: any;
};
export default function (props: Partial<Specimen_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
