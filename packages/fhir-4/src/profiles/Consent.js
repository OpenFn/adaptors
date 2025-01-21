
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Consent",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Consent</b></p></div>"
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

    if (!_.isNil(props.scope)) {
        resource.scope = props.scope;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.dateTime)) {
        resource.dateTime = props.dateTime;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.organization)) {
        if (!Array.isArray(props.organization)) { props.organization = [props.organization]; }
        resource.organization = dt.reference(props.organization);
    }

    if (!_.isNil(props.source)) {
        dt.composite(resource, "source", props.source);
    }

    if (!_.isNil(props.policy)) {
        let src = props.policy;
        if (!Array.isArray(src)) { src = [src]; }
        resource.policy = [];

        for (let item of src) {
            let _policy = {};

            if (!_.isNil(item.id)) {
                _policy.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _policy.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.authority)) {
                _policy.authority = item.authority;
            }

            if (!_.isNil(item.uri)) {
                _policy.uri = item.uri;
            }

            resource.policy.push(_policy);
        }
    }

    if (!_.isNil(props.policyRule)) {
        resource.policyRule = props.policyRule;
    }

    if (!_.isNil(props.verification)) {
        let src = props.verification;
        if (!Array.isArray(src)) { src = [src]; }
        resource.verification = [];

        for (let item of src) {
            let _verification = {};

            if (!_.isNil(item.id)) {
                _verification.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _verification.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.verified)) {
                _verification.verified = item.verified;
            }

            if (!_.isNil(item.verifiedWith)) {
                _verification.verifiedWith = item.verifiedWith;
            }

            if (!_.isNil(item.verificationDate)) {
                _verification.verificationDate = item.verificationDate;
            }

            resource.verification.push(_verification);
        }
    }

    if (!_.isNil(props.provision)) {
        let src = props.provision;
        let _provision = {};

        if (!_.isNil(src.id)) {
            _provision.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _provision.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _provision.type = src.type;
        }

        if (!_.isNil(src.period)) {
            _provision.period = src.period;
        }

        if (!_.isNil(src.actor)) {
            _provision.actor = src.actor;
        }

        if (!_.isNil(src.action)) {
            _provision.action = src.action;
        }

        if (!_.isNil(src.securityLabel)) {
            _provision.securityLabel = src.securityLabel;
        }

        if (!_.isNil(src.purpose)) {
            _provision.purpose = src.purpose;
        }

        if (!_.isNil(src.class)) {
            _provision.class = src.class;
        }

        if (!_.isNil(src.code)) {
            _provision.code = src.code;
        }

        if (!_.isNil(src.dataPeriod)) {
            _provision.dataPeriod = src.dataPeriod;
        }

        if (!_.isNil(src.data)) {
            _provision.data = src.data;
        }

        resource.provision = _provision;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Consent"]
    };

    return resource;
}
