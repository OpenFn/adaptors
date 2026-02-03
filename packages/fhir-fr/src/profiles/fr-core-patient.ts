
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";

export type Patient_fr_core_patient_Props = {
    active?: boolean;
    address?: FHIR.Address[];
    birthDate?: string;
    communication?: FHIR.BackboneElement[];
    contact?: FHIR.BackboneElement[];
    contained?: any[];
    deceased?: boolean | string;
    extension?: FHIR.Extension[];
    gender?: string;
    generalPractitioner?: FHIR.Reference[];
    id?: string;
    identifier?: FHIR.Identifier[];
    implicitRules?: string;
    language?: string;
    link?: FHIR.BackboneElement[];
    managingOrganization?: FHIR.Reference;
    maritalStatus?: FHIR.CodeableConcept;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    multipleBirth?: boolean | number;
    name?: FHIR.HumanName[];
    photo?: FHIR.Attachment[];
    telecom?: FHIR.ContactPoint[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<Patient_fr_core_patient_Props>) {
    const resource = {
        resourceType: "Patient",
        ...props
    };

    if (!_.isNil(props.extension)) {
        let src = props.extension;
        if (!Array.isArray(src)) { src = [src]; }
        resource.extension = [];

        for (let item of src) {
            let _extension = {
                ...item
            };

            resource.extension.push(_extension);
        }
    }

    if (!_.isNil(props.identifier)) {
        let src = props.identifier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.identifier = [];

        for (let item of src) {
            let _identifier = {
                ...item
            };

            _identifier = dt.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.name)) {
        let src = props.name;
        if (!Array.isArray(src)) { src = [src]; }
        resource.name = [];

        for (let item of src) {
            let _name = {
                ...item
            };

            if (!_.isNil(item["birth-list-given-name"])) {
                dt.addExtension(
                    _name,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-birth-list-given-name",
                    item["birth-list-given-name"]
                );
            }

            resource.name.push(_name);
        }
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

            if (!_.isNil(item.contactIdentifier)) {
                dt.addExtension(
                    _contact,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-contact-identifier",
                    item.contactIdentifier
                );
            }

            if (!_.isNil(item.comment)) {
                dt.addExtension(
                    _contact,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-comment",
                    item.comment
                );
            }

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
