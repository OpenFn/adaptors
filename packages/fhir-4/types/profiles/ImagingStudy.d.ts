import * as dt from "../datatypes.js";
export declare type ImagingStudy_Props = {
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
    modality?: any;
    subject?: any;
    encounter?: any;
    started?: any;
    basedOn?: any;
    referrer?: any;
    interpreter?: any;
    endpoint?: any;
    numberOfSeries?: any;
    numberOfInstances?: any;
    procedureReference?: any;
    procedureCode?: any;
    location?: any;
    reasonCode?: any;
    reasonReference?: any;
    note?: any;
    description?: any;
    series?: any;
};
export default function (props: Partial<ImagingStudy_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
