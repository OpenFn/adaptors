
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type OrganizationAffiliation_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: Array<string | FHIR.Identifier>;
    active?: boolean;
    period?: FHIR.Period;
    organization?: string | FHIR.Reference;
    participatingOrganization?: string | FHIR.Reference;
    network?: Array<string | FHIR.Reference>;
    code?: Array<string[] | FHIR.CodeableConcept>;
    specialty?: Array<string[] | FHIR.CodeableConcept>;
    location?: Array<string | FHIR.Reference>;
    healthcareService?: Array<string | FHIR.Reference>;
    telecom?: FHIR.ContactPoint[];
    endpoint?: Array<string | FHIR.Reference>;
    initialiser?: any;
    typeShorthands?: any;
    [key: string]: any;
};

export default function(props: Partial<OrganizationAffiliation_Props>) {
    const resource = {
        resourceType: "OrganizationAffiliation",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.organization)) {
        resource.organization = dt.reference(props.organization);
    }

    if (!_.isNil(props.participatingOrganization)) {
        resource.participatingOrganization = dt.reference(props.participatingOrganization);
    }

    if (!_.isNil(props.network)) {
        if (!Array.isArray(props.network)) { props.network = [props.network]; }
        resource.network = dt.reference(props.network);
    }

    if (!_.isNil(props.location)) {
        if (!Array.isArray(props.location)) { props.location = [props.location]; }
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.healthcareService)) {
        if (!Array.isArray(props.healthcareService)) { props.healthcareService = [props.healthcareService]; }
        resource.healthcareService = dt.reference(props.healthcareService);
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = dt.reference(props.endpoint);
    }

    return resource;
}
