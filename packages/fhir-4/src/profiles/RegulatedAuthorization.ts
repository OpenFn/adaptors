
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type RegulatedAuthorization_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    subject?: any;
    type?: any;
    description?: any;
    region?: any;
    status?: any;
    statusDate?: any;
    validityPeriod?: any;
    indication?: any;
    intendedUse?: any;
    basis?: any;
    holder?: any;
    regulator?: any;
    case?: any;
};

export default function(props: Partial<RegulatedAuthorization_Props>) {
    const resource = {
        resourceType: "RegulatedAuthorization",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>RegulatedAuthorization</b></p></div>"
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

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.region)) {
        resource.region = props.region;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusDate)) {
        resource.statusDate = props.statusDate;
    }

    if (!_.isNil(props.validityPeriod)) {
        resource.validityPeriod = props.validityPeriod;
    }

    if (!_.isNil(props.indication)) {
        resource.indication = props.indication;
    }

    if (!_.isNil(props.intendedUse)) {
        resource.intendedUse = props.intendedUse;
    }

    if (!_.isNil(props.basis)) {
        resource.basis = props.basis;
    }

    if (!_.isNil(props.holder)) {
        resource.holder = dt.reference(props.holder);
    }

    if (!_.isNil(props.regulator)) {
        resource.regulator = dt.reference(props.regulator);
    }

    if (!_.isNil(props.case)) {
        let src = props.case;
        let _case = {};

        if (!_.isNil(src.id)) {
            _case.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _case.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.identifier)) {
            _case.identifier = src.identifier;
        }

        if (!_.isNil(src.type)) {
            _case.type = src.type;
        }

        if (!_.isNil(src.status)) {
            _case.status = src.status;
        }

        if (!_.isNil(src.date)) {
            _case.date = src.date;
        }

        resource.case = _case;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/RegulatedAuthorization"]
    };

    return resource;
}
