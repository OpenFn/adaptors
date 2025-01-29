
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type Resource_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
};

export default function(props: Partial<Resource_Props>) {
    const resource = {
        resourceType: "Resource",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Resource</b></p></div>"
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

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Resource"]
    };

    return resource;
}
