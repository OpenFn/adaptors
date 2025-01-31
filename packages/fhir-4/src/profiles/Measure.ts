
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Measure_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    url?: string;
    identifier?: Identifier;
    version?: string;
    name?: string;
    title?: string;
    subtitle?: string;
    status?: string;
    experimental?: boolean;
    subject?: CodeableConcept;
    date?: string;
    publisher?: string;
    contact?: ContactDetail;
    description?: markdown;
    useContext?: UsageContext;
    jurisdiction?: CodeableConcept;
    purpose?: markdown;
    usage?: string;
    copyright?: markdown;
    approvalDate?: string;
    lastReviewDate?: string;
    effectivePeriod?: Period;
    topic?: CodeableConcept;
    author?: ContactDetail;
    editor?: ContactDetail;
    reviewer?: ContactDetail;
    endorser?: ContactDetail;
    relatedArtifact?: RelatedArtifact;
    library?: any;
    disclaimer?: markdown;
    scoring?: CodeableConcept;
    compositeScoring?: CodeableConcept;
    type?: CodeableConcept;
    riskAdjustment?: string;
    rateAggregation?: string;
    rationale?: markdown;
    clinicalRecommendationStatement?: markdown;
    improvementNotation?: CodeableConcept;
    definition?: markdown;
    guidance?: markdown;
    group?: BackboneElement;
    supplementalData?: BackboneElement;
};

export default function(props: Partial<Measure_Props>) {
    const resource = {
        resourceType: "Measure",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Measure</b></p></div>"
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

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.name)) {
        resource.name = props.name;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.subtitle)) {
        resource.subtitle = props.subtitle;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
    }

    if (!_.isNil(props.subject)) {
        dt.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.date)) {
        resource.date = props.date;
    }

    if (!_.isNil(props.publisher)) {
        resource.publisher = props.publisher;
    }

    if (!_.isNil(props.contact)) {
        resource.contact = props.contact;
    }

    if (!_.isNil(props.description)) {
        resource.description = props.description;
    }

    if (!_.isNil(props.useContext)) {
        resource.useContext = props.useContext;
    }

    if (!_.isNil(props.jurisdiction)) {
        resource.jurisdiction = props.jurisdiction;
    }

    if (!_.isNil(props.purpose)) {
        resource.purpose = props.purpose;
    }

    if (!_.isNil(props.usage)) {
        resource.usage = props.usage;
    }

    if (!_.isNil(props.copyright)) {
        resource.copyright = props.copyright;
    }

    if (!_.isNil(props.approvalDate)) {
        resource.approvalDate = props.approvalDate;
    }

    if (!_.isNil(props.lastReviewDate)) {
        resource.lastReviewDate = props.lastReviewDate;
    }

    if (!_.isNil(props.effectivePeriod)) {
        resource.effectivePeriod = props.effectivePeriod;
    }

    if (!_.isNil(props.topic)) {
        resource.topic = props.topic;
    }

    if (!_.isNil(props.author)) {
        resource.author = props.author;
    }

    if (!_.isNil(props.editor)) {
        resource.editor = props.editor;
    }

    if (!_.isNil(props.reviewer)) {
        resource.reviewer = props.reviewer;
    }

    if (!_.isNil(props.endorser)) {
        resource.endorser = props.endorser;
    }

    if (!_.isNil(props.relatedArtifact)) {
        resource.relatedArtifact = props.relatedArtifact;
    }

    if (!_.isNil(props.library)) {
        resource.library = props.library;
    }

    if (!_.isNil(props.disclaimer)) {
        resource.disclaimer = props.disclaimer;
    }

    if (!_.isNil(props.scoring)) {
        resource.scoring = props.scoring;
    }

    if (!_.isNil(props.compositeScoring)) {
        resource.compositeScoring = props.compositeScoring;
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.riskAdjustment)) {
        resource.riskAdjustment = props.riskAdjustment;
    }

    if (!_.isNil(props.rateAggregation)) {
        resource.rateAggregation = props.rateAggregation;
    }

    if (!_.isNil(props.rationale)) {
        resource.rationale = props.rationale;
    }

    if (!_.isNil(props.clinicalRecommendationStatement)) {
        resource.clinicalRecommendationStatement = props.clinicalRecommendationStatement;
    }

    if (!_.isNil(props.improvementNotation)) {
        resource.improvementNotation = props.improvementNotation;
    }

    if (!_.isNil(props.definition)) {
        resource.definition = props.definition;
    }

    if (!_.isNil(props.guidance)) {
        resource.guidance = props.guidance;
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

            if (!_.isNil(item.description)) {
                _group.description = item.description;
            }

            if (!_.isNil(item.population)) {
                _group.population = item.population;
            }

            if (!_.isNil(item.stratifier)) {
                _group.stratifier = item.stratifier;
            }

            resource.group.push(_group);
        }
    }

    if (!_.isNil(props.supplementalData)) {
        let src = props.supplementalData;
        if (!Array.isArray(src)) { src = [src]; }
        resource.supplementalData = [];

        for (let item of src) {
            let _supplementalData = {};

            if (!_.isNil(item.id)) {
                _supplementalData.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _supplementalData.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.code)) {
                _supplementalData.code = item.code;
            }

            if (!_.isNil(item.usage)) {
                _supplementalData.usage = item.usage;
            }

            if (!_.isNil(item.description)) {
                _supplementalData.description = item.description;
            }

            if (!_.isNil(item.criteria)) {
                _supplementalData.criteria = item.criteria;
            }

            resource.supplementalData.push(_supplementalData);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Measure"]
    };

    return resource;
}
