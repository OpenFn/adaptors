
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Extension_SzInkhundlaExtension_Props = {
    extension?: FHIR.Extension[];
    id?: string;
    url?: string;
    value?: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49" | "50" | "51" | "52" | "53" | "54" | "55" | "56" | "57" | "58" | "59" | "60" | "-99";
    [key: string]: any;
};

export default function(props: Partial<Extension_SzInkhundlaExtension_Props>) {
    const resource = {
        resourceType: "Extension",
        ...props
    };

    if (!_.isNil(props.value)) {
        delete resource.value;
        dt.composite(resource, "value", props.value);
    }

    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
    return resource;
}
