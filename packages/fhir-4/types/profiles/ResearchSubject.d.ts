import * as dt from "../datatypes.js";
export declare type ResearchSubject_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    status?: any;
    period?: any;
    study?: any;
    individual?: any;
    assignedArm?: any;
    actualArm?: any;
    consent?: any;
};
export default function (props: Partial<ResearchSubject_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
