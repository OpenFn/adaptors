
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type SpecimenDefinition_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    typeCollected?: any;
    patientPreparation?: any;
    timeAspect?: any;
    collection?: any;
    typeTested?: any;
};

export default function(props: Partial<SpecimenDefinition_Props>) {
    const resource = {
        resourceType: "SpecimenDefinition",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SpecimenDefinition</b></p></div>"
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
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.typeCollected)) {
        resource.typeCollected = props.typeCollected;
    }

    if (!_.isNil(props.patientPreparation)) {
        resource.patientPreparation = props.patientPreparation;
    }

    if (!_.isNil(props.timeAspect)) {
        resource.timeAspect = props.timeAspect;
    }

    if (!_.isNil(props.collection)) {
        resource.collection = props.collection;
    }

    if (!_.isNil(props.typeTested)) {
        let src = props.typeTested;
        if (!Array.isArray(src)) { src = [src]; }
        resource.typeTested = [];

        for (let item of src) {
            let _typeTested = {};

            if (!_.isNil(item.id)) {
                _typeTested.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _typeTested.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.isDerived)) {
                _typeTested.isDerived = item.isDerived;
            }

            if (!_.isNil(item.type)) {
                _typeTested.type = item.type;
            }

            if (!_.isNil(item.preference)) {
                _typeTested.preference = item.preference;
            }

            if (!_.isNil(item.container)) {
                _typeTested.container = item.container;
            }

            if (!_.isNil(item.requirement)) {
                _typeTested.requirement = item.requirement;
            }

            if (!_.isNil(item.retentionTime)) {
                _typeTested.retentionTime = item.retentionTime;
            }

            if (!_.isNil(item.rejectionCriterion)) {
                _typeTested.rejectionCriterion = item.rejectionCriterion;
            }

            if (!_.isNil(item.handling)) {
                _typeTested.handling = item.handling;
            }

            resource.typeTested.push(_typeTested);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SpecimenDefinition"]
    };

    return resource;
}
