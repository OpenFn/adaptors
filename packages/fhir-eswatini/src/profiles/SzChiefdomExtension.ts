
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Extension_SzChiefdomExtension_Props = {
    extension?: FHIR.Extension[];
    id?: string;
    url?: string;
    value?: FHIR.CodeableConcept;
    [key: string]: any;
};

export default function(props: Partial<Extension_SzChiefdomExtension_Props>) {
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
