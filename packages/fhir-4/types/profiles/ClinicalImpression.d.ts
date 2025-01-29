import * as dt from "../datatypes.js";
export declare type ClinicalImpression_Props = {
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
    statusReason?: any;
    code?: any;
    description?: any;
    subject?: any;
    encounter?: any;
    effective?: any;
    date?: any;
    assessor?: any;
    previous?: any;
    problem?: any;
    investigation?: any;
    protocol?: any;
    summary?: any;
    finding?: any;
    prognosisCodeableConcept?: any;
    prognosisReference?: any;
    supportingInfo?: any;
    note?: any;
};
export default function (props: Partial<ClinicalImpression_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
