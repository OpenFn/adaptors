
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type GuidanceResponse_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    requestIdentifier?: string | FHIR.Identifier;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    module?: string | any | string[] | FHIR.CodeableConcept;
    status?: string;
    subject?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    occurrenceDateTime?: string;
    performer?: string | FHIR.Reference;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    note?: FHIR.Annotation[];
    evaluationMessage?: MaybeArray<string | FHIR.Reference>;
    outputParameters?: string | FHIR.Reference;
    result?: string | FHIR.Reference;
    dataRequirement?: FHIR.DataRequirement[];
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
