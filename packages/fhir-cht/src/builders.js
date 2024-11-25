
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "./utils.js";
import _ from "lodash";

/**
  * Create a FHIR Patient resource.
  * @public
  * @function
  * @param {string} type - The profile id for the resource variant
  * @param props - Properties to apply to the resource
 */
export function patient(type, props) {
    const mappings = {
        "fr-core-patient": patient_fr_core_patient,
        "fr-core-patient-ins": patient_fr_core_patient_ins
    };

    return mappings[type](props)
}

function patient_fr_core_patient(props) {
    const resource = {
        resourceType: "Patient",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Patient</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.implicitRules)) {
        resource.implicitRules = props.implicitRules;
    }

    if (!_.isNil(props.language)) {
        resource.language = props.language;
    }

    if (!_.isNil(props.text)) {
        resource.text = props.text;
    }

    if (!_.isNil(props.contained)) {
        resource.contained = props.contained;
    }

    if (!_.isNil(props.extension)) {
        let src = props.extension;
        if (!Array.isArray(src)) { src = [src]; }
        resource.extension = [];

        for (let item of src) {
            let _extension = {};

            if (!_.isNil(item.id)) {
                _extension.id = item.id;
            }

            if (!_.isNil(item.url)) {
                _extension.url = item.url;
            }

            if (!_.isNil(item.value)) {
                _extension.value = item.value;
            }

            resource.extension.push(_extension);
        }
    }

    if (!_.isNil(props.modifierExtension)) {
        resource.modifierExtension = props.modifierExtension;
    }

    if (!_.isNil(props.identifier)) {
        let src = props.identifier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.identifier = [];

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.name)) {
        let src = props.name;
        if (!Array.isArray(src)) { src = [src]; }
        resource.name = [];

        for (let item of src) {
            let _name = {};

            if (!_.isNil(item.id)) {
                _name.id = item.id;
            }

            if (!_.isNil(item["birth-list-given-name"])) {
                util.addExtension(
                    _name,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-birth-list-given-name",
                    item["birth-list-given-name"]
                );
            }

            if (!_.isNil(item.use)) {
                _name.use = item.use;
            }

            if (!_.isNil(item.text)) {
                _name.text = item.text;
            }

            if (!_.isNil(item.family)) {
                _name.family = item.family;
            }

            if (!_.isNil(item.given)) {
                _name.given = item.given;
            }

            if (!_.isNil(item.prefix)) {
                _name.prefix = item.prefix;
            }

            if (!_.isNil(item.suffix)) {
                _name.suffix = item.suffix;
            }

            if (!_.isNil(item.period)) {
                _name.period = item.period;
            }

            resource.name.push(_name);
        }
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.gender)) {
        resource.gender = props.gender;
    }

    if (!_.isNil(props.birthDate)) {
        resource.birthDate = props.birthDate;
    }

    if (!_.isNil(props.deceased)) {
        util.composite(resource, "deceased", props.deceased);
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.maritalStatus)) {
        resource.maritalStatus = props.maritalStatus;
    }

    if (!_.isNil(props.multipleBirth)) {
        util.composite(resource, "multipleBirth", props.multipleBirth);
    }

    if (!_.isNil(props.photo)) {
        resource.photo = props.photo;
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (let item of src) {
            let _contact = {};

            if (!_.isNil(item.id)) {
                _contact.id = item.id;
            }

            if (!_.isNil(item.contactIdentifier)) {
                util.addExtension(
                    _contact,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-contact-identifier",
                    item.contactIdentifier
                );
            }

            if (!_.isNil(item.comment)) {
                util.addExtension(
                    _contact,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-comment",
                    item.comment
                );
            }

            if (!_.isNil(item.modifierExtension)) {
                _contact.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.relationship)) {
                _contact.relationship = item.relationship;
            }

            if (!_.isNil(item.name)) {
                _contact.name = item.name;
            }

            if (!_.isNil(item.telecom)) {
                _contact.telecom = item.telecom;
            }

            if (!_.isNil(item.address)) {
                _contact.address = item.address;
            }

            if (!_.isNil(item.gender)) {
                _contact.gender = item.gender;
            }

            if (!_.isNil(item.organization)) {
                _contact.organization = item.organization;
            }

            if (!_.isNil(item.period)) {
                _contact.period = item.period;
            }

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.communication)) {
        let src = props.communication;
        if (!Array.isArray(src)) { src = [src]; }
        resource.communication = [];

        for (let item of src) {
            let _communication = {};

            if (!_.isNil(item.id)) {
                _communication.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _communication.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.language)) {
                _communication.language = item.language;
            }

            if (!_.isNil(item.preferred)) {
                _communication.preferred = item.preferred;
            }

            resource.communication.push(_communication);
        }
    }

    if (!_.isNil(props.generalPractitioner)) {
        if (!Array.isArray(props.generalPractitioner)) { props.generalPractitioner = [props.generalPractitioner]; }
        resource.generalPractitioner = util.reference(props.generalPractitioner);
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = util.reference(props.managingOrganization);
    }

    if (!_.isNil(props.link)) {
        let src = props.link;
        if (!Array.isArray(src)) { src = [src]; }
        resource.link = [];

        for (let item of src) {
            let _link = {};

            if (!_.isNil(item.id)) {
                _link.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _link.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.other)) {
                _link.other = item.other;
            }

            if (!_.isNil(item.type)) {
                _link.type = item.type;
            }

            resource.link.push(_link);
        }
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient"]
    };

    return resource;
}

function patient_fr_core_patient_ins(props) {
    const resource = {
        resourceType: "Patient",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Patient</b></p></div>"
        }
    };

    if (!_.isNil(props.id)) {
        resource.id = props.id;
    }

    if (!_.isNil(props.implicitRules)) {
        resource.implicitRules = props.implicitRules;
    }

    if (!_.isNil(props.language)) {
        resource.language = props.language;
    }

    if (!_.isNil(props.text)) {
        resource.text = props.text;
    }

    if (!_.isNil(props.contained)) {
        resource.contained = props.contained;
    }

    if (!_.isNil(props.extension)) {
        let src = props.extension;
        if (!Array.isArray(src)) { src = [src]; }
        resource.extension = [];

        for (let item of src) {
            let _extension = {};

            if (!_.isNil(item.id)) {
                _extension.id = item.id;
            }

            if (!_.isNil(item.url)) {
                _extension.url = item.url;
            }

            if (!_.isNil(item.value)) {
                _extension.value = item.value;
            }

            resource.extension.push(_extension);
        }
    }

    if (!_.isNil(props.modifierExtension)) {
        resource.modifierExtension = props.modifierExtension;
    }

    if (!_.isNil(props.identifier)) {
        let src = props.identifier;
        if (!Array.isArray(src)) { src = [src]; }
        resource.identifier = [];

        for (let item of src) {
            let _identifier = {};

            if (!_.isNil(item.id)) {
                _identifier.id = item.id;
            }

            if (!_.isNil(item.use)) {
                _identifier.use = item.use;
            }

            if (!_.isNil(item.type)) {
                _identifier.type = item.type;
            }

            if (!_.isNil(item.system)) {
                _identifier.system = item.system;
            }

            if (!_.isNil(item.value)) {
                _identifier.value = item.value;
            }

            if (!_.isNil(item.period)) {
                _identifier.period = item.period;
            }

            if (!_.isNil(item.assigner)) {
                _identifier.assigner = item.assigner;
            }

            _identifier = util.mapSystems(_identifier);
            resource.identifier.push(_identifier);
        }
    } else {
        resource.identifier = {"system":"urn:oid:1.2.250.1.213.1.4.8"};
    }

    if (!_.isNil(props.active)) {
        resource.active = props.active;
    }

    if (!_.isNil(props.name)) {
        let src = props.name;
        if (!Array.isArray(src)) { src = [src]; }
        resource.name = [];

        for (let item of src) {
            let _name = {};

            if (!_.isNil(item.id)) {
                _name.id = item.id;
            }

            if (!_.isNil(item["birth-list-given-name"])) {
                util.addExtension(
                    _name,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-birth-list-given-name",
                    item["birth-list-given-name"]
                );
            }

            if (!_.isNil(item.use)) {
                _name.use = item.use;
            }

            if (!_.isNil(item.text)) {
                _name.text = item.text;
            }

            if (!_.isNil(item.family)) {
                _name.family = item.family;
            }

            if (!_.isNil(item.given)) {
                _name.given = item.given;
            }

            if (!_.isNil(item.prefix)) {
                _name.prefix = item.prefix;
            }

            if (!_.isNil(item.suffix)) {
                _name.suffix = item.suffix;
            }

            if (!_.isNil(item.period)) {
                _name.period = item.period;
            }

            resource.name.push(_name);
        }
    }

    if (!_.isNil(props.telecom)) {
        resource.telecom = props.telecom;
    }

    if (!_.isNil(props.gender)) {
        resource.gender = props.gender;
    }

    if (!_.isNil(props.birthDate)) {
        resource.birthDate = props.birthDate;
    }

    if (!_.isNil(props.deceased)) {
        util.composite(resource, "deceased", props.deceased);
    }

    if (!_.isNil(props.address)) {
        resource.address = props.address;
    }

    if (!_.isNil(props.maritalStatus)) {
        resource.maritalStatus = props.maritalStatus;
    }

    if (!_.isNil(props.multipleBirth)) {
        util.composite(resource, "multipleBirth", props.multipleBirth);
    }

    if (!_.isNil(props.photo)) {
        resource.photo = props.photo;
    }

    if (!_.isNil(props.contact)) {
        let src = props.contact;
        if (!Array.isArray(src)) { src = [src]; }
        resource.contact = [];

        for (let item of src) {
            let _contact = {};

            if (!_.isNil(item.id)) {
                _contact.id = item.id;
            }

            if (!_.isNil(item.contactIdentifier)) {
                util.addExtension(
                    _contact,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-contact-identifier",
                    item.contactIdentifier
                );
            }

            if (!_.isNil(item.comment)) {
                util.addExtension(
                    _contact,
                    "https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-comment",
                    item.comment
                );
            }

            if (!_.isNil(item.modifierExtension)) {
                _contact.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.relationship)) {
                _contact.relationship = item.relationship;
            }

            if (!_.isNil(item.name)) {
                _contact.name = item.name;
            }

            if (!_.isNil(item.telecom)) {
                _contact.telecom = item.telecom;
            }

            if (!_.isNil(item.address)) {
                _contact.address = item.address;
            }

            if (!_.isNil(item.gender)) {
                _contact.gender = item.gender;
            }

            if (!_.isNil(item.organization)) {
                _contact.organization = item.organization;
            }

            if (!_.isNil(item.period)) {
                _contact.period = item.period;
            }

            resource.contact.push(_contact);
        }
    }

    if (!_.isNil(props.communication)) {
        let src = props.communication;
        if (!Array.isArray(src)) { src = [src]; }
        resource.communication = [];

        for (let item of src) {
            let _communication = {};

            if (!_.isNil(item.id)) {
                _communication.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _communication.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.language)) {
                _communication.language = item.language;
            }

            if (!_.isNil(item.preferred)) {
                _communication.preferred = item.preferred;
            }

            resource.communication.push(_communication);
        }
    }

    if (!_.isNil(props.generalPractitioner)) {
        if (!Array.isArray(props.generalPractitioner)) { props.generalPractitioner = [props.generalPractitioner]; }
        resource.generalPractitioner = util.reference(props.generalPractitioner);
    }

    if (!_.isNil(props.managingOrganization)) {
        resource.managingOrganization = util.reference(props.managingOrganization);
    }

    if (!_.isNil(props.link)) {
        let src = props.link;
        if (!Array.isArray(src)) { src = [src]; }
        resource.link = [];

        for (let item of src) {
            let _link = {};

            if (!_.isNil(item.id)) {
                _link.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _link.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.other)) {
                _link.other = item.other;
            }

            if (!_.isNil(item.type)) {
                _link.type = item.type;
            }

            resource.link.push(_link);
        }
    }

    resource.meta = {
        profile: ["https://hl7.fr/ig/fhir/core/StructureDefinition/fr-core-patient-ins"]
    };

    return resource;
}
