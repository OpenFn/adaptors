import * as dt from "../datatypes.js";
export declare type MolecularSequence_Props = {
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
    coordinateSystem?: any;
    patient?: any;
    specimen?: any;
    device?: any;
    performer?: any;
    quantity?: any;
    referenceSeq?: any;
    variant?: any;
    observedSeq?: any;
    quality?: any;
    readCoverage?: any;
    repository?: any;
    pointer?: any;
    structureVariant?: any;
};
export default function (props: Partial<MolecularSequence_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
