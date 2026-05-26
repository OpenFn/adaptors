
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Condition_SzCondition_Props = {
    abatement?: string | Age | Period | Range;
    asserter?: Reference;
    bodySite?: CodeableConcept[];
    category?: CodeableConcept[];
    clinicalStatus?: CodeableConcept;
    code?: CodeableConcept;
    contained?: any[];
    encounter?: Reference;
    evidence?: BackboneElement[];
    extension?: Extension[];
    id?: string;
    identifier?: Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    note?: Annotation[];
    onset?: string;
    recordedDate?: string;
    recorder?: Reference;
    severity?: CodeableConcept;
    stage?: BackboneElement[];
    subject?: Reference;
    text?: Narrative;
    verificationStatus?: CodeableConcept;
    [key: string]: any;
};

export default function(props: Partial<Condition_SzCondition_Props>) {
    const resource = {
        resourceType: "Condition",

        meta: {
            profile: ["https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzCondition"]
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.clinicalStatus)) {
        resource.clinicalStatus = dt.concept(dt.lookupValue(
            "http://hl7.org/fhir/ValueSet/condition-clinical|4.0.1",
            props.clinicalStatus
        ));

        dt.ensureConceptText(resource.clinicalStatus);
    }

    if (!_.isNil(props.verificationStatus)) {
        resource.verificationStatus = dt.concept(dt.lookupValue(
            "http://hl7.org/fhir/ValueSet/condition-ver-status|4.0.1",
            props.verificationStatus
        ));

        dt.ensureConceptText(resource.verificationStatus);
    }

    if (!_.isNil(props.category)) {
        if (!Array.isArray(props.category)) { props.category = [props.category]; }

        resource.category = props.category.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/condition-category|4.0.1", x))
        );

        dt.ensureConceptText(resource.category);
    }

    if (!_.isNil(props.severity)) {
        resource.severity = dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/condition-severity|4.0.1", props.severity)
        );

        dt.ensureConceptText(resource.severity);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/condition-code|4.0.1", props.code)
        );

        dt.ensureConceptText(resource.code);
    }

    if (!_.isNil(props.bodySite)) {
        if (!Array.isArray(props.bodySite)) { props.bodySite = [props.bodySite]; }

        resource.bodySite = props.bodySite.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/body-site|4.0.1", x))
        );

        dt.ensureConceptText(resource.bodySite);
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

    resource.text = {
      status: 'generated',
      div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">
      <h2>${resource.resourceType}: ${resource.id || '(anon)'}</h2>
</div>`,
    };
    return resource;
}
