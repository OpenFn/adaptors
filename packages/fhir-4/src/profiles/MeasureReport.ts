
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type MeasureReport_Props = {
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
    type?: string;
    measure?: any;
    subject?: Reference;
    date?: string;
    reporter?: Reference;
    period?: Period;
    improvementNotation?: CodeableConcept;
    group?: BackboneElement;
    evaluatedResource?: Reference;
};

export default function(props: Partial<MeasureReport_Props>) {
    const resource = {
        resourceType: "MeasureReport",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MeasureReport</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.measure)) {
        resource.measure = props.measure;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.reporter)) {
        resource.reporter = dt.reference(props.reporter);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.improvementNotation)) {
        resource.improvementNotation = props.improvementNotation;
    }

    if (!_.isNil(props.group)) {
        let src = props.group;
        if (!Array.isArray(src)) { src = [src]; }
        resource.group = [];

        for (let item of src) {
            let _group = {};

            if (!_.isNil(item.id)) {
                _group.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _group.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _group.code = item.code;
            }

            if (!_.isNil(item.population)) {
                _group.population = item.population;
            }

            if (!_.isNil(item.measureScore)) {
                _group.measureScore = item.measureScore;
            }

            if (!_.isNil(item.stratifier)) {
                _group.stratifier = item.stratifier;
            }

            resource.group.push(_group);
        }
    }

    if (!_.isNil(props.evaluatedResource)) {
        if (!Array.isArray(props.evaluatedResource)) { props.evaluatedResource = [props.evaluatedResource]; }
        resource.evaluatedResource = dt.reference(props.evaluatedResource);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MeasureReport"]
    };

    return resource;
}
