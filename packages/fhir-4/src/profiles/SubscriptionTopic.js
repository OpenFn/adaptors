
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as util from "../utils.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "SubscriptionTopic",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>SubscriptionTopic</b></p></div>"
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
        resource.identifier = util.identifier(props.identifier, undefined);
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.title)) {
        resource.title = props.title;
    }

    if (!_.isNil(props.derivedFrom)) {
        resource.derivedFrom = props.derivedFrom;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.experimental)) {
        resource.experimental = props.experimental;
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

    if (!_.isNil(props.resourceTrigger)) {
        let src = props.resourceTrigger;
        if (!Array.isArray(src)) { src = [src]; }
        resource.resourceTrigger = [];

        for (let item of src) {
            let _resourceTrigger = {};

            if (!_.isNil(item.id)) {
                _resourceTrigger.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _resourceTrigger.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _resourceTrigger.description = item.description;
            }

            if (!_.isNil(item.resource)) {
                _resourceTrigger.resource = item.resource;
            }

            if (!_.isNil(item.supportedInteraction)) {
                _resourceTrigger.supportedInteraction = item.supportedInteraction;
            }

            if (!_.isNil(item.queryCriteria)) {
                _resourceTrigger.queryCriteria = item.queryCriteria;
            }

            if (!_.isNil(item.fhirPathCriteria)) {
                _resourceTrigger.fhirPathCriteria = item.fhirPathCriteria;
            }

            resource.resourceTrigger.push(_resourceTrigger);
        }
    }

    if (!_.isNil(props.eventTrigger)) {
        let src = props.eventTrigger;
        if (!Array.isArray(src)) { src = [src]; }
        resource.eventTrigger = [];

        for (let item of src) {
            let _eventTrigger = {};

            if (!_.isNil(item.id)) {
                _eventTrigger.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _eventTrigger.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _eventTrigger.description = item.description;
            }

            if (!_.isNil(item.event)) {
                _eventTrigger.event = item.event;
            }

            if (!_.isNil(item.resource)) {
                _eventTrigger.resource = item.resource;
            }

            resource.eventTrigger.push(_eventTrigger);
        }
    }

    if (!_.isNil(props.canFilterBy)) {
        let src = props.canFilterBy;
        if (!Array.isArray(src)) { src = [src]; }
        resource.canFilterBy = [];

        for (let item of src) {
            let _canFilterBy = {};

            if (!_.isNil(item.id)) {
                _canFilterBy.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _canFilterBy.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.description)) {
                _canFilterBy.description = item.description;
            }

            if (!_.isNil(item.resource)) {
                _canFilterBy.resource = item.resource;
            }

            if (!_.isNil(item.filterParameter)) {
                _canFilterBy.filterParameter = item.filterParameter;
            }

            if (!_.isNil(item.filterDefinition)) {
                _canFilterBy.filterDefinition = item.filterDefinition;
            }

            if (!_.isNil(item.modifier)) {
                _canFilterBy.modifier = item.modifier;
            }

            resource.canFilterBy.push(_canFilterBy);
        }
    }

    if (!_.isNil(props.notificationShape)) {
        let src = props.notificationShape;
        if (!Array.isArray(src)) { src = [src]; }
        resource.notificationShape = [];

        for (let item of src) {
            let _notificationShape = {};

            if (!_.isNil(item.id)) {
                _notificationShape.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _notificationShape.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.resource)) {
                _notificationShape.resource = item.resource;
            }

            if (!_.isNil(item.include)) {
                _notificationShape.include = item.include;
            }

            if (!_.isNil(item.revInclude)) {
                _notificationShape.revInclude = item.revInclude;
            }

            resource.notificationShape.push(_notificationShape);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/SubscriptionTopic"]
    };

    return resource;
}
