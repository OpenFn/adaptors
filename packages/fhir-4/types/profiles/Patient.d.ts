import fhir from "fhir/r4";
export declare type Patient_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: fhir.Identifier;
    active?: any;
    name?: any;
    telecom?: any;
    gender?: any;
    birthDate?: any;
    deceased?: any;
    address?: any;
    maritalStatus?: any;
    multipleBirth?: any;
    photo?: any;
    contact?: any;
    communication?: any;
    generalPractitioner?: any;
    managingOrganization?: any;
    link?: any;
};
export default function (props: Partial<Patient_Props>): {
    resourceType: string;
    text: {
        status: string;
        div: string;
    };
};
