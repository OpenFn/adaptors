
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Organization_SzOrganization_Props = {
    active?: boolean;
    address?: Address[];
    alias?: string[];
    contact?: BackboneElement[];
    contained?: any[];
    endpoint?: Reference[];
    extension?: Extension[];
    id?: string;
    identifier?: Identifier[];
    implicitRules?: string;
    language?: string;
    meta?: Meta;
    modifierExtension?: Extension[];
    name?: string;
    partOf?: Reference;
    telecom?: ContactPoint[];
    text?: Narrative;
    type?: CodeableConcept[];
    [key: string]: any;
};

export default function(props: Partial<Organization_SzOrganization_Props>) {
    const resource = {
        resourceType: "Organization",

        meta: {
            profile: ["https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzOrganization"]
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.type)) {
        if (!Array.isArray(props.type)) { props.type = [props.type]; }

        resource.type = props.type.map(
            (x) => dt.concept(dt.lookupValue("http://hl7.org/fhir/ValueSet/organization-type|4.0.1", x))
        );

        dt.ensureConceptText(resource.type);
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (let item of src) {
            let _contact = {
                ...item
            };

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = dt.reference(props.endpoint);
    }

    resource.text = {
      status: 'generated',
      div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">
      <h2>${resource.resourceType}: ${resource.id || '(anon)'}</h2>
</div>`,
    };
    return resource;
}
