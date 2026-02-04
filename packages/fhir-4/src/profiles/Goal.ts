
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Goal_Props = {
    achievementStatus?: string[] | FHIR.CodeableConcept;
    addresses?: MaybeArray<string | FHIR.Reference>;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    contained?: any[];
    description?: string[] | FHIR.CodeableConcept;
    expressedBy?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    lifecycleStatus?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    outcomeCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    outcomeReference?: MaybeArray<string | FHIR.Reference>;
    priority?: string[] | FHIR.CodeableConcept;
    start?: string | string[] | FHIR.CodeableConcept;
    statusDate?: string;
    statusReason?: string;
    subject?: string | FHIR.Reference;
    target?: FHIR.BackboneElement[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<Goal_Props>) {
    const resource = {
        resourceType: "Goal",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.achievementStatus)) {
        resource.achievementStatus = dt.concept(props.achievementStatus);
    }

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.priority)) {
        resource.priority = dt.concept(props.priority);
    }

    if (!_.isNil(props.description)) {
        resource.description = dt.concept(props.description);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.start)) {
        delete resource.start;
        dt.composite(resource, "start", props.start);
    }

    if (!_.isNil(props.target)) {
        let src = props.target;
        if (!Array.isArray(src)) { src = [src]; }
        resource.target = [];

        for (let item of src) {
            let _target = {
                ...item
            };

            resource.target.push(_target);
        }
    }

    if (!_.isNil(props.expressedBy)) {
        resource.expressedBy = dt.reference(props.expressedBy);
    }

    if (!_.isNil(props.addresses)) {
        if (!Array.isArray(props.addresses)) { props.addresses = [props.addresses]; }
        resource.addresses = dt.reference(props.addresses);
    }

    if (!_.isNil(props.outcomeCode)) {
        if (!Array.isArray(props.outcomeCode)) { props.outcomeCode = [props.outcomeCode]; }
        resource.outcomeCode = dt.concept(props.outcomeCode);
    }

    if (!_.isNil(props.outcomeReference)) {
        if (!Array.isArray(props.outcomeReference)) { props.outcomeReference = [props.outcomeReference]; }
        resource.outcomeReference = dt.reference(props.outcomeReference);
    }

    return resource;
}
