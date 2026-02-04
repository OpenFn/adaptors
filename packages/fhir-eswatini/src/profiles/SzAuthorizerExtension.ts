
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Extension_SzAuthorizerExtension_Props = {
    extension?: FHIR.Extension[];
    id?: string;
    url?: string;
    value?: FHIR.Reference;
    [key: string]: any;
};

export default function(props: Partial<Extension_SzAuthorizerExtension_Props>) {
    const resource = {
        resourceType: "Extension",
        ...props
    };

    if (!_.isNil(props.value)) {
        delete resource.value;
        dt.composite(resource, "value", props.value);
    }

    return resource;
}
