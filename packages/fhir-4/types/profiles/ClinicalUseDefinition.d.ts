import * as dt from "../datatypes.js";
export declare type ClinicalUseDefinition_Props = {
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
    category?: any;
    subject?: any;
    status?: any;
    contraindication?: any;
    indication?: any;
    interaction?: any;
    population?: any;
    undesirableEffect?: any;
    warning?: any;
};
export default function (props: Partial<ClinicalUseDefinition_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
