
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type CareTeam_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: Array<string | FHIR.Identifier>;
    status?: string;
    category?: Array<string[] | FHIR.CodeableConcept>;
    name?: string;
    subject?: string | FHIR.Reference;
    encounter?: string | FHIR.Reference;
    period?: FHIR.Period;
    participant?: FHIR.BackboneElement[];
    reasonCode?: Array<string[] | FHIR.CodeableConcept>;
    reasonReference?: Array<string | FHIR.Reference>;
    managingOrganization?: Array<string | FHIR.Reference>;
    telecom?: FHIR.ContactPoint[];
    note?: FHIR.Annotation[];
    initialiser?: any;
    typeShorthands?: any;
    [key: string]: any;
};

export default function(props: Partial<CareTeam_Props>) {
    const resource = {
        resourceType: "CareTeam",
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

    return resource;
}
