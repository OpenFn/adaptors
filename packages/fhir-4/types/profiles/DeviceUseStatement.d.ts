import * as dt from "../datatypes.js";
export declare type DeviceUseStatement_Props = {
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
    status?: any;
    subject?: any;
    derivedFrom?: any;
    timing?: any;
    recordedOn?: any;
    source?: any;
    device?: any;
    reasonCode?: any;
    reasonReference?: any;
    bodySite?: any;
    note?: any;
};
export default function (props: Partial<DeviceUseStatement_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
