
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type RegulatedAuthorization_Props = {
    basis?: MaybeArray<string[] | FHIR.CodeableConcept>;
    case?: FHIR.BackboneElement;
    contained?: any[];
    description?: FHIR.markdown;
    extension?: FHIR.Extension[];
    holder?: string | FHIR.Reference;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    indication?: FHIR.CodeableReference;
    intendedUse?: string[] | FHIR.CodeableConcept;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    region?: MaybeArray<string[] | FHIR.CodeableConcept>;
    regulator?: string | FHIR.Reference;
    status?: string[] | FHIR.CodeableConcept;
    statusDate?: string;
    subject?: MaybeArray<string | FHIR.Reference>;
    text?: FHIR.Narrative;
    type?: string[] | FHIR.CodeableConcept;
    validityPeriod?: FHIR.Period;
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
