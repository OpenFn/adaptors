import * as dt from "../datatypes.js";
export declare type AdverseEvent_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    actuality?: any;
    category?: any;
    event?: any;
    subject?: any;
    encounter?: any;
    date?: any;
    detected?: any;
    recordedDate?: any;
    resultingCondition?: any;
    location?: any;
    seriousness?: any;
    severity?: any;
    outcome?: any;
    recorder?: any;
    contributor?: any;
    suspectEntity?: any;
    subjectMedicalHistory?: any;
    referenceDocument?: any;
    study?: any;
};
export default function (props: Partial<AdverseEvent_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
