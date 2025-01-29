import * as dt from "../datatypes.js";
export declare type EpisodeOfCare_Props = {
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
    statusHistory?: any;
    type?: any;
    diagnosis?: any;
    patient?: any;
    managingOrganization?: any;
    period?: any;
    referralRequest?: any;
    careManager?: any;
    team?: any;
    account?: any;
};
export default function (props: Partial<EpisodeOfCare_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
