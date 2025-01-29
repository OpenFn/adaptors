
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type FamilyMemberHistory_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    instantiatesCanonical?: any;
    instantiatesUri?: any;
    status?: any;
    dataAbsentReason?: any;
    patient?: any;
    date?: any;
    name?: any;
    relationship?: any;
    sex?: any;
    born?: any;
    age?: any;
    estimatedAge?: any;
    deceased?: any;
    reasonCode?: any;
    reasonReference?: any;
    note?: any;
    condition?: any;
};

export default function(props: Partial<FamilyMemberHistory_Props>) {
    const resource = {
        resourceType: "FamilyMemberHistory",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>FamilyMemberHistory</b></p></div>"
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

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = props.instantiatesCanonical;
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.relationship)) {
        resource.relationship = props.relationship;
    }

    if (!_.isNil(props.sex)) {
        resource.sex = props.sex;
    }

    if (!_.isNil(props.born)) {
        dt.composite(resource, "born", props.born);
    }

    if (!_.isNil(props.age)) {
        dt.composite(resource, "age", props.age);
    }

    if (!_.isNil(props.estimatedAge)) {
        resource.estimatedAge = props.estimatedAge;
    }

    if (!_.isNil(props.deceased)) {
        dt.composite(resource, "deceased", props.deceased);
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

    if (!_.isNil(props.condition)) {
        let src = props.condition;
        if (!Array.isArray(src)) { src = [src]; }
        resource.condition = [];

        for (let item of src) {
            let _condition = {};

            if (!_.isNil(item.id)) {
                _condition.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _condition.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _condition.code = item.code;
            }

            if (!_.isNil(item.outcome)) {
                _condition.outcome = item.outcome;
            }

            if (!_.isNil(item.contributedToDeath)) {
                _condition.contributedToDeath = item.contributedToDeath;
            }

            if (!_.isNil(item.onset)) {
                _condition.onset = item.onset;
            }

            if (!_.isNil(item.note)) {
                _condition.note = item.note;
            }

            resource.condition.push(_condition);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/FamilyMemberHistory"]
    };

    return resource;
}
