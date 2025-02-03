
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Practitioner_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    active?: boolean;
    name?: HumanName;
    telecom?: ContactPoint;
    address?: Address;
    gender?: string;
    birthDate?: string;
    photo?: Attachment;
    qualification?: BackboneElement;
    communication?: CodeableConcept;
};

export default function(props: Partial<Practitioner_Props>) {
    const resource = {
        resourceType: "Practitioner",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Practitioner</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"]
    };

    return resource;
}
