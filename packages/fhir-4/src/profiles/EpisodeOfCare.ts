
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type EpisodeOfCare_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any[];
    extension?: FHIR.Extension[];
    modifierExtension?: FHIR.Extension[];
    identifier?: MaybeArray<string | FHIR.Identifier>;
    status?: string;
    statusHistory?: FHIR.BackboneElement[];
    type?: MaybeArray<string[] | FHIR.CodeableConcept>;
    diagnosis?: FHIR.BackboneElement[];
    patient?: string | FHIR.Reference;
    managingOrganization?: string | FHIR.Reference;
    period?: FHIR.Period;
    referralRequest?: MaybeArray<string | FHIR.Reference>;
    careManager?: string | FHIR.Reference;
    team?: MaybeArray<string | FHIR.Reference>;
    account?: MaybeArray<string | FHIR.Reference>;
    [key: string]: any;
};

export default function(props: Partial<EpisodeOfCare_Props>) {
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

    return resource;
}
