
// THIS FILE WAS AUTO-GENERATED
// DO NOT MODIFY OR YOU WILL BE FIRED

import { builders } from "./Utils.js";

export function patient(type, props) {
    const mappings = {
        "patient": patient_patient
    };

    return mappings[type](props)
}

function patient_patient(props) {
    const resource = {
        resourceType: "Patient"
    };

    if ("address" in props) {
        let src = props.address;
        if (!Array.isArray(src)) { src = [src]; }
        resource.address = [];

        for (const item of src) {
            const address = {};

            if ("id" in item) {
                address.id = item.id;
            }

            if ("residentialType" in item) {
                builders.addExtension(
                    address,
                    "http://moh.gov.et/fhir/hiv/StructureDefinition/residential-type",
                    item.residentialType
                );
            }

            if ("use" in item) {
                address.use = item.use;
            }

            if ("type" in item) {
                address.type = item.type;
            }

            if ("text" in item) {
                address.text = item.text;
            }

            if ("line" in item) {
                address.line = item.line;
            }

            if ("city" in item) {
                address.city = item.city;
            }

            if ("district" in item) {
                address.district = item.district;
            }

            if ("state" in item) {
                address.state = item.state;
            }

            if ("postalCode" in item) {
                address.postalCode = item.postalCode;
            }

            if ("country" in item) {
                address.country = item.country;
            }

            if ("period" in item) {
                address.period = item.period;
            }

            resource.address.push(address);
        }
    }

    if ("religion" in props) {
        builders.addExtension(
            resource,
            "http://hl7.org/fhir/StructureDefinition/patient-religion",
            props.religion
        );
    }

    resource.meta = {
        profile: ["http://moh.gov.et/fhir/hiv/StructureDefinition/patient"]
    };

    return resource;
}