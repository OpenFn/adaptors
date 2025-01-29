import * as dt from "../datatypes.js";
export declare type CoverageEligibilityRequest_Props = {
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
    priority?: any;
    purpose?: any;
    patient?: any;
    serviced?: any;
    created?: any;
    enterer?: any;
    provider?: any;
    insurer?: any;
    facility?: any;
    supportingInfo?: any;
    insurance?: any;
    item?: any;
};
export default function (props: Partial<CoverageEligibilityRequest_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
