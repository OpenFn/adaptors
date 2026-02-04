
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type DomainResource_Props = {
    contained?: any[];
    extension?: FHIR.Extension[];
    id?: string;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<DomainResource_Props>) {
    const resource = {
        resourceType: "DomainResource",
        ...props
    };

    return resource;
}
