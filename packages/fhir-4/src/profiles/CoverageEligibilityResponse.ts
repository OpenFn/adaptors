
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type CoverageEligibilityResponse_Props = {
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
    purpose?: any;
    patient?: any;
    serviced?: any;
    created?: any;
    requestor?: any;
    request?: any;
    outcome?: any;
    disposition?: any;
    insurer?: any;
    insurance?: any;
    preAuthRef?: any;
    form?: any;
    error?: any;
};

export default function(props: Partial<CoverageEligibilityResponse_Props>) {
    const resource = {
        resourceType: "CoverageEligibilityResponse",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CoverageEligibilityResponse</b></p></div>"
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

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.serviced)) {
        dt.composite(resource, "serviced", props.serviced);
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.requestor)) {
        resource.requestor = dt.reference(props.requestor);
    }

    if (!_.isNil(props.request)) {
        resource.request = dt.reference(props.request);
    }

    if (!_.isNil(props.outcome)) {
        resource.outcome = props.outcome;
    }

    if (!_.isNil(props.disposition)) {
        resource.disposition = props.disposition;
    }

    if (!_.isNil(props.insurer)) {
        resource.insurer = dt.reference(props.insurer);
    }

    if (!_.isNil(props.insurance)) {
        let src = props.insurance;
        if (!Array.isArray(src)) { src = [src]; }
        resource.insurance = [];

        for (let item of src) {
            let _insurance = {};

            if (!_.isNil(item.id)) {
                _insurance.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _insurance.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.coverage)) {
                _insurance.coverage = item.coverage;
            }

            if (!_.isNil(item.inforce)) {
                _insurance.inforce = item.inforce;
            }

            if (!_.isNil(item.benefitPeriod)) {
                _insurance.benefitPeriod = item.benefitPeriod;
            }

            if (!_.isNil(item.item)) {
                _insurance.item = item.item;
            }

            resource.insurance.push(_insurance);
        }
    }

    if (!_.isNil(props.preAuthRef)) {
        resource.preAuthRef = props.preAuthRef;
    }

    if (!_.isNil(props.form)) {
        resource.form = props.form;
    }

    if (!_.isNil(props.error)) {
        let src = props.error;
        if (!Array.isArray(src)) { src = [src]; }
        resource.error = [];

        for (let item of src) {
            let _error = {};

            if (!_.isNil(item.id)) {
                _error.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _error.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _error.code = item.code;
            }

            resource.error.push(_error);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CoverageEligibilityResponse"]
    };

    return resource;
}
