
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type Resource_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
};

export default function(props: Partial<Resource_Props>) {
    const resource = {
        resourceType: "Resource",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Resource</b></p></div>"
        },

        ...props
    };

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Resource"]
    };

    return resource;
}
