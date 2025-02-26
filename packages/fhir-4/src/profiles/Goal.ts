
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Goal_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    lifecycleStatus?: string;
    achievementStatus?: string[] | FHIR.CodeableConcept;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    priority?: string[] | FHIR.CodeableConcept;
    description?: string[] | FHIR.CodeableConcept;
    subject?: string | FHIR.Reference;
    start?: string | string[] | FHIR.CodeableConcept;
    target?: FHIR.BackboneElement[];
    statusDate?: string;
    statusReason?: string;
    expressedBy?: string | FHIR.Reference;
    addresses?: MaybeArray<string | FHIR.Reference>;
    note?: FHIR.Annotation[];
    outcomeCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    outcomeReference?: MaybeArray<string | FHIR.Reference>;
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

    if (!_.isNil(props.outcomeReference)) {
        if (!Array.isArray(props.outcomeReference)) { props.outcomeReference = [props.outcomeReference]; }
        resource.outcomeReference = dt.reference(props.outcomeReference);
    }

    return resource;
}
