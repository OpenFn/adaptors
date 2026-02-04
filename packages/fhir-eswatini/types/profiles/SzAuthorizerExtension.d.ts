import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
export declare type Extension_SzAuthorizerExtension_Props = {
    extension?: FHIR.Extension[];
    id?: string;
    url?: string;
    value?: FHIR.Reference;
    [key: string]: any;
};
export default function (props: Partial<Extension_SzAuthorizerExtension_Props>): {
    extension?: dt.Extension[];
    id?: string;
    url?: string;
    value?: dt.Reference;
    resourceType: string;
};
