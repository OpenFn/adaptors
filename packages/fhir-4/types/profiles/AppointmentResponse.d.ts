import * as dt from "../datatypes.js";
export declare type AppointmentResponse_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    appointment?: any;
    start?: any;
    end?: any;
    participantType?: any;
    actor?: any;
    participantStatus?: any;
    comment?: any;
};
export default function (props: Partial<AppointmentResponse_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
