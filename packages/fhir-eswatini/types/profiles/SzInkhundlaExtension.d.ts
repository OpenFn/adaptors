import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
export declare type Extension_SzInkhundlaExtension_Props = {
    extension?: FHIR.Extension[];
    id?: string;
    url?: string;
    value?: FHIR.CodeableConcept;
    [key: string]: any;
};
export default function (props: Partial<Extension_SzInkhundlaExtension_Props>): {
    extension?: dt.Extension[];
    id?: string;
    url?: string;
    value?: dt.CodeableConcept;
    resourceType: string;
};
