
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "AdministrableProductDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>AdministrableProductDefinition</b></p></div>"
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
        resource.extension = props.extension;
    }

    if (!_.isNil(props.modifierExtension)) {
        resource.modifierExtension = props.modifierExtension;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.formOf)) {
        if (!Array.isArray(props.formOf)) { props.formOf = [props.formOf]; }
        resource.formOf = dt.reference(props.formOf);
    }

    if (!_.isNil(props.administrableDoseForm)) {
        resource.administrableDoseForm = props.administrableDoseForm;
    }

    if (!_.isNil(props.unitOfPresentation)) {
        resource.unitOfPresentation = props.unitOfPresentation;
    }

    if (!_.isNil(props.producedFrom)) {
        if (!Array.isArray(props.producedFrom)) { props.producedFrom = [props.producedFrom]; }
        resource.producedFrom = dt.reference(props.producedFrom);
    }

    if (!_.isNil(props.ingredient)) {
        resource.ingredient = props.ingredient;
    }

    if (!_.isNil(props.device)) {
        resource.device = dt.reference(props.device);
    }

    if (!_.isNil(props.property)) {
        let src = props.property;
        if (!Array.isArray(src)) { src = [src]; }
        resource.property = [];

        for (let item of src) {
            let _property = {};

            if (!_.isNil(item.id)) {
                _property.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _property.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _property.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _property.value = item.value;
            }

            if (!_.isNil(item.status)) {
                _property.status = item.status;
            }

            resource.property.push(_property);
        }
    }

    if (!_.isNil(props.routeOfAdministration)) {
        let src = props.routeOfAdministration;
        if (!Array.isArray(src)) { src = [src]; }
        resource.routeOfAdministration = [];

        for (let item of src) {
            let _routeOfAdministration = {};

            if (!_.isNil(item.id)) {
                _routeOfAdministration.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _routeOfAdministration.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _routeOfAdministration.code = item.code;
            }

            if (!_.isNil(item.firstDose)) {
                _routeOfAdministration.firstDose = item.firstDose;
            }

            if (!_.isNil(item.maxSingleDose)) {
                _routeOfAdministration.maxSingleDose = item.maxSingleDose;
            }

            if (!_.isNil(item.maxDosePerDay)) {
                _routeOfAdministration.maxDosePerDay = item.maxDosePerDay;
            }

            if (!_.isNil(item.maxDosePerTreatmentPeriod)) {
                _routeOfAdministration.maxDosePerTreatmentPeriod = item.maxDosePerTreatmentPeriod;
            }

            if (!_.isNil(item.maxTreatmentPeriod)) {
                _routeOfAdministration.maxTreatmentPeriod = item.maxTreatmentPeriod;
            }

            if (!_.isNil(item.targetSpecies)) {
                _routeOfAdministration.targetSpecies = item.targetSpecies;
            }

            resource.routeOfAdministration.push(_routeOfAdministration);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/AdministrableProductDefinition"]
    };

    return resource;
}
