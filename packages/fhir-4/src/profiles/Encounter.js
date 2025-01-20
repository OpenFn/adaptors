
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Encounter",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Encounter</b></p></div>"
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

    if (!_.isNil(props.statusHistory)) {
        let src = props.statusHistory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.statusHistory = [];

        for (let item of src) {
            let _statusHistory = {};

            if (!_.isNil(item.id)) {
                _statusHistory.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _statusHistory.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.status)) {
                _statusHistory.status = item.status;
            }

            if (!_.isNil(item.period)) {
                _statusHistory.period = item.period;
            }

            resource.statusHistory.push(_statusHistory);
        }
    }

    if (!_.isNil(props.class)) {
        resource.class = props.class;
    }

    if (!_.isNil(props.classHistory)) {
        let src = props.classHistory;
        if (!Array.isArray(src)) { src = [src]; }
        resource.classHistory = [];

        for (let item of src) {
            let _classHistory = {};

            if (!_.isNil(item.id)) {
                _classHistory.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _classHistory.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.class)) {
                _classHistory.class = item.class;
            }

            if (!_.isNil(item.period)) {
                _classHistory.period = item.period;
            }

            resource.classHistory.push(_classHistory);
        }
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.serviceType)) {
        resource.serviceType = props.serviceType;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.episodeOfCare)) {
        if (!Array.isArray(props.episodeOfCare)) { props.episodeOfCare = [props.episodeOfCare]; }
        resource.episodeOfCare = util.reference(props.episodeOfCare);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
    }

    if (!_.isNil(props.participant)) {
        let src = props.participant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.participant = [];

        for (let item of src) {
            let _participant = {};

            if (!_.isNil(item.id)) {
                _participant.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _participant.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _participant.type = item.type;
            }

            if (!_.isNil(item.period)) {
                _participant.period = item.period;
            }

            if (!_.isNil(item.individual)) {
                _participant.individual = item.individual;
            }

            resource.participant.push(_participant);
        }
    }

    if (!_.isNil(props.appointment)) {
        if (!Array.isArray(props.appointment)) { props.appointment = [props.appointment]; }
        resource.appointment = util.reference(props.appointment);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.length)) {
        resource.length = props.length;
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = util.reference(props.reasonReference);
    }

    if (!_.isNil(props.diagnosis)) {
        let src = props.diagnosis;
        if (!Array.isArray(src)) { src = [src]; }
        resource.diagnosis = [];

        for (let item of src) {
            let _diagnosis = {};

            if (!_.isNil(item.id)) {
                _diagnosis.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _diagnosis.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.condition)) {
                _diagnosis.condition = item.condition;
            }

            if (!_.isNil(item.use)) {
                _diagnosis.use = item.use;
            }

            if (!_.isNil(item.rank)) {
                _diagnosis.rank = item.rank;
            }

            resource.diagnosis.push(_diagnosis);
        }
    }

    if (!_.isNil(props.account)) {
        if (!Array.isArray(props.account)) { props.account = [props.account]; }
        resource.account = util.reference(props.account);
    }

    if (!_.isNil(props.hospitalization)) {
        let src = props.hospitalization;
        let _hospitalization = {};

        if (!_.isNil(src.id)) {
            _hospitalization.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _hospitalization.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.preAdmissionIdentifier)) {
            _hospitalization.preAdmissionIdentifier = src.preAdmissionIdentifier;
        }

        if (!_.isNil(src.origin)) {
            _hospitalization.origin = src.origin;
        }

        if (!_.isNil(src.admitSource)) {
            _hospitalization.admitSource = src.admitSource;
        }

        if (!_.isNil(src.reAdmission)) {
            _hospitalization.reAdmission = src.reAdmission;
        }

        if (!_.isNil(src.dietPreference)) {
            _hospitalization.dietPreference = src.dietPreference;
        }

        if (!_.isNil(src.specialCourtesy)) {
            _hospitalization.specialCourtesy = src.specialCourtesy;
        }

        if (!_.isNil(src.specialArrangement)) {
            _hospitalization.specialArrangement = src.specialArrangement;
        }

        if (!_.isNil(src.destination)) {
            _hospitalization.destination = src.destination;
        }

        if (!_.isNil(src.dischargeDisposition)) {
            _hospitalization.dischargeDisposition = src.dischargeDisposition;
        }

        resource.hospitalization = _hospitalization;
    }

    if (!_.isNil(props.location)) {
        let src = props.location;
        if (!Array.isArray(src)) { src = [src]; }
        resource.location = [];

        for (let item of src) {
            let _location = {};

            if (!_.isNil(item.id)) {
                _location.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _location.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.location)) {
                _location.location = item.location;
            }

            if (!_.isNil(item.status)) {
                _location.status = item.status;
            }

            if (!_.isNil(item.physicalType)) {
                _location.physicalType = item.physicalType;
            }

            if (!_.isNil(item.period)) {
                _location.period = item.period;
            }

            resource.location.push(_location);
        }
    }

    if (!_.isNil(props.serviceProvider)) {
        resource.serviceProvider = util.reference(props.serviceProvider);
    }

    if (!_.isNil(props.partOf)) {
        resource.partOf = util.reference(props.partOf);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Encounter"]
    };

    return resource;
}
