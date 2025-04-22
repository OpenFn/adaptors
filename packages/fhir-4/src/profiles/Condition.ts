
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
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: Array<string | FHIR.Identifier>;
    clinicalStatus?: string[] | FHIR.CodeableConcept;
    verificationStatus?: string[] | FHIR.CodeableConcept;
    category?: Array<string[] | FHIR.CodeableConcept>;
    severity?: string[] | FHIR.CodeableConcept;
    code?: string[] | FHIR.CodeableConcept;
    bodySite?: Array<string[] | FHIR.CodeableConcept>;
    subject?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    onset?: string | FHIR.Age | FHIR.Period | FHIR.Range | string;
    abatement?: string | FHIR.Age | FHIR.Period | FHIR.Range | string;
    recordedDate?: string;
    recorder?: string | FHIR.Reference;
    asserter?: string | FHIR.Reference;
    stage?: FHIR.BackboneElement[];
    evidence?: FHIR.BackboneElement[];
    note?: FHIR.Annotation[];
    initialiser?: any;
    typeShorthands?: any;
    [key: string]: any;
};

export default function(props: Partial<Condition_Props>) {
    const resource = {
        resourceType: "Condition",
        ...props
    };

    if (!_.isNil(props.onset)) {
        delete resource.onset;
        dt.composite(resource, "onset", props.onset);
    }

    if (!_.isNil(props.abatement)) {
        delete resource.abatement;
        dt.composite(resource, "abatement", props.abatement);
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
