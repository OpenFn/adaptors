
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Condition_SzCondition_Props = {
    abatement?: string | FHIR.Age | FHIR.Period | FHIR.Range;
    asserter?: FHIR.Reference;
    bodySite?: FHIR.CodeableConcept[];
    category?: FHIR.CodeableConcept[];
    clinicalStatus?: FHIR.CodeableConcept;
    code?: FHIR.CodeableConcept;
    contained?: any[];
    encounter?: FHIR.Reference;
    evidence?: FHIR.BackboneElement[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    onset?: string;
    recordedDate?: string;
    recorder?: FHIR.Reference;
    severity?: FHIR.CodeableConcept;
    stage?: FHIR.BackboneElement[];
    subject?: FHIR.Reference;
    text?: FHIR.Narrative;
    verificationStatus?: FHIR.CodeableConcept;
    [key: string]: any;
};

export default function(props: Partial<Condition_SzCondition_Props>) {
    const resource = {
        resourceType: "Condition",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.clinicalStatus)) {
        resource.clinicalStatus = dt.concept(props.clinicalStatus);
    }

    if (!_.isNil(props.verificationStatus)) {
        resource.verificationStatus = dt.concept(props.verificationStatus);
    }

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.severity)) {
        resource.severity = dt.concept(props.severity);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.bodySite)) {
        if (!Array.isArray(props.bodySite)) { props.bodySite = [props.bodySite]; }
        resource.bodySite = dt.concept(props.bodySite);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.onset)) {
        delete resource.onset;
        dt.composite(resource, "onset", props.onset);
    }

    if (!_.isNil(props.abatement)) {
        delete resource.abatement;
        dt.composite(resource, "abatement", props.abatement);
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = dt.reference(props.recorder);
    }

    if (!_.isNil(props.asserter)) {
        resource.asserter = dt.reference(props.asserter);
    }

    if (!_.isNil(props.stage)) {
        let src = props.stage;
        if (!Array.isArray(src)) { src = [src]; }
        resource.stage = [];

        for (let item of src) {
            let _stage = {
                ...item
            };

            resource.stage.push(_stage);
        }
    }

    if (!_.isNil(props.evidence)) {
        let src = props.evidence;
        if (!Array.isArray(src)) { src = [src]; }
        resource.evidence = [];

        for (let item of src) {
            let _evidence = {
                ...item
            };

            resource.evidence.push(_evidence);
        }
    }

    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
    return resource;
}
