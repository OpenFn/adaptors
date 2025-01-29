import * as dt from "../datatypes.js";
export declare type BodyStructure_Props = {
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
    morphology?: any;
    location?: any;
    locationQualifier?: any;
    description?: any;
    image?: any;
    patient?: any;
};
export default function (props: Partial<BodyStructure_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
