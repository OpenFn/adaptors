
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Observation_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    basedOn?: MaybeArray<string | FHIR.Reference>;
    partOf?: MaybeArray<string | FHIR.Reference>;
    status?: string;
    category?: MaybeArray<string[] | FHIR.CodeableConcept>;
    code?: string[] | FHIR.CodeableConcept;
    subject?: string | FHIR.Reference;
    focus?: MaybeArray<string | FHIR.Reference>;
    encounter?: string | FHIR.Reference;
    effective?: string | FHIR.Period | FHIR.Timing;
    issued?: string;
    performer?: MaybeArray<string | FHIR.Reference>;
    value?: FHIR.Quantity | string[] | FHIR.CodeableConcept | string | boolean | number | FHIR.Range | FHIR.Ratio | FHIR.SampledData | FHIR.Period;
    dataAbsentReason?: string[] | FHIR.CodeableConcept;
    interpretation?: MaybeArray<string[] | FHIR.CodeableConcept>;
    note?: FHIR.Annotation[];
    bodySite?: string[] | FHIR.CodeableConcept;
    method?: string[] | FHIR.CodeableConcept;
    specimen?: string | FHIR.Reference;
    device?: string | FHIR.Reference;
    referenceRange?: FHIR.BackboneElement[];
    hasMember?: MaybeArray<string | FHIR.Reference>;
    derivedFrom?: MaybeArray<string | FHIR.Reference>;
    component?: FHIR.BackboneElement[];
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
