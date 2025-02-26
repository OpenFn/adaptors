
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Procedure_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    instantiatesCanonical?: any[];
    instantiatesUri?: string[];
    basedOn?: MaybeArray<string | FHIR.Reference>;
    partOf?: MaybeArray<string | FHIR.Reference>;
    status?: string;
    statusReason?: string[] | FHIR.CodeableConcept;
    category?: string[] | FHIR.CodeableConcept;
    code?: string[] | FHIR.CodeableConcept;
    subject?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    performed?: string | FHIR.Period | FHIR.Age | FHIR.Range;
    recorder?: string | FHIR.Reference;
    asserter?: string | FHIR.Reference;
    performer?: FHIR.BackboneElement[];
    location?: string | FHIR.Reference;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    bodySite?: MaybeArray<string[] | FHIR.CodeableConcept>;
    outcome?: string[] | FHIR.CodeableConcept;
    report?: MaybeArray<string | FHIR.Reference>;
    complication?: MaybeArray<string[] | FHIR.CodeableConcept>;
    complicationDetail?: MaybeArray<string | FHIR.Reference>;
    followUp?: MaybeArray<string[] | FHIR.CodeableConcept>;
    note?: FHIR.Annotation[];
    focalDevice?: FHIR.BackboneElement[];
    usedReference?: MaybeArray<string | FHIR.Reference>;
    usedCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    [key: string]: any;
};

export default function(props: Partial<Procedure_Props>) {
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

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.report)) {
        if (!Array.isArray(props.report)) { props.report = [props.report]; }
        resource.report = dt.reference(props.report);
    }

    if (!_.isNil(props.complicationDetail)) {
        if (!Array.isArray(props.complicationDetail)) { props.complicationDetail = [props.complicationDetail]; }
        resource.complicationDetail = dt.reference(props.complicationDetail);
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

    return resource;
}
