import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
export declare type Extension_SzLocationCodeExtension_Props = {
    extension?: FHIR.Extension[];
    id?: string;
    url?: string;
    value?: string;
    [key: string]: any;
};
export default function (props: Partial<Extension_SzLocationCodeExtension_Props>): {
    extension?: dt.Extension[];
    id?: string;
    url?: string;
    value?: string;
    resourceType: string;
};
