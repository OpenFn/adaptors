import * as dt from "../datatypes.js";
export declare type RiskAssessment_Props = {
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
    parent?: any;
    status?: any;
    method?: any;
    code?: any;
    subject?: any;
    encounter?: any;
    occurrence?: any;
    condition?: any;
    performer?: any;
    reasonCode?: any;
    reasonReference?: any;
    basis?: any;
    prediction?: any;
    mitigation?: any;
    note?: any;
};
export default function (props: Partial<RiskAssessment_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
