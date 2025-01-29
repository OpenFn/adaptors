import * as dt from "../datatypes.js";
export declare type ObservationDefinition_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    category?: any;
    code?: any;
    identifier?: dt.Identifier;
    permittedDataType?: any;
    multipleResultsAllowed?: any;
    method?: any;
    preferredReportName?: any;
    quantitativeDetails?: any;
    qualifiedInterval?: any;
    validCodedValueSet?: any;
    normalCodedValueSet?: any;
    abnormalCodedValueSet?: any;
    criticalCodedValueSet?: any;
};
export default function (props: Partial<ObservationDefinition_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
