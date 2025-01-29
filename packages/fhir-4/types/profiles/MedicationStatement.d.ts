import * as dt from "../datatypes.js";
export declare type MedicationStatement_Props = {
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
    status?: any;
    statusReason?: any;
    category?: any;
    medication?: any;
    subject?: any;
    context?: any;
    effective?: any;
    dateAsserted?: any;
    informationSource?: any;
    derivedFrom?: any;
    reasonCode?: any;
    reasonReference?: any;
    note?: any;
    dosage?: any;
};
export default function (props: Partial<MedicationStatement_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
