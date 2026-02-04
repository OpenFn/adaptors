
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import * as dt from "../datatypes";
import type * as FHIR from "../fhir";
type MaybeArray<T> = T | T[];

export type Patient_Props = {
    active?: boolean;
    address?: FHIR.Address[];
    birthDate?: string;
    communication?: FHIR.BackboneElement[];
    contact?: FHIR.BackboneElement[];
    contained?: any[];
    deceased?: boolean | string;
    extension?: FHIR.Extension[];
    gender?: string;
    generalPractitioner?: MaybeArray<string | FHIR.Reference>;
    id?: string;
    identifier?: MaybeArray<string | FHIR.Identifier>;
    implicitRules?: string;
    language?: string;
    link?: FHIR.BackboneElement[];
    managingOrganization?: string | FHIR.Reference;
    maritalStatus?: string[] | FHIR.CodeableConcept;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    multipleBirth?: boolean | number;
    name?: FHIR.HumanName[];
    photo?: FHIR.Attachment[];
    telecom?: FHIR.ContactPoint[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<Patient_Props>) {
    const resource = {
        resourceType: "Patient",
        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.deceased)) {
        delete resource.deceased;
        dt.composite(resource, "deceased", props.deceased);
    }

    if (!_.isNil(props.maritalStatus)) {
        resource.maritalStatus = dt.concept(props.maritalStatus);
    }

    if (!_.isNil(props.multipleBirth)) {
        delete resource.multipleBirth;
        dt.composite(resource, "multipleBirth", props.multipleBirth);
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

    if (!_.isNil(props.communication)) {
        let src = props.communication;
        if (!Array.isArray(src)) { src = [src]; }
        resource.communication = [];

        for (let item of src) {
            let _communication = {
                ...item
            };

            resource.communication.push(_communication);
        }
    }

    if (!_.isNil(props.generalPractitioner)) {
        if (!Array.isArray(props.generalPractitioner)) { props.generalPractitioner = [props.generalPractitioner]; }
        resource.generalPractitioner = dt.reference(props.generalPractitioner);
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = dt.reference(props.managingOrganization);
    }

    if (!_.isNil(props.link)) {
        let src = props.link;
        if (!Array.isArray(src)) { src = [src]; }
        resource.link = [];

        for (let item of src) {
            let _link = {
                ...item
            };

            resource.link.push(_link);
        }
    }

    return resource;
}
