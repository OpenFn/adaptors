
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type EpisodeOfCare_SzEpisodeOfCare_Props = {
    account?: FHIR.Reference[];
    careManager?: FHIR.Reference;
    contained?: any[];
    diagnosis?: FHIR.BackboneElement[];
    extension?: FHIR.Extension[];
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    language?: string;
    managingOrganization?: FHIR.Reference;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    patient?: FHIR.Reference;
    period?: FHIR.Period;
    referralRequest?: FHIR.Reference[];
    status?: string;
    statusHistory?: FHIR.BackboneElement[];
    team?: FHIR.Reference[];
    text?: FHIR.Narrative;
    type?: FHIR.CodeableConcept[];
    [key: string]: any;
};

export default function(props: Partial<EpisodeOfCare_SzEpisodeOfCare_Props>) {
    const resource = {
        resourceType: "EpisodeOfCare",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.statusHistory)) {
        let src = props.statusHistory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statusHistory = [];

        for (let item of src) {
            let _statusHistory = {
                ...item
            };

            resource.statusHistory.push(_statusHistory);
        }
    }

    if (!_.isNil(props.type)) {
        if (!Array.isArray(props.type)) { props.type = [props.type]; }
        resource.type = dt.concept(props.type);
    }

    if (!_.isNil(props.diagnosis)) {
        let src = props.diagnosis;
        if (!Array.isArray(src)) { src = [src]; }
        resource.diagnosis = [];

        for (let item of src) {
            let _diagnosis = {
                ...item
            };

            resource.diagnosis.push(_diagnosis);
        }
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = dt.reference(props.managingOrganization);
    }

    if (!_.isNil(props.referralRequest)) {
        if (!Array.isArray(props.referralRequest)) { props.referralRequest = [props.referralRequest]; }
        resource.referralRequest = dt.reference(props.referralRequest);
    }

    if (!_.isNil(props.careManager)) {
        resource.careManager = dt.reference(props.careManager);
    }

    if (!_.isNil(props.team)) {
        if (!Array.isArray(props.team)) { props.team = [props.team]; }
        resource.team = dt.reference(props.team);
    }

    if (!_.isNil(props.account)) {
        if (!Array.isArray(props.account)) { props.account = [props.account]; }
        resource.account = dt.reference(props.account);
    }

    resource.meta = {
      profile: [
        `http://172.209.216.154:3447/fhir/StructureDefinition/Sz${resource.resourceType}`,
      ],
    };
    return resource;
}
