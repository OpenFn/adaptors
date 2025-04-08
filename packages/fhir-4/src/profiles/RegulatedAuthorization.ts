
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type RegulatedAuthorization_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    subject?: MaybeArray<string | FHIR.Reference>;
    type?: string[] | FHIR.CodeableConcept;
    description?: FHIR.markdown;
    region?: MaybeArray<string[] | FHIR.CodeableConcept>;
    status?: string[] | FHIR.CodeableConcept;
    statusDate?: string;
    validityPeriod?: FHIR.Period;
    indication?: FHIR.CodeableReference;
    intendedUse?: string[] | FHIR.CodeableConcept;
    basis?: MaybeArray<string[] | FHIR.CodeableConcept>;
    holder?: string | FHIR.Reference;
    regulator?: string | FHIR.Reference;
    case?: FHIR.BackboneElement;
    [key: string]: any;
};

export default function(props: Partial<RegulatedAuthorization_Props>) {
    const resource = {
        resourceType: "RegulatedAuthorization",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.holder)) {
        resource.holder = dt.reference(props.holder);
    }

    if (!_.isNil(props.regulator)) {
        resource.regulator = dt.reference(props.regulator);
    }

    if (!_.isNil(props.case)) {
        let src = props.case;

        let _case = {
            ...item
        };

        resource.case = _case;
    }

    return resource;
}
