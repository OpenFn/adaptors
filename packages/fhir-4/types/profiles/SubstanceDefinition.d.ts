import * as dt from "../datatypes.js";
export declare type SubstanceDefinition_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    version?: any;
    status?: any;
    classification?: any;
    domain?: any;
    grade?: any;
    description?: any;
    informationSource?: any;
    note?: any;
    manufacturer?: any;
    supplier?: any;
    moiety?: any;
    property?: any;
    molecularWeight?: any;
    structure?: any;
    code?: any;
    name?: any;
    relationship?: any;
    sourceMaterial?: any;
};
export default function (props: Partial<SubstanceDefinition_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
