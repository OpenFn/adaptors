import * as dt from "../datatypes.js";
export declare type Endpoint_Props = {
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
    connectionType?: any;
    name?: any;
    managingOrganization?: any;
    contact?: any;
    period?: any;
    payloadType?: any;
    payloadMimeType?: any;
    address?: any;
    header?: any;
};
export default function (props: Partial<Endpoint_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
