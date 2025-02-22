
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Patient_Props = {
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
    name?: FHIR.HumanName[];
    telecom?: FHIR.ContactPoint[];
    gender?: string;
    birthDate?: string;
    deceased?: boolean | string;
    address?: FHIR.Address[];
    maritalStatus?: string[] | FHIR.CodeableConcept;
    multipleBirth?: boolean | number;
    photo?: FHIR.Attachment[];
    contact?: FHIR.BackboneElement[];
    communication?: FHIR.BackboneElement[];
    generalPractitioner?: Array<string | FHIR.Reference>;
    managingOrganization?: string | FHIR.Reference;
    link?: FHIR.BackboneElement[];
    initialiser?: any;
    typeShorthands?: any;
    [key: string]: any;
};

export default function(props: Partial<Patient_Props>) {
    const resource = {
        resourceType: "Patient",
        ...props
    };

    if (!_.isNil(props.deceased)) {
        delete resource.deceased;
        dt.composite(resource, "deceased", props.deceased);
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
