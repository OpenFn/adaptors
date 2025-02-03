
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type FamilyMemberHistory_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    instantiatesCanonical?: any;
    instantiatesUri?: string;
    status?: string;
    dataAbsentReason?: CodeableConcept;
    patient?: Reference;
    date?: string;
    name?: string;
    relationship?: CodeableConcept;
    sex?: CodeableConcept;
    born?: Period;
    age?: Age;
    estimatedAge?: boolean;
    deceased?: boolean;
    reasonCode?: CodeableConcept;
    reasonReference?: Reference;
    note?: Annotation;
    condition?: BackboneElement;
};

export default function(props: Partial<FamilyMemberHistory_Props>) {
    const resource = {
        resourceType: "FamilyMemberHistory",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>FamilyMemberHistory</b></p></div>"
        },

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
        dt.composite(resource, "born", props.born);
    }

    if (!_.isNil(props.age)) {
        dt.composite(resource, "age", props.age);
    }

    if (!_.isNil(props.deceased)) {
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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/FamilyMemberHistory"]
    };

    return resource;
}
