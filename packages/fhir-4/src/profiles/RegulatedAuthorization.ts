
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type RegulatedAuthorization_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    subject?: Reference;
    type?: CodeableConcept;
    description?: markdown;
    region?: CodeableConcept;
    status?: CodeableConcept;
    statusDate?: string;
    validityPeriod?: Period;
    indication?: CodeableReference;
    intendedUse?: CodeableConcept;
    basis?: CodeableConcept;
    holder?: Reference;
    regulator?: Reference;
    case?: BackboneElement;
};

export default function(props: Partial<RegulatedAuthorization_Props>) {
    const resource = {
        resourceType: "RegulatedAuthorization",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>RegulatedAuthorization</b></p></div>"
        },

        ...props
    };

    if (!_.isNil(props.identifier)) {
        if (!Array.isArray(props.identifier)) { props.identifier = [props.identifier]; }
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.holder)) {
        resource.holder = dt.reference(props.holder);
    }

    if (!_.isNil(props.regulator)) {
        resource.regulator = dt.reference(props.regulator);
    }

    if (!_.isNil(props.case)) {
        let src = props.case;

        let _case = {
            ...item
        };

        resource.case = _case;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/RegulatedAuthorization"]
    };

    return resource;
}
