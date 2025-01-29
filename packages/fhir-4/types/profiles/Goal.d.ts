import * as dt from "../datatypes.js";
export declare type Goal_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    lifecycleStatus?: any;
    achievementStatus?: any;
    category?: any;
    priority?: any;
    description?: any;
    subject?: any;
    start?: any;
    target?: any;
    statusDate?: any;
    statusReason?: any;
    expressedBy?: any;
    addresses?: any;
    note?: any;
    outcomeCode?: any;
    outcomeReference?: any;
};
export default function (props: Partial<Goal_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
