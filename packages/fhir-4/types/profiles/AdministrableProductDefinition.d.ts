import * as dt from "../datatypes.js";
export declare type AdministrableProductDefinition_Props = {
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
    formOf?: any;
    administrableDoseForm?: any;
    unitOfPresentation?: any;
    producedFrom?: any;
    ingredient?: any;
    device?: any;
    property?: any;
    routeOfAdministration?: any;
};
export default function (props: Partial<AdministrableProductDefinition_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
