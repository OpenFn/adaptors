import * as dt from "../datatypes.js";
export declare type SpecimenDefinition_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    typeCollected?: any;
    patientPreparation?: any;
    timeAspect?: any;
    collection?: any;
    typeTested?: any;
};
export default function (props: Partial<SpecimenDefinition_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
