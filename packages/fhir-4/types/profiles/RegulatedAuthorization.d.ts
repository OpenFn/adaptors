import * as dt from "../datatypes.js";
export declare type RegulatedAuthorization_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    subject?: any;
    type?: any;
    description?: any;
    region?: any;
    status?: any;
    statusDate?: any;
    validityPeriod?: any;
    indication?: any;
    intendedUse?: any;
    basis?: any;
    holder?: any;
    regulator?: any;
    case?: any;
};
export default function (props: Partial<RegulatedAuthorization_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
