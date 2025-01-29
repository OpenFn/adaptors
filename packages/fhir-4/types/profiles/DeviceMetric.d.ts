import * as dt from "../datatypes.js";
export declare type DeviceMetric_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    type?: any;
    unit?: any;
    source?: any;
    parent?: any;
    operationalStatus?: any;
    color?: any;
    category?: any;
    measurementPeriod?: any;
    calibration?: any;
};
export default function (props: Partial<DeviceMetric_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
