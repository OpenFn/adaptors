
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Observation_Props = {
    basedOn?: MaybeArray<string | FHIR.Reference>;
    bodySite?: string[] | FHIR.CodeableConcept;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    code?: string[] | FHIR.CodeableConcept;
    component?: FHIR.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: string[] | FHIR.CodeableConcept;
    derivedFrom?: MaybeArray<string | FHIR.Reference>;
    device?: string | FHIR.Reference;
    effective?: string | FHIR.Period | FHIR.Timing;
    encounter?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    focus?: MaybeArray<string | FHIR.Reference>;
    hasMember?: MaybeArray<string | FHIR.Reference>;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    interpretation?: MaybeArray<string[] | FHIR.CodeableConcept>;
    issued?: string;
    language?: string;
    meta?: FHIR.Meta;
    method?: string[] | FHIR.CodeableConcept;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    partOf?: MaybeArray<string | FHIR.Reference>;
    performer?: MaybeArray<string | FHIR.Reference>;
    referenceRange?: FHIR.BackboneElement[];
    specimen?: string | FHIR.Reference;
    status?: string;
    subject?: string | FHIR.Reference;
    text?: FHIR.Narrative;
    value?: FHIR.Quantity | string[] | FHIR.CodeableConcept | string | boolean | number | FHIR.Range | FHIR.Ratio | FHIR.SampledData | FHIR.Period;
    [key: string]: any;
};

export default function(props: Partial<Observation_Props>) {
    const resource = {
        resourceType: "Observation",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = dt.reference(props.focus);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        delete resource.effective;
        dt.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.value)) {
        delete resource.value;
        dt.composite(resource, "value", props.value);
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = dt.concept(props.dataAbsentReason);
    }

    if (!_.isNil(props.interpretation)) {
        if (!Array.isArray(props.interpretation)) { props.interpretation = [props.interpretation]; }
        resource.interpretation = dt.concept(props.interpretation);
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = dt.concept(props.bodySite);
    }

    if (!_.isNil(props.method)) {
        resource.method = dt.concept(props.method);
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = dt.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = dt.reference(props.device);
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (let item of src) {
            let _referenceRange = {
                ...item
            };

            resource.referenceRange.push(_referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        if (!Array.isArray(props.hasMember)) { props.hasMember = [props.hasMember]; }
        resource.hasMember = dt.reference(props.hasMember);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = dt.reference(props.derivedFrom);
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (let item of src) {
            let _component = {
                ...item
            };

            resource.component.push(_component);
        }
    }

    return resource;
}
