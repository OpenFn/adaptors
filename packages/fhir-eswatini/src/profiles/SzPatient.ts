
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import _ from "lodash";
import { b as dt } from "@openfn/language-fhir-4";
import type { builders as FHIR } from "@openfn/language-fhir-4";
type MaybeArray<T> = T | T[];

export type Patient_SzPatient_Props = {
    active?: boolean;
    address?: FHIR.Address[];
    birthDate?: string;
    chiefdom?: FHIR.Extension[];
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
    inkhundla?: FHIR.Extension[];
    language?: string;
    link?: FHIR.BackboneElement[];
    managingOrganization?: FHIR.Reference;
    maritalStatus?: FHIR.CodeableConcept;
    meta?: FHIR.Meta;
    modifierExtension?: FHIR.Extension[];
    multipleBirth?: boolean | number;
    name?: FHIR.HumanName[];
    nationality?: FHIR.Extension[];
    photo?: FHIR.Attachment[];
    registrationDate?: FHIR.Extension[];
    telecom?: FHIR.ContactPoint[];
    text?: FHIR.Narrative;
    [key: string]: any;
};

export default function(props: Partial<Patient_SzPatient_Props>) {
    const resource = {
        resourceType: "Patient",

        meta: {
            profile: ["https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzPatient"]
        },

        ...props
    };

    if (!_.isNil(props.nationality)) {
        let src = props.nationality;
        delete resource.nationality;

        dt.addExtension(
            resource,
            "http://hl7.org/fhir/StructureDefinition/patient-nationality|5.2.0",
            src
        );
    }

    if (!_.isNil(props.inkhundla)) {
        let src = props.inkhundla;
        delete resource.inkhundla;

        dt.addExtension(
            resource,
            "https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzInkhundlaExtension|0.1.0",
            src
        );
    }

    if (!_.isNil(props.chiefdom)) {
        let src = props.chiefdom;
        delete resource.chiefdom;

        dt.addExtension(
            resource,
            "https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzChiefdomExtension|0.1.0",
            src
        );
    }

    if (!_.isNil(props.registrationDate)) {
        let src = props.registrationDate;
        delete resource.registrationDate;

        dt.addExtension(
            resource,
            "https://hapifhir.eswatinihie.com/fhir/StructureDefinition/SzRegistrationDate|0.1.0",
            src
        );
    }

    if (!_.isNil(props.identifier)) {
        let src = props.identifier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.identifier = [];

        for (let item of src) {
            let _identifier = dt.identifier(item, [], {
                "use": "http://hl7.org/fhir/ValueSet/identifier-use|4.0.1",
                "type": "https://hapifhir.eswatinihie.com/fhir/ValueSet/PersonIdentifiersVS|0.1.0"
            });

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

            resource.name.push(_name);
        }
    }

    if (!_.isNil(props.deceased)) {
        delete resource.deceased;
        dt.composite(resource, "deceased", props.deceased);
    }

    if (!_.isNil(props.address)) {
        let src = props.address;
        if (!Array.isArray(src)) { src = [src]; }
        resource.address = [];

        for (let item of src) {
            let _address = {
                ...item
            };

            resource.address.push(_address);
        }
    }

    if (!_.isNil(props.maritalStatus)) {
        resource.maritalStatus = dt.concept(
            dt.lookupValue("http://hl7.org/fhir/ValueSet/marital-status|4.0.1", props.maritalStatus)
        );

        dt.ensureConceptText(resource.maritalStatus);
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
