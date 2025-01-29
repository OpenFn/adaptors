import * as dt from "../datatypes.js";
export declare type Observation_Props = {
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
    category?: any;
    code?: any;
    subject?: any;
    focus?: any;
    encounter?: any;
    effective?: any;
    issued?: any;
    performer?: any;
    value?: any;
    dataAbsentReason?: any;
    interpretation?: any;
    note?: any;
    bodySite?: any;
    method?: any;
    specimen?: any;
    device?: any;
    referenceRange?: any;
    hasMember?: any;
    derivedFrom?: any;
    component?: any;
};
export default function (props: Partial<Observation_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
