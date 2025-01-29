import * as dt from "../datatypes.js";
export declare type OrganizationAffiliation_Props = {
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
    organization?: any;
    participatingOrganization?: any;
    network?: any;
    code?: any;
    specialty?: any;
    location?: any;
    healthcareService?: any;
    telecom?: any;
    endpoint?: any;
};
export default function (props: Partial<OrganizationAffiliation_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
