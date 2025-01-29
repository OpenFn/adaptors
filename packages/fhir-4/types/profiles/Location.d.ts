import * as dt from "../datatypes.js";
export declare type Location_Props = {
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
    operationalStatus?: any;
    name?: any;
    alias?: any;
    description?: any;
    mode?: any;
    type?: any;
    telecom?: any;
    address?: any;
    physicalType?: any;
    position?: any;
    managingOrganization?: any;
    partOf?: any;
    hoursOfOperation?: any;
    availabilityExceptions?: any;
    endpoint?: any;
};
export default function (props: Partial<Location_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
