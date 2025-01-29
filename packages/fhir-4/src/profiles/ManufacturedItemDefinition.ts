
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type ManufacturedItemDefinition_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    status?: any;
    manufacturedDoseForm?: any;
    unitOfPresentation?: any;
    manufacturer?: any;
    ingredient?: any;
    property?: any;
};

export default function(props: Partial<ManufacturedItemDefinition_Props>) {
    const resource = {
        resourceType: "ManufacturedItemDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ManufacturedItemDefinition</b></p></div>"
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

    if (!_.isNil(props.manufacturedDoseForm)) {
        resource.manufacturedDoseForm = props.manufacturedDoseForm;
    }

    if (!_.isNil(props.unitOfPresentation)) {
        resource.unitOfPresentation = props.unitOfPresentation;
    }

    if (!_.isNil(props.manufacturer)) {
        if (!Array.isArray(props.manufacturer)) { props.manufacturer = [props.manufacturer]; }
        resource.manufacturer = dt.reference(props.manufacturer);
    }

    if (!_.isNil(props.ingredient)) {
        resource.ingredient = props.ingredient;
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

            resource.property.push(_property);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ManufacturedItemDefinition"]
    };

    return resource;
}
