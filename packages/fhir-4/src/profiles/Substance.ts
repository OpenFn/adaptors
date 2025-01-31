
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Substance_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    status?: string;
    category?: CodeableConcept;
    code?: CodeableConcept;
    description?: string;
    instance?: BackboneElement;
    ingredient?: BackboneElement;
};

export default function(props: Partial<Substance_Props>) {
    const resource = {
        resourceType: "Substance",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Substance</b></p></div>"
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

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.instance)) {
        let src = props.instance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.instance = [];

        for (let item of src) {
            let _instance = {};

            if (!_.isNil(item.id)) {
                _instance.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _instance.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identifier)) {
                _instance.identifier = item.identifier;
            }

            if (!_.isNil(item.expiry)) {
                _instance.expiry = item.expiry;
            }

            if (!_.isNil(item.quantity)) {
                _instance.quantity = item.quantity;
            }

            resource.instance.push(_instance);
        }
    }

    if (!_.isNil(props.ingredient)) {
        let src = props.ingredient;
        if (!Array.isArray(src)) { src = [src]; }
        resource.ingredient = [];

        for (let item of src) {
            let _ingredient = {};

            if (!_.isNil(item.id)) {
                _ingredient.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _ingredient.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.quantity)) {
                _ingredient.quantity = item.quantity;
            }

            if (!_.isNil(item.substance)) {
                _ingredient.substance = item.substance;
            }

            resource.ingredient.push(_ingredient);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Substance"]
    };

    return resource;
}
