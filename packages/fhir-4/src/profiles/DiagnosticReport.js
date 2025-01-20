
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "DiagnosticReport",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>DiagnosticReport</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.basedOn)) {
        if (!Array.isArray(props.basedOn)) { props.basedOn = [props.basedOn]; }
        resource.basedOn = util.reference(props.basedOn);
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
        resource.subject = util.reference(props.subject);
    }

    if (!_.isNil(props.encounter)) {
        resource.encounter = util.reference(props.encounter);
    }

    if (!_.isNil(props.effective)) {
        util.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.performer)) {
        if (!Array.isArray(props.performer)) { props.performer = [props.performer]; }
        resource.performer = util.reference(props.performer);
    }

    if (!_.isNil(props.resultsInterpreter)) {
        if (!Array.isArray(props.resultsInterpreter)) { props.resultsInterpreter = [props.resultsInterpreter]; }
        resource.resultsInterpreter = util.reference(props.resultsInterpreter);
    }

    if (!_.isNil(props.specimen)) {
        if (!Array.isArray(props.specimen)) { props.specimen = [props.specimen]; }
        resource.specimen = util.reference(props.specimen);
    }

    if (!_.isNil(props.result)) {
        if (!Array.isArray(props.result)) { props.result = [props.result]; }
        resource.result = util.reference(props.result);
    }

    if (!_.isNil(props.imagingStudy)) {
        if (!Array.isArray(props.imagingStudy)) { props.imagingStudy = [props.imagingStudy]; }
        resource.imagingStudy = util.reference(props.imagingStudy);
    }

    if (!_.isNil(props.media)) {
        let src = props.media;
        if (!Array.isArray(src)) { src = [src]; }
        resource.media = [];

        for (let item of src) {
            let _media = {};

            if (!_.isNil(item.id)) {
                _media.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _media.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.comment)) {
                _media.comment = item.comment;
            }

            if (!_.isNil(item.link)) {
                _media.link = item.link;
            }

            resource.media.push(_media);
        }
    }

    if (!_.isNil(props.conclusion)) {
        resource.conclusion = props.conclusion;
    }

    if (!_.isNil(props.conclusionCode)) {
        resource.conclusionCode = props.conclusionCode;
    }

    if (!_.isNil(props.presentedForm)) {
        resource.presentedForm = props.presentedForm;
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/DiagnosticReport"]
    };

    return resource;
}
