
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type FamilyMemberHistory_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    instantiatesCanonical?: any;
    instantiatesUri?: string;
    status?: string;
    dataAbsentReason?: FHIR.CodeableConcept;
    patient?: FHIR.Reference;
    date?: string;
    name?: string;
    relationship?: FHIR.CodeableConcept;
    sex?: FHIR.CodeableConcept;
    born?: FHIR.Period;
    age?: FHIR.Age;
    estimatedAge?: boolean;
    deceased?: boolean;
    reasonCode?: FHIR.CodeableConcept;
    reasonReference?: FHIR.Reference;
    note?: FHIR.Annotation;
    condition?: FHIR.BackboneElement;
    initialiser?: any;
};

export default function(props: Partial<FamilyMemberHistory_Props>) {
    const resource = {
        resourceType: "FamilyMemberHistory",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.born)) {
        delete resource.born;
        dt.composite(resource, "born", props.born);
    }

    if (!_.isNil(props.age)) {
        delete resource.age;
        dt.composite(resource, "age", props.age);
    }

    if (!_.isNil(props.deceased)) {
        delete resource.deceased;
        dt.composite(resource, "deceased", props.deceased);
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.condition)) {
        let src = props.condition;
        if (!Array.isArray(src)) { src = [src]; }
        resource.condition = [];

        for (let item of src) {
            let _condition = {
                ...item
            };

            resource.condition.push(_condition);
        }
    }

    return resource;
}
