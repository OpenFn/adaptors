
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type MedicationStatement_Props = {
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
    statusReason?: MaybeArray<string[] | FHIR.CodeableConcept>;
    category?: string[] | FHIR.CodeableConcept;
    medication?: string[] | FHIR.CodeableConcept | string | FHIR.Reference;
    subject?: string | FHIR.Reference;
    context?: string | FHIR.Reference;
    effective?: string | FHIR.Period;
    dateAsserted?: string;
    informationSource?: string | FHIR.Reference;
    derivedFrom?: MaybeArray<string | FHIR.Reference>;
    reasonCode?: MaybeArray<string[] | FHIR.CodeableConcept>;
    reasonReference?: MaybeArray<string | FHIR.Reference>;
    note?: FHIR.Annotation[];
    dosage?: FHIR.Dosage[];
    [key: string]: any;
};

export default function(props: Partial<MedicationStatement_Props>) {
    const resource = {
        resourceType: "MedicationStatement",
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

    if (!_.isNil(props.medication)) {
        delete resource.medication;
        dt.composite(resource, "medication", props.medication);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.context)) {
        resource.context = dt.reference(props.context);
    }

    if (!_.isNil(props.effective)) {
        delete resource.effective;
        dt.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.informationSource)) {
        resource.informationSource = dt.reference(props.informationSource);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = dt.reference(props.derivedFrom);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    return resource;
}
