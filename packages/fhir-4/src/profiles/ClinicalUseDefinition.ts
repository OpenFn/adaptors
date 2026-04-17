
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ClinicalUseDefinition_Props = {
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    contained?: any[];
    contraindication?: FHIR.BackboneElement;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    indication?: FHIR.BackboneElement;
    interaction?: FHIR.BackboneElement;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    population?: MaybeArray<string | FHIR.Reference>;
    status?: string[] | FHIR.CodeableConcept;
    subject?: MaybeArray<string | FHIR.Reference>;
    text?: FHIR.Narrative;
    type?: string;
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

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }

        resource.category = props.category.map((x) => dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/clinical-use-definition-category", x)
        ));

        dt.ensureConceptText(resource.category);
    }

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.status)) {
        resource.status = dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/publication-status", props.status)
        );

        dt.ensureConceptText(resource.status);
    }

    if (!_.isNil(props.contraindication)) {
        let src = props.contraindication;

        let _contraindication = {
            ...src
        };

        resource.contraindication = _contraindication;
    }

    if (!_.isNil(props.indication)) {
        let src = props.indication;

        let _indication = {
            ...src
        };

        resource.indication = _indication;
    }

    if (!_.isNil(props.interaction)) {
        let src = props.interaction;

        let _interaction = {
            ...src
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
            ...src
        };

        resource.undesirableEffect = _undesirableEffect;
    }

    if (!_.isNil(props.warning)) {
        let src = props.warning;

        let _warning = {
            ...src
        };

        resource.warning = _warning;
    }

    return resource;
}
