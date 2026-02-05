
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Procedure_SzProcedure_Props = {
    asserter?: FHIR.Reference;
    basedOn?: FHIR.Reference[];
    bodySite?: FHIR.CodeableConcept[];
    category?: FHIR.CodeableConcept;
    code?: FHIR.CodeableConcept;
    complication?: FHIR.CodeableConcept[];
    complicationDetail?: FHIR.Reference[];
    contained?: any[];
    encounter?: FHIR.Reference;
    extension?: FHIR.Extension[];
    focalDevice?: FHIR.BackboneElement[];
    followUp?: FHIR.CodeableConcept[];
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    language?: string;
    location?: FHIR.Reference;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    note?: FHIR.Annotation[];
    outcome?: FHIR.CodeableConcept;
    partOf?: FHIR.Reference[];
    performed?: string | FHIR.Period | FHIR.Age | FHIR.Range;
    performer?: FHIR.BackboneElement[];
    reasonCode?: FHIR.CodeableConcept[];
    reasonReference?: FHIR.Reference[];
    recorder?: FHIR.Reference;
    report?: FHIR.Reference[];
    status?: string;
    statusReason?: FHIR.CodeableConcept;
    subject?: FHIR.Reference;
    text?: FHIR.Narrative;
    usedCode?: FHIR.CodeableConcept[];
    usedReference?: FHIR.Reference[];
    [key: string]: any;
};

export default function(props: Partial<Procedure_SzProcedure_Props>) {
    const resource = {
        resourceType: "Procedure",
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

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = dt.concept(props.statusReason);
    }

    if (!_.isNil(props.category)) {
        resource.category = dt.concept(props.category);
    }

    if (!_.isNil(props.code)) {
        resource.code = dt.concept(props.code);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.performed)) {
        delete resource.performed;
        dt.composite(resource, "performed", props.performed);
    }

    if (!_.isNil(props.recorder)) {
        resource.recorder = dt.reference(props.recorder);
    }

    if (!_.isNil(props.asserter)) {
        resource.asserter = dt.reference(props.asserter);
    }

    if (!_.isNil(props.performer)) {
        let src = props.performer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.performer = [];

        for (let item of src) {
            let _performer = {
                ...item
            };

            resource.performer.push(_performer);
        }
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

    if (!_.isNil(props.bodySite)) {
        if (!Array.isArray(props.bodySite)) { props.bodySite = [props.bodySite]; }
        resource.bodySite = dt.concept(props.bodySite);
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = dt.concept(props.outcome);
    }

    if (!_.isNil(props.report)) {
        if (!Array.isArray(props.report)) { props.report = [props.report]; }
        resource.report = dt.reference(props.report);
    }

    if (!_.isNil(props.complication)) {
        if (!Array.isArray(props.complication)) { props.complication = [props.complication]; }
        resource.complication = dt.concept(props.complication);
    }

    if (!_.isNil(props.complicationDetail)) {
        if (!Array.isArray(props.complicationDetail)) { props.complicationDetail = [props.complicationDetail]; }
        resource.complicationDetail = dt.reference(props.complicationDetail);
    }

    if (!_.isNil(props.followUp)) {
        if (!Array.isArray(props.followUp)) { props.followUp = [props.followUp]; }
        resource.followUp = dt.concept(props.followUp);
    }

    if (!_.isNil(props.focalDevice)) {
        let src = props.focalDevice;
        if (!Array.isArray(src)) { src = [src]; }
        resource.focalDevice = [];

        for (let item of src) {
            let _focalDevice = {
                ...item
            };

            resource.focalDevice.push(_focalDevice);
        }
    }

    if (!_.isNil(props.usedReference)) {
        if (!Array.isArray(props.usedReference)) { props.usedReference = [props.usedReference]; }
        resource.usedReference = dt.reference(props.usedReference);
    }

    if (!_.isNil(props.usedCode)) {
        if (!Array.isArray(props.usedCode)) { props.usedCode = [props.usedCode]; }
        resource.usedCode = dt.concept(props.usedCode);
    }

    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
    return resource;
}
