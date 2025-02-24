
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Schedule_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: Array<string | FHIR.Identifier>;
    active?: boolean;
    serviceCategory?: Array<string[] | FHIR.CodeableConcept>;
    serviceType?: Array<string[] | FHIR.CodeableConcept>;
    specialty?: Array<string[] | FHIR.CodeableConcept>;
    actor?: Array<string | FHIR.Reference>;
    planningHorizon?: FHIR.Period;
    comment?: string;
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

    if (!_.isNil(props.actor)) {
        if (!Array.isArray(props.actor)) { props.actor = [props.actor]; }
        resource.actor = dt.reference(props.actor);
    }

    return resource;
}
