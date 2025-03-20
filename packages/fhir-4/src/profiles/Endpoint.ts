
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Endpoint_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: Array<string | FHIR.Identifier>;
    status?: string;
    connectionType?: FHIR.Coding;
    name?: string;
    managingOrganization?: string | FHIR.Reference;
    contact?: FHIR.ContactPoint[];
    period?: FHIR.Period;
    payloadType?: Array<string[] | FHIR.CodeableConcept>;
    payloadMimeType?: string[];
    address?: FHIR.url;
    header?: string[];
    initialiser?: any;
    typeShorthands?: any;
    [key: string]: any;
};

export default function(props: Partial<Endpoint_Props>) {
    const resource = {
        resourceType: "Endpoint",
        ...props
    };

    return resource;
}
