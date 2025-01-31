
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type ResearchStudy_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    title?: string;
    protocol?: Reference;
    partOf?: Reference;
    status?: string;
    primaryPurposeType?: CodeableConcept;
    phase?: CodeableConcept;
    category?: CodeableConcept;
    focus?: CodeableConcept;
    condition?: CodeableConcept;
    contact?: ContactDetail;
    relatedArtifact?: RelatedArtifact;
    keyword?: CodeableConcept;
    location?: CodeableConcept;
    description?: markdown;
    enrollment?: Reference;
    period?: Period;
    sponsor?: Reference;
    principalInvestigator?: Reference;
    site?: Reference;
    reasonStopped?: CodeableConcept;
    note?: Annotation;
    arm?: BackboneElement;
    objective?: BackboneElement;
};

export default function(props: Partial<ResearchStudy_Props>) {
    const resource = {
        resourceType: "ResearchStudy",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>ResearchStudy</b></p></div>"
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

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.protocol)) {
        if (!Array.isArray(props.protocol)) { props.protocol = [props.protocol]; }
        resource.protocol = dt.reference(props.protocol);
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.primaryPurposeType)) {
        resource.primaryPurposeType = props.primaryPurposeType;
    }

    if (!_.isNil(props.phase)) {
        resource.phase = props.phase;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.focus)) {
        resource.focus = props.focus;
    }

    if (!_.isNil(props.condition)) {
        resource.condition = props.condition;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.keyword)) {
        resource.keyword = props.keyword;
    }

    if (!_.isNil(props.location)) {
        resource.location = props.location;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.enrollment)) {
        if (!Array.isArray(props.enrollment)) { props.enrollment = [props.enrollment]; }
        resource.enrollment = dt.reference(props.enrollment);
    }

    if (!_.isNil(props.period)) {
        resource.period = props.period;
    }

    if (!_.isNil(props.sponsor)) {
        resource.sponsor = dt.reference(props.sponsor);
    }

    if (!_.isNil(props.principalInvestigator)) {
        resource.principalInvestigator = dt.reference(props.principalInvestigator);
    }

    if (!_.isNil(props.site)) {
        if (!Array.isArray(props.site)) { props.site = [props.site]; }
        resource.site = dt.reference(props.site);
    }

    if (!_.isNil(props.reasonStopped)) {
        resource.reasonStopped = props.reasonStopped;
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.arm)) {
        let src = props.arm;
        if (!Array.isArray(src)) { src = [src]; }
        resource.arm = [];

        for (let item of src) {
            let _arm = {};

            if (!_.isNil(item.id)) {
                _arm.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _arm.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _arm.name = item.name;
            }

            if (!_.isNil(item.type)) {
                _arm.type = item.type;
            }

            if (!_.isNil(item.description)) {
                _arm.description = item.description;
            }

            resource.arm.push(_arm);
        }
    }

    if (!_.isNil(props.objective)) {
        let src = props.objective;
        if (!Array.isArray(src)) { src = [src]; }
        resource.objective = [];

        for (let item of src) {
            let _objective = {};

            if (!_.isNil(item.id)) {
                _objective.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _objective.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.name)) {
                _objective.name = item.name;
            }

            if (!_.isNil(item.type)) {
                _objective.type = item.type;
            }

            resource.objective.push(_objective);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/ResearchStudy"]
    };

    return resource;
}
