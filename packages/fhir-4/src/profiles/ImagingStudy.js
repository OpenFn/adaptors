
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "ImagingStudy",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ImagingStudy</b></p></div>"
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

    if (!_.isNil(props.modality)) {
        resource.modality = props.modality;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.started)) {
        resource.started = props.started;
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.referrer)) {
        resource.referrer = dt.reference(props.referrer);
    }

    if (!_.isNil(props.interpreter)) {
        if (!Array.isArray(props.interpreter)) { props.interpreter = [props.interpreter]; }
        resource.interpreter = dt.reference(props.interpreter);
    }

    if (!_.isNil(props.endpoint)) {
        if (!Array.isArray(props.endpoint)) { props.endpoint = [props.endpoint]; }
        resource.endpoint = dt.reference(props.endpoint);
    }

    if (!_.isNil(props.numberOfSeries)) {
        resource.numberOfSeries = props.numberOfSeries;
    }

    if (!_.isNil(props.numberOfInstances)) {
        resource.numberOfInstances = props.numberOfInstances;
    }

    if (!_.isNil(props.procedureReference)) {
        resource.procedureReference = dt.reference(props.procedureReference);
    }

    if (!_.isNil(props.procedureCode)) {
        resource.procedureCode = props.procedureCode;
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.series)) {
        let src = props.series;
        if (!Array.isArray(src)) { src = [src]; }
        resource.series = [];

        for (let item of src) {
            let _series = {};

            if (!_.isNil(item.id)) {
                _series.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _series.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.uid)) {
                _series.uid = item.uid;
            }

            if (!_.isNil(item.number)) {
                _series.number = item.number;
            }

            if (!_.isNil(item.modality)) {
                _series.modality = item.modality;
            }

            if (!_.isNil(item.description)) {
                _series.description = item.description;
            }

            if (!_.isNil(item.numberOfInstances)) {
                _series.numberOfInstances = item.numberOfInstances;
            }

            if (!_.isNil(item.endpoint)) {
                _series.endpoint = item.endpoint;
            }

            if (!_.isNil(item.bodySite)) {
                _series.bodySite = item.bodySite;
            }

            if (!_.isNil(item.laterality)) {
                _series.laterality = item.laterality;
            }

            if (!_.isNil(item.specimen)) {
                _series.specimen = item.specimen;
            }

            if (!_.isNil(item.started)) {
                _series.started = item.started;
            }

            if (!_.isNil(item.performer)) {
                _series.performer = item.performer;
            }

            if (!_.isNil(item.instance)) {
                _series.instance = item.instance;
            }

            resource.series.push(_series);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ImagingStudy"]
    };

    return resource;
}
