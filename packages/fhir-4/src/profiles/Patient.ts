
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
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    identifier?: FHIR.Identifier;
    active?: boolean;
    name?: FHIR.HumanName;
    telecom?: FHIR.ContactPoint;
    gender?: string;
    birthDate?: string;
    deceased?: boolean;
    address?: FHIR.Address;
    maritalStatus?: FHIR.CodeableConcept;
    multipleBirth?: boolean;
    photo?: FHIR.Attachment;
    contact?: FHIR.BackboneElement;
    communication?: FHIR.BackboneElement;
    generalPractitioner?: FHIR.Reference;
    managingOrganization?: FHIR.Reference;
    link?: FHIR.BackboneElement;
};

export default function(props: Partial<Patient_Props>) {
    const resource = {
        resourceType: "Patient",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Patient</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.deceased)) {
        dt.composite(resource, "deceased", props.deceased);
    }

    if (!_.isNil(props.multipleBirth)) {
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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Patient"]
    };

    return resource;
}
