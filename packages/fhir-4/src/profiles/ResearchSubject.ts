
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type ResearchSubject_Props = {
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
    period?: Period;
    study?: Reference;
    individual?: Reference;
    assignedArm?: string;
    actualArm?: string;
    consent?: Reference;
};

export default function(props: Partial<ResearchSubject_Props>) {
    const resource = {
        resourceType: "ResearchSubject",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ResearchSubject</b></p></div>"
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

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.study)) {
        resource.study = dt.reference(props.study);
    }

    if (!_.isNil(props.individual)) {
        resource.individual = dt.reference(props.individual);
    }

    if (!_.isNil(props.assignedArm)) {
        resource.assignedArm = props.assignedArm;
    }

    if (!_.isNil(props.actualArm)) {
        resource.actualArm = props.actualArm;
    }

    if (!_.isNil(props.consent)) {
        resource.consent = dt.reference(props.consent);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ResearchSubject"]
    };

    return resource;
}
