
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
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.subject)) {
        dt.composite(resource, "subject", props.subject);
    }

    if (!_.isNil(props.group)) {
        let src = props.group;
        if (!Array.isArray(src)) { src = [src]; }
        resource.group = [];

        for (let item of src) {
            let _group = {
                ...item
            };

            resource.group.push(_group);
        }
    }

    if (!_.isNil(props.supplementalData)) {
        let src = props.supplementalData;
        if (!Array.isArray(src)) { src = [src]; }
        resource.supplementalData = [];

        for (let item of src) {
            let _supplementalData = {
                ...item
            };

            resource.supplementalData.push(_supplementalData);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Measure"]
    };

    return resource;
}
