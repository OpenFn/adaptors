import * as dt from "../datatypes.js";
export declare type PractitionerRole_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    active?: any;
    period?: any;
    practitioner?: any;
    organization?: any;
    code?: any;
    specialty?: any;
    location?: any;
    healthcareService?: any;
    telecom?: any;
    availableTime?: any;
    notAvailable?: any;
    availabilityExceptions?: any;
    endpoint?: any;
};
export default function (props: Partial<PractitionerRole_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
