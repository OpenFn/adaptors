import * as dt from "../datatypes.js";
export declare type Schedule_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    active?: any;
    serviceCategory?: any;
    serviceType?: any;
    specialty?: any;
    actor?: any;
    planningHorizon?: any;
    comment?: any;
};
export default function (props: Partial<Schedule_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
