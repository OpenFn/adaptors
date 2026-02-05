
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type ImagingStudy_Props = {
    basedOn?: MaybeArray<string | FHIR.Reference>;
    contained?: any[];
    description?: string;
    encounter?: string | FHIR.Reference;
    endpoint?: MaybeArray<string | FHIR.Reference>;
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    interpreter?: MaybeArray<string | FHIR.Reference>;
    language?: string;
    location?: string | FHIR.Reference;
    meta?: FHIR.Meta;
    modality?: FHIR.Coding[];
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    numberOfInstances?: number;
    numberOfSeries?: number;
    procedureCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    procedureReference?: string | FHIR.Reference;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    referrer?: string | FHIR.Reference;
    series?: FHIR.BackboneElement[];
    started?: string;
    status?: string;
    subject?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<ImagingStudy_Props>) {
    const resource = {
        resourceType: "ImagingStudy",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.referrer)) {
        resource.referrer = dt.reference(props.referrer);
    }

    if (!_.isNil(props.interpreter)) {
        if (!Array.isArray(props.interpreter)) { props.interpreter = [props.interpreter]; }
        resource.interpreter = dt.reference(props.interpreter);
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = dt.reference(props.endpoint);
    }

    if (!_.isNil(props.procedureReference)) {
        resource.procedureReference = dt.reference(props.procedureReference);
    }

    if (!_.isNil(props.procedureCode)) {
        if (!Array.isArray(props.procedureCode)) { props.procedureCode = [props.procedureCode]; }
        resource.procedureCode = dt.concept(props.procedureCode);
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.reasonCode)) {
        if (!Array.isArray(props.reasonCode)) { props.reasonCode = [props.reasonCode]; }
        resource.reasonCode = dt.concept(props.reasonCode);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.series)) {
        let src = props.series;
        if (!Array.isArray(src)) { src = [src]; }
        resource.series = [];

        for (let item of src) {
            let _series = {
                ...item
            };

            resource.series.push(_series);
        }
    }

    return resource;
}
