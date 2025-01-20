
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "Binary",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Binary</b></p></div>"
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

    if (!_.isNil(props.contentType)) {
        resource.contentType = props.contentType;
    }

    if (!_.isNil(props.securityContext)) {
        resource.securityContext = util.reference(props.securityContext);
    }

    if (!_.isNil(props.data)) {
        resource.data = props.data;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Binary"]
    };

    return resource;
}
