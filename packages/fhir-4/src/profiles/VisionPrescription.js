
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "VisionPrescription",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>VisionPrescription</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = util.reference(props.patient);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.dateWritten)) {
        resource.dateWritten = props.dateWritten;
    }

    if (!_.isNil(props.prescriber)) {
        resource.prescriber = util.reference(props.prescriber);
    }

    if (!_.isNil(props.lensSpecification)) {
        let src = props.lensSpecification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.lensSpecification = [];

        for (let item of src) {
            let _lensSpecification = {};

            if (!_.isNil(item.id)) {
                _lensSpecification.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _lensSpecification.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.product)) {
                _lensSpecification.product = item.product;
            }

            if (!_.isNil(item.eye)) {
                _lensSpecification.eye = item.eye;
            }

            if (!_.isNil(item.sphere)) {
                _lensSpecification.sphere = item.sphere;
            }

            if (!_.isNil(item.cylinder)) {
                _lensSpecification.cylinder = item.cylinder;
            }

            if (!_.isNil(item.axis)) {
                _lensSpecification.axis = item.axis;
            }

            if (!_.isNil(item.prism)) {
                _lensSpecification.prism = item.prism;
            }

            if (!_.isNil(item.add)) {
                _lensSpecification.add = item.add;
            }

            if (!_.isNil(item.power)) {
                _lensSpecification.power = item.power;
            }

            if (!_.isNil(item.backCurve)) {
                _lensSpecification.backCurve = item.backCurve;
            }

            if (!_.isNil(item.diameter)) {
                _lensSpecification.diameter = item.diameter;
            }

            if (!_.isNil(item.duration)) {
                _lensSpecification.duration = item.duration;
            }

            if (!_.isNil(item.color)) {
                _lensSpecification.color = item.color;
            }

            if (!_.isNil(item.brand)) {
                _lensSpecification.brand = item.brand;
            }

            if (!_.isNil(item.note)) {
                _lensSpecification.note = item.note;
            }

            resource.lensSpecification.push(_lensSpecification);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/VisionPrescription"]
    };

    return resource;
}
