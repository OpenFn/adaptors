
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type CoverageEligibilityRequest_Props = {
    contained?: any[];
    created?: string;
    enterer?: string | FHIR.Reference;
    extension?: FHIR.Extension[];
    facility?: string | FHIR.Reference;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    insurance?: FHIR.BackboneElement[];
    insurer?: string | FHIR.Reference;
    item?: FHIR.BackboneElement[];
    language?: string;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    patient?: string | FHIR.Reference;
    priority?: string[] | FHIR.CodeableConcept;
    provider?: string | FHIR.Reference;
    purpose?: string[];
    serviced?: string | FHIR.Period;
    status?: string;
    supportingInfo?: FHIR.BackboneElement[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<CoverageEligibilityRequest_Props>) {
    const resource = {
        resourceType: "CoverageEligibilityRequest",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.priority)) {
        resource.priority = dt.concept(props.priority);
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.serviced)) {
        delete resource.serviced;
        dt.composite(resource, "serviced", props.serviced);
    }

    if (!_.isNil(props.enterer)) {
        resource.enterer = dt.reference(props.enterer);
    }

    if (!_.isNil(props.provider)) {
        resource.provider = dt.reference(props.provider);
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = dt.reference(props.insurer);
    }

    if (!_.isNil(props.facility)) {
        resource.facility = dt.reference(props.facility);
    }

    if (!_.isNil(props.supportingInfo)) {
        let src = props.supportingInfo;
        if (!Array.isArray(src)) { src = [src]; }
        resource.supportingInfo = [];

        for (let item of src) {
            let _supportingInfo = {
                ...item
            };

            resource.supportingInfo.push(_supportingInfo);
        }
    }

    if (!_.isNil(props.insurance)) {
        let src = props.insurance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.insurance = [];

        for (let item of src) {
            let _insurance = {
                ...item
            };

            resource.insurance.push(_insurance);
        }
    }

    if (!_.isNil(props.item)) {
        let src = props.item;
        if (!Array.isArray(src)) { src = [src]; }
        resource.item = [];

        for (let item of src) {
            let _item = {
                ...item
            };

            resource.item.push(_item);
        }
    }

    return resource;
}
