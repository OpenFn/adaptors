
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ClinicalUseDefinition_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    type?: string;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    subject?: MaybeArray<string | FHIR.Reference>;
    status?: string[] | FHIR.CodeableConcept;
    contraindication?: FHIR.BackboneElement;
    indication?: FHIR.BackboneElement;
    interaction?: FHIR.BackboneElement;
    population?: MaybeArray<string | FHIR.Reference>;
    undesirableEffect?: FHIR.BackboneElement;
    warning?: FHIR.BackboneElement;
    [key: string]: any;
};

export default function(props: Partial<ClinicalUseDefinition_Props>) {
    const resource = {
        resourceType: "ClinicalUseDefinition",
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

    if (!_.isNil(props.contraindication)) {
        let src = props.contraindication;

        let _contraindication = {
            ...item
        };

        resource.contraindication = _contraindication;
    }

    if (!_.isNil(props.indication)) {
        let src = props.indication;

        let _indication = {
            ...item
        };

        resource.indication = _indication;
    }

    if (!_.isNil(props.interaction)) {
        let src = props.interaction;

        let _interaction = {
            ...item
        };

        resource.interaction = _interaction;
    }

    if (!_.isNil(props.population)) {
        if (!Array.isArray(props.population)) { props.population = [props.population]; }
        resource.population = dt.reference(props.population);
    }

    if (!_.isNil(props.undesirableEffect)) {
        let src = props.undesirableEffect;

        let _undesirableEffect = {
            ...item
        };

        resource.undesirableEffect = _undesirableEffect;
    }

    if (!_.isNil(props.warning)) {
        let src = props.warning;

        let _warning = {
            ...item
        };

        resource.warning = _warning;
    }

    return resource;
}
