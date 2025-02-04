
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";
import * as FHIR from "../fhir";

export type Measure_Props = {
    id?: string;
    meta?: FHIR.Meta;
    implicitRules?: string;
    language?: string;
    text?: FHIR.Narrative;
    contained?: any;
    extension?: FHIR.Extension;
    modifierExtension?: FHIR.Extension;
    url?: string;
    identifier?: FHIR.Identifier;
    version?: string;
    name?: string;
    title?: string;
    subtitle?: string;
    status?: string;
    experimental?: boolean;
    subject?: FHIR.CodeableConcept;
    date?: string;
    publisher?: string;
    contact?: FHIR.ContactDetail;
    description?: FHIR.markdown;
    useContext?: FHIR.UsageContext;
    jurisdiction?: FHIR.CodeableConcept;
    purpose?: FHIR.markdown;
    usage?: string;
    copyright?: FHIR.markdown;
    approvalDate?: string;
    lastReviewDate?: string;
    effectivePeriod?: FHIR.Period;
    topic?: FHIR.CodeableConcept;
    author?: FHIR.ContactDetail;
    editor?: FHIR.ContactDetail;
    reviewer?: FHIR.ContactDetail;
    endorser?: FHIR.ContactDetail;
    relatedArtifact?: FHIR.RelatedArtifact;
    library?: any;
    disclaimer?: FHIR.markdown;
    scoring?: FHIR.CodeableConcept;
    compositeScoring?: FHIR.CodeableConcept;
    type?: FHIR.CodeableConcept;
    riskAdjustment?: string;
    rateAggregation?: string;
    rationale?: FHIR.markdown;
    clinicalRecommendationStatement?: FHIR.markdown;
    improvementNotation?: FHIR.CodeableConcept;
    definition?: FHIR.markdown;
    guidance?: FHIR.markdown;
    group?: FHIR.BackboneElement;
    supplementalData?: FHIR.BackboneElement;
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
