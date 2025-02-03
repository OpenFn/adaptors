
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type EpisodeOfCare_Props = {
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
    statusHistory?: BackboneElement;
    type?: CodeableConcept;
    diagnosis?: BackboneElement;
    patient?: Reference;
    managingOrganization?: Reference;
    period?: Period;
    referralRequest?: Reference;
    careManager?: Reference;
    team?: Reference;
    account?: Reference;
};

export default function(props: Partial<EpisodeOfCare_Props>) {
    const resource = {
        resourceType: "EpisodeOfCare",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>EpisodeOfCare</b></p></div>"
        },

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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"]
    };

    return resource;
}
