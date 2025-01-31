
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Observation_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    basedOn?: Reference;
    partOf?: Reference;
    status?: string;
    category?: CodeableConcept;
    code?: CodeableConcept;
    subject?: Reference;
    focus?: Reference;
    encounter?: Reference;
    effective?: string;
    issued?: string;
    performer?: Reference;
    value?: Quantity;
    dataAbsentReason?: CodeableConcept;
    interpretation?: CodeableConcept;
    note?: Annotation;
    bodySite?: CodeableConcept;
    method?: CodeableConcept;
    specimen?: Reference;
    device?: Reference;
    referenceRange?: BackboneElement;
    hasMember?: Reference;
    derivedFrom?: Reference;
    component?: BackboneElement;
};

export default function(props: Partial<Observation_Props>) {
    const resource = {
        resourceType: "Observation",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Observation</b></p></div>"
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

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = dt.reference(props.basedOn);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.code)) {
        resource.code = props.code;
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.focus)) {
        if (!Array.isArray(props.focus)) { props.focus = [props.focus]; }
        resource.focus = dt.reference(props.focus);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = dt.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        dt.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.value)) {
        dt.composite(resource, "value", props.value);
    }

    if (!_.isNil(props.dataAbsentReason)) {
        resource.dataAbsentReason = props.dataAbsentReason;
    }

    if (!_.isNil(props.interpretation)) {
        resource.interpretation = props.interpretation;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.bodySite)) {
        resource.bodySite = props.bodySite;
    }

    if (!_.isNil(props.method)) {
        resource.method = props.method;
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = dt.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = dt.reference(props.device);
    }

    if (!_.isNil(props.referenceRange)) {
        let src = props.referenceRange;
        if (!Array.isArray(src)) { src = [src]; }
        resource.referenceRange = [];

        for (let item of src) {
            let _referenceRange = {};

            if (!_.isNil(item.id)) {
                _referenceRange.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _referenceRange.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.low)) {
                _referenceRange.low = item.low;
            }

            if (!_.isNil(item.high)) {
                _referenceRange.high = item.high;
            }

            if (!_.isNil(item.type)) {
                _referenceRange.type = item.type;
            }

            if (!_.isNil(item.appliesTo)) {
                _referenceRange.appliesTo = item.appliesTo;
            }

            if (!_.isNil(item.age)) {
                _referenceRange.age = item.age;
            }

            if (!_.isNil(item.text)) {
                _referenceRange.text = item.text;
            }

            resource.referenceRange.push(_referenceRange);
        }
    }

    if (!_.isNil(props.hasMember)) {
        if (!Array.isArray(props.hasMember)) { props.hasMember = [props.hasMember]; }
        resource.hasMember = dt.reference(props.hasMember);
    }

    if (!_.isNil(props.derivedFrom)) {
        if (!Array.isArray(props.derivedFrom)) { props.derivedFrom = [props.derivedFrom]; }
        resource.derivedFrom = dt.reference(props.derivedFrom);
    }

    if (!_.isNil(props.component)) {
        let src = props.component;
        if (!Array.isArray(src)) { src = [src]; }
        resource.component = [];

        for (let item of src) {
            let _component = {};

            if (!_.isNil(item.id)) {
                _component.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _component.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _component.code = item.code;
            }

            if (!_.isNil(item.value)) {
                _component.value = item.value;
            }

            if (!_.isNil(item.dataAbsentReason)) {
                _component.dataAbsentReason = item.dataAbsentReason;
            }

            if (!_.isNil(item.interpretation)) {
                _component.interpretation = item.interpretation;
            }

            resource.component.push(_component);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Observation"]
    };

    return resource;
}
