
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type CarePlan_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    instantiatesCanonical?: any;
    instantiatesUri?: string;
    basedOn?: Reference;
    replaces?: Reference;
    partOf?: Reference;
    status?: string;
    intent?: string;
    category?: CodeableConcept;
    title?: string;
    description?: string;
    subject?: Reference;
    encounter?: Reference;
    period?: Period;
    created?: string;
    author?: Reference;
    contributor?: Reference;
    careTeam?: Reference;
    addresses?: Reference;
    supportingInfo?: Reference;
    goal?: Reference;
    activity?: BackboneElement;
    note?: Annotation;
};

export default function(props: Partial<CarePlan_Props>) {
    const resource = {
        resourceType: "CarePlan",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>CarePlan</b></p></div>"
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

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.replaces)) {
        if (!Array.isArray(props.replaces)) { props.replaces = [props.replaces]; }
        resource.replaces = dt.reference(props.replaces);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.created)) {
        resource.created = props.created;
    }

    if (!_.isNil(props.author)) {
        resource.author = dt.reference(props.author);
    }

    if (!_.isNil(props.contributor)) {
        if (!Array.isArray(props.contributor)) { props.contributor = [props.contributor]; }
        resource.contributor = dt.reference(props.contributor);
    }

    if (!_.isNil(props.careTeam)) {
        if (!Array.isArray(props.careTeam)) { props.careTeam = [props.careTeam]; }
        resource.careTeam = dt.reference(props.careTeam);
    }

    if (!_.isNil(props.addresses)) {
        if (!Array.isArray(props.addresses)) { props.addresses = [props.addresses]; }
        resource.addresses = dt.reference(props.addresses);
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = dt.reference(props.supportingInfo);
    }

    if (!_.isNil(props.goal)) {
        if (!Array.isArray(props.goal)) { props.goal = [props.goal]; }
        resource.goal = dt.reference(props.goal);
    }

    if (!_.isNil(props.activity)) {
        let src = props.activity;
        if (!Array.isArray(src)) { src = [src]; }
        resource.activity = [];

        for (let item of src) {
            let _activity = {};

            if (!_.isNil(item.id)) {
                _activity.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _activity.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.outcomeCodeableConcept)) {
                _activity.outcomeCodeableConcept = item.outcomeCodeableConcept;
            }

            if (!_.isNil(item.outcomeReference)) {
                _activity.outcomeReference = item.outcomeReference;
            }

            if (!_.isNil(item.progress)) {
                _activity.progress = item.progress;
            }

            if (!_.isNil(item.reference)) {
                _activity.reference = item.reference;
            }

            if (!_.isNil(item.detail)) {
                _activity.detail = item.detail;
            }

            resource.activity.push(_activity);
        }
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"]
    };

    return resource;
}
