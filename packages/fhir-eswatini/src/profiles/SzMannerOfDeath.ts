
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Observation_SzMannerOfDeath_Props = {
    basedOn?: FHIR.Reference[];
    bodySite?: FHIR.CodeableConcept;
    category?: FHIR.CodeableConcept[];
    code?: FHIR.CodeableConcept;
    component?: FHIR.BackboneElement[];
    contained?: any[];
    dataAbsentReason?: FHIR.CodeableConcept;
    derivedFrom?: FHIR.Reference[];
    device?: FHIR.Reference;
    effective?: string | FHIR.Period | FHIR.Timing;
    encounter?: FHIR.Reference;
    extension?: FHIR.Extension[];
    focus?: FHIR.Reference[];
    hasMember?: FHIR.Reference[];
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    interpretation?: FHIR.CodeableConcept[];
    issued?: string;
    language?: string;
    meta?: FHIR.Meta;
    method?: FHIR.CodeableConcept;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    partOf?: FHIR.Reference[];
    performer?: FHIR.Reference[];
    referenceRange?: FHIR.BackboneElement[];
    specimen?: FHIR.Reference;
    status?: string;
    subject?: FHIR.Reference;
    text?: FHIR.Narrative;
    value?: string;
    [key: string]: any;
};

export default function(props: Partial<Observation_SzMannerOfDeath_Props>) {
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
    } else {
        resource.code = {"coding":[{"system":"http://loinc.org","code":"69449-7"}]};
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

    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
    return resource;
}
