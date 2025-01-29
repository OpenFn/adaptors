import * as dt from "../datatypes.js";
export declare type MedicationAdministration_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    instantiates?: any;
    partOf?: any;
    status?: any;
    statusReason?: any;
    category?: any;
    medication?: any;
    subject?: any;
    context?: any;
    supportingInformation?: any;
    effective?: any;
    performer?: any;
    reasonCode?: any;
    reasonReference?: any;
    request?: any;
    device?: any;
    note?: any;
    dosage?: any;
    eventHistory?: any;
};
export default function (props: Partial<MedicationAdministration_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
