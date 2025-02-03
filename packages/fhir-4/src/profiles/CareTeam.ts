
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type CareTeam_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    status?: string;
    category?: CodeableConcept;
    name?: string;
    subject?: Reference;
    encounter?: Reference;
    period?: Period;
    participant?: BackboneElement;
    reasonCode?: CodeableConcept;
    reasonReference?: Reference;
    managingOrganization?: Reference;
    telecom?: ContactPoint;
    note?: Annotation;
};

export default function(props: Partial<CareTeam_Props>) {
    const resource = {
        resourceType: "CareTeam",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CareTeam</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.participant)) {
        let src = props.participant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.participant = [];

        for (let item of src) {
            let _participant = {
                ...item
            };

            resource.participant.push(_participant);
        }
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.managingOrganization)) {
        if (!Array.isArray(props.managingOrganization)) { props.managingOrganization = [props.managingOrganization]; }
        resource.managingOrganization = dt.reference(props.managingOrganization);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CareTeam"]
    };

    return resource;
}
