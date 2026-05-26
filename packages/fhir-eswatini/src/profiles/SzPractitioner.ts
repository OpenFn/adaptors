
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Practitioner_SzPractitioner_Props = {
    active?: boolean;
    address?: Address[];
    birthDate?: string;
    communication?: CodeableConcept[];
    contained?: any[];
    extension?: Extension[];
    gender?: string;
    id?: string;
    identifier?: Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: HumanName[];
    photo?: Attachment[];
    qualification?: BackboneElement[];
    telecom?: ContactPoint[];
    text?: Narrative;
    [key: string]: any;
};

export default function(props: Partial<Practitioner_SzPractitioner_Props>) {
    const resource = {
        resourceType: "Practitioner",

        meta: {
            profile: ["https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzPractitioner"]
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.name)) {
        let src = props.name;
        if (!Array.isArray(src)) { src = [src]; }
        resource.name = [];

        for (let item of src) {
            let _name = {
                ...item
            };

            resource.name.push(_name);
        }
    }

    if (!_.isNil(props.qualification)) {
        let src = props.qualification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.qualification = [];

        for (let item of src) {
            let _qualification = {
                ...item
            };

            resource.qualification.push(_qualification);
        }
    }

    if (!_.isNil(props.communication)) {
        if (!Array.isArray(props.communication)) { props.communication = [props.communication]; }

        resource.communication = props.communication.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/languages|4.0.1", x))
        );

        dt.ensureConceptText(resource.communication);
    }

    resource.text = {
      status: 'generated',
      div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">
      <h2>${resource.resourceType}: ${resource.id || '(anon)'}</h2>
</div>`,
    };
    return resource;
}
