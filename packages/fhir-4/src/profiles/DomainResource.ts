
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type DomainResource_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
};

export default function(props: Partial<DomainResource_Props>) {
    const resource = {
        resourceType: "DomainResource",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DomainResource</b></p></div>"
        },

        ...props
    };

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DomainResource"]
    };

    return resource;
}
