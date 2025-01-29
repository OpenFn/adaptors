import * as dt from "../datatypes.js";
export declare type Slot_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    serviceCategory?: any;
    serviceType?: any;
    specialty?: any;
    appointmentType?: any;
    schedule?: any;
    status?: any;
    start?: any;
    end?: any;
    overbooked?: any;
    comment?: any;
};
export default function (props: Partial<Slot_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
