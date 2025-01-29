import * as dt from "../datatypes.js";
export declare type VisionPrescription_Props = {
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
    created?: any;
    patient?: any;
    encounter?: any;
    dateWritten?: any;
    prescriber?: any;
    lensSpecification?: any;
};
export default function (props: Partial<VisionPrescription_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
