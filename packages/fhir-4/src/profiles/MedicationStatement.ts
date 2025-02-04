
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type MedicationStatement_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    basedOn?: FHIR.Reference;
    partOf?: FHIR.Reference;
    status?: string;
    statusReason?: FHIR.CodeableConcept;
    category?: FHIR.CodeableConcept;
    medication?: FHIR.CodeableConcept;
    subject?: FHIR.Reference;
    context?: FHIR.Reference;
    effective?: string;
    dateAsserted?: string;
    informationSource?: FHIR.Reference;
    derivedFrom?: FHIR.Reference;
    reasonCode?: FHIR.CodeableConcept;
    reasonReference?: FHIR.Reference;
    note?: FHIR.Annotation;
    dosage?: FHIR.Dosage;
};

export default function(props: Partial<MedicationStatement_Props>) {
    const resource = {
        resourceType: "MedicationStatement",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicationStatement</b></p></div>"
        },

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
        dt.composite(resource, "medication", props.medication);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.context)) {
        resource.context = dt.reference(props.context);
    }

    if (!_.isNil(props.effective)) {
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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MedicationStatement"]
    };

    return resource;
}
