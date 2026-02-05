
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Schedule_Props = {
    active?: boolean;
    actor?: MaybeArray<string | FHIR.Reference>;
    comment?: string;
    contained?: any[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    planningHorizon?: FHIR.Period;
    serviceCategory?: MaybeArray<string[] | FHIR.CodeableConcept>;
    serviceType?: MaybeArray<string[] | FHIR.CodeableConcept>;
    specialty?: MaybeArray<string[] | FHIR.CodeableConcept>;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<Schedule_Props>) {
    const resource = {
        resourceType: "Schedule",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.serviceCategory)) {
        if (!Array.isArray(props.serviceCategory)) { props.serviceCategory = [props.serviceCategory]; }
        resource.serviceCategory = dt.concept(props.serviceCategory);
    }

    if (!_.isNil(props.serviceType)) {
        if (!Array.isArray(props.serviceType)) { props.serviceType = [props.serviceType]; }
        resource.serviceType = dt.concept(props.serviceType);
    }

    if (!_.isNil(props.specialty)) {
        if (!Array.isArray(props.specialty)) { props.specialty = [props.specialty]; }
        resource.specialty = dt.concept(props.specialty);
    }

    if (!_.isNil(props.actor)) {
        if (!Array.isArray(props.actor)) { props.actor = [props.actor]; }
        resource.actor = dt.reference(props.actor);
    }

    return resource;
}
