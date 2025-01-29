import * as dt from "../datatypes.js";
export declare type CareTeam_Props = {
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
    category?: any;
    name?: any;
    subject?: any;
    encounter?: any;
    period?: any;
    participant?: any;
    reasonCode?: any;
    reasonReference?: any;
    managingOrganization?: any;
    telecom?: any;
    note?: any;
};
export default function (props: Partial<CareTeam_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
