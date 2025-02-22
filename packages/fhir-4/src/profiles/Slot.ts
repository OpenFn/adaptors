
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Slot_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: Array<string | FHIR.Identifier>;
    serviceCategory?: Array<string[] | FHIR.CodeableConcept>;
    serviceType?: Array<string[] | FHIR.CodeableConcept>;
    specialty?: Array<string[] | FHIR.CodeableConcept>;
    appointmentType?: string[] | FHIR.CodeableConcept;
    schedule?: string | FHIR.Reference;
    status?: string;
    start?: string;
    end?: string;
    overbooked?: boolean;
    comment?: string;
    initialiser?: any;
    typeShorthands?: any;
    [key: string]: any;
};

export default function(props: Partial<Slot_Props>) {
    const resource = {
        resourceType: "Slot",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.schedule)) {
        resource.schedule = dt.reference(props.schedule);
    }

    return resource;
}
