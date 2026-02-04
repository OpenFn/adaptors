
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type GuidanceResponse_Props = {
    contained?: any[];
    dataRequirement?: FHIR.DataRequirement[];
    encounter?: string | FHIR.Reference;
    evaluationMessage?: MaybeArray<string | FHIR.Reference>;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    module?: string | any | string[] | FHIR.CodeableConcept;
    note?: FHIR.Annotation[];
    occurrenceDateTime?: string;
    outputParameters?: string | FHIR.Reference;
    performer?: string | FHIR.Reference;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    requestIdentifier?: string | FHIR.Identifier;
    result?: string | FHIR.Reference;
    status?: string;
    subject?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<GuidanceResponse_Props>) {
    const resource = {
        resourceType: "GuidanceResponse",
        ...props
    };

    if (!_.isNil(props.requestIdentifier)) {
        resource.requestIdentifier = dt.identifier(props.requestIdentifier);
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.module)) {
        delete resource.module;
        dt.composite(resource, "module", props.module);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.performer)) {
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.reasonCode)) {
        if (!Array.isArray(props.reasonCode)) { props.reasonCode = [props.reasonCode]; }
        resource.reasonCode = dt.concept(props.reasonCode);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.evaluationMessage)) {
        if (!Array.isArray(props.evaluationMessage)) { props.evaluationMessage = [props.evaluationMessage]; }
        resource.evaluationMessage = dt.reference(props.evaluationMessage);
    }

    if (!_.isNil(props.outputParameters)) {
        resource.outputParameters = dt.reference(props.outputParameters);
    }

    if (!_.isNil(props.result)) {
        resource.result = dt.reference(props.result);
    }

    return resource;
}
