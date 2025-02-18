
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Condition_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    clinicalStatus?: FHIR.CodeableConcept;
    verificationStatus?: FHIR.CodeableConcept;
    category?: FHIR.CodeableConcept;
    severity?: FHIR.CodeableConcept;
    code?: FHIR.CodeableConcept;
    bodySite?: FHIR.CodeableConcept;
    subject?: FHIR.Reference;
    encounter?: FHIR.Reference;
    onset?: string;
    abatement?: string;
    recordedDate?: string;
    recorder?: FHIR.Reference;
    asserter?: FHIR.Reference;
    stage?: FHIR.BackboneElement;
    evidence?: FHIR.BackboneElement;
    note?: FHIR.Annotation;
    initialiser?: any;
};

export default function(props: Partial<Condition_Props>) {
    const resource = {
        resourceType: "Condition",
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

    return resource;
}
