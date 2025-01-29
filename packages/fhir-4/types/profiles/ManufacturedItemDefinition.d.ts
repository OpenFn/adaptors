import * as dt from "../datatypes.js";
export declare type ManufacturedItemDefinition_Props = {
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
    manufacturedDoseForm?: any;
    unitOfPresentation?: any;
    manufacturer?: any;
    ingredient?: any;
    property?: any;
};
export default function (props: Partial<ManufacturedItemDefinition_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
