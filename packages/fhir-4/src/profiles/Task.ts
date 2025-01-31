
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Task_Props = {
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
    groupIdentifier?: Identifier;
    partOf?: Reference;
    status?: string;
    statusReason?: CodeableConcept;
    businessStatus?: CodeableConcept;
    intent?: string;
    priority?: string;
    code?: CodeableConcept;
    description?: string;
    focus?: Reference;
    for?: Reference;
    encounter?: Reference;
    executionPeriod?: Period;
    authoredOn?: string;
    lastModified?: string;
    requester?: Reference;
    performerType?: CodeableConcept;
    owner?: Reference;
    location?: Reference;
    reasonCode?: CodeableConcept;
    reasonReference?: Reference;
    insurance?: Reference;
    note?: Annotation;
    relevantHistory?: Reference;
    restriction?: BackboneElement;
    input?: BackboneElement;
    output?: BackboneElement;
};

export default function(props: Partial<Task_Props>) {
    const resource = {
        resourceType: "Task",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Task</b></p></div>"
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

    if (!_.isNil(props.groupIdentifier)) {
        resource.groupIdentifier = dt.identifier(props.groupIdentifier);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.businessStatus)) {
        resource.businessStatus = props.businessStatus;
    }

    if (!_.isNil(props.intent)) {
        resource.intent = props.intent;
    }

    if (!_.isNil(props.priority)) {
        resource.priority = props.priority;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = dt.reference(props.focus);
    }

    if (!_.isNil(props.for)) {
        resource.for = dt.reference(props.for);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.executionPeriod)) {
        resource.executionPeriod = props.executionPeriod;
    }

    if (!_.isNil(props.authoredOn)) {
        resource.authoredOn = props.authoredOn;
    }

    if (!_.isNil(props.lastModified)) {
        resource.lastModified = props.lastModified;
    }

    if (!_.isNil(props.requester)) {
        resource.requester = dt.reference(props.requester);
    }

    if (!_.isNil(props.performerType)) {
        resource.performerType = props.performerType;
    }

    if (!_.isNil(props.owner)) {
        resource.owner = dt.reference(props.owner);
    }

    if (!_.isNil(props.location)) {
        resource.location = dt.reference(props.location);
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.insurance)) {
        if (!Array.isArray(props.insurance)) { props.insurance = [props.insurance]; }
        resource.insurance = dt.reference(props.insurance);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = dt.reference(props.relevantHistory);
    }

    if (!_.isNil(props.restriction)) {
        let src = props.restriction;
        let _restriction = {};

        if (!_.isNil(src.id)) {
            _restriction.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _restriction.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.repetitions)) {
            _restriction.repetitions = src.repetitions;
        }

        if (!_.isNil(src.period)) {
            _restriction.period = src.period;
        }

        if (!_.isNil(src.recipient)) {
            _restriction.recipient = src.recipient;
        }

        resource.restriction = _restriction;
    }

    if (!_.isNil(props.input)) {
        let src = props.input;
        if (!Array.isArray(src)) { src = [src]; }
        resource.input = [];

        for (let item of src) {
            let _input = {};

            if (!_.isNil(item.id)) {
                _input.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _input.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _input.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _input.value = item.value;
            }

            resource.input.push(_input);
        }
    }

    if (!_.isNil(props.output)) {
        let src = props.output;
        if (!Array.isArray(src)) { src = [src]; }
        resource.output = [];

        for (let item of src) {
            let _output = {};

            if (!_.isNil(item.id)) {
                _output.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _output.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _output.type = item.type;
            }

            if (!_.isNil(item.value)) {
                _output.value = item.value;
            }

            resource.output.push(_output);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Task"]
    };

    return resource;
}
