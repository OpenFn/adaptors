
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
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.implicitRules)) {
        resource.implicitRules = props.implicitRules;
    }

    if (!_.isNil(props.language)) {
        resource.language = props.language;
    }

    if (!_.isNil(props.text)) {
        resource.text = props.text;
    }

    if (!_.isNil(props.contained)) {
        resource.contained = props.contained;
    }

    if (!_.isNil(props.extension)) {
        resource.extension = props.extension;
    }

    if (!_.isNil(props.modifierExtension)) {
        resource.modifierExtension = props.modifierExtension;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.gender)) {
        resource.gender = props.gender;
    }

    if (!_.isNil(props.birthDate)) {
        resource.birthDate = props.birthDate;
    }

    if (!_.isNil(props.photo)) {
        resource.photo = props.photo;
    }

    if (!_.isNil(props.qualification)) {
        let src = props.qualification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.qualification = [];

        for (let item of src) {
            let _qualification = {};

            if (!_.isNil(item.id)) {
                _qualification.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _qualification.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identifier)) {
                _qualification.identifier = item.identifier;
            }

            if (!_.isNil(item.code)) {
                _qualification.code = item.code;
            }

            if (!_.isNil(item.period)) {
                _qualification.period = item.period;
            }

            if (!_.isNil(item.issuer)) {
                _qualification.issuer = item.issuer;
            }

            resource.qualification.push(_qualification);
        }
    }

    if (!_.isNil(props.communication)) {
        resource.communication = props.communication;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"]
    };

    return resource;
}
