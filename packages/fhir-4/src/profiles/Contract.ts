
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export type Contract_Props = {
    id?: any;
    meta?: any;
    implicitRules?: any;
    language?: any;
    text?: any;
    contained?: any;
    extension?: any;
    modifierExtension?: any;
    identifier?: dt.Identifier;
    url?: any;
    version?: any;
    status?: any;
    legalState?: any;
    instantiatesCanonical?: any;
    instantiatesUri?: any;
    contentDerivative?: any;
    issued?: any;
    applies?: any;
    expirationType?: any;
    subject?: any;
    authority?: any;
    domain?: any;
    site?: any;
    name?: any;
    title?: any;
    subtitle?: any;
    alias?: any;
    author?: any;
    scope?: any;
    topic?: any;
    type?: any;
    subType?: any;
    contentDefinition?: any;
    term?: any;
    supportingInfo?: any;
    relevantHistory?: any;
    signer?: any;
    friendly?: any;
    legal?: any;
    rule?: any;
    legallyBinding?: any;
};

export default function(props: Partial<Contract_Props>) {
    const resource = {
        resourceType: "Contract",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Contract</b></p></div>"
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
        resource.identifier = dt.identifier(props.identifier);
    }

    if (!_.isNil(props.url)) {
        resource.url = props.url;
    }

    if (!_.isNil(props.version)) {
        resource.version = props.version;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.legalState)) {
        resource.legalState = props.legalState;
    }

    if (!_.isNil(props.instantiatesCanonical)) {
        resource.instantiatesCanonical = dt.reference(props.instantiatesCanonical);
    }

    if (!_.isNil(props.instantiatesUri)) {
        resource.instantiatesUri = props.instantiatesUri;
    }

    if (!_.isNil(props.contentDerivative)) {
        resource.contentDerivative = props.contentDerivative;
    }

    if (!_.isNil(props.issued)) {
        resource.issued = props.issued;
    }

    if (!_.isNil(props.applies)) {
        resource.applies = props.applies;
    }

    if (!_.isNil(props.expirationType)) {
        resource.expirationType = props.expirationType;
    }

    if (!_.isNil(props.subject)) {
        if (!Array.isArray(props.subject)) { props.subject = [props.subject]; }
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.authority)) {
        if (!Array.isArray(props.authority)) { props.authority = [props.authority]; }
        resource.authority = dt.reference(props.authority);
    }

    if (!_.isNil(props.domain)) {
        if (!Array.isArray(props.domain)) { props.domain = [props.domain]; }
        resource.domain = dt.reference(props.domain);
    }

    if (!_.isNil(props.site)) {
        if (!Array.isArray(props.site)) { props.site = [props.site]; }
        resource.site = dt.reference(props.site);
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

    if (!_.isNil(props.alias)) {
        resource.alias = props.alias;
    }

    if (!_.isNil(props.author)) {
        resource.author = dt.reference(props.author);
    }

    if (!_.isNil(props.scope)) {
        resource.scope = props.scope;
    }

    if (!_.isNil(props.topic)) {
        dt.composite(resource, "topic", props.topic);
    }

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.subType)) {
        resource.subType = props.subType;
    }

    if (!_.isNil(props.contentDefinition)) {
        let src = props.contentDefinition;
        let _contentDefinition = {};

        if (!_.isNil(src.id)) {
            _contentDefinition.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _contentDefinition.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.type)) {
            _contentDefinition.type = src.type;
        }

        if (!_.isNil(src.subType)) {
            _contentDefinition.subType = src.subType;
        }

        if (!_.isNil(src.publisher)) {
            _contentDefinition.publisher = src.publisher;
        }

        if (!_.isNil(src.publicationDate)) {
            _contentDefinition.publicationDate = src.publicationDate;
        }

        if (!_.isNil(src.publicationStatus)) {
            _contentDefinition.publicationStatus = src.publicationStatus;
        }

        if (!_.isNil(src.copyright)) {
            _contentDefinition.copyright = src.copyright;
        }

        resource.contentDefinition = _contentDefinition;
    }

    if (!_.isNil(props.term)) {
        let src = props.term;
        if (!Array.isArray(src)) { src = [src]; }
        resource.term = [];

        for (let item of src) {
            let _term = {};

            if (!_.isNil(item.id)) {
                _term.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _term.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.identifier)) {
                _term.identifier = item.identifier;
            }

            if (!_.isNil(item.issued)) {
                _term.issued = item.issued;
            }

            if (!_.isNil(item.applies)) {
                _term.applies = item.applies;
            }

            if (!_.isNil(item.topic)) {
                _term.topic = item.topic;
            }

            if (!_.isNil(item.type)) {
                _term.type = item.type;
            }

            if (!_.isNil(item.subType)) {
                _term.subType = item.subType;
            }

            if (!_.isNil(item.text)) {
                _term.text = item.text;
            }

            if (!_.isNil(item.securityLabel)) {
                _term.securityLabel = item.securityLabel;
            }

            if (!_.isNil(item.offer)) {
                _term.offer = item.offer;
            }

            if (!_.isNil(item.asset)) {
                _term.asset = item.asset;
            }

            if (!_.isNil(item.action)) {
                _term.action = item.action;
            }

            resource.term.push(_term);
        }
    }

    if (!_.isNil(props.supportingInfo)) {
        if (!Array.isArray(props.supportingInfo)) { props.supportingInfo = [props.supportingInfo]; }
        resource.supportingInfo = dt.reference(props.supportingInfo);
    }

    if (!_.isNil(props.relevantHistory)) {
        if (!Array.isArray(props.relevantHistory)) { props.relevantHistory = [props.relevantHistory]; }
        resource.relevantHistory = dt.reference(props.relevantHistory);
    }

    if (!_.isNil(props.signer)) {
        let src = props.signer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.signer = [];

        for (let item of src) {
            let _signer = {};

            if (!_.isNil(item.id)) {
                _signer.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _signer.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _signer.type = item.type;
            }

            if (!_.isNil(item.party)) {
                _signer.party = item.party;
            }

            if (!_.isNil(item.signature)) {
                _signer.signature = item.signature;
            }

            resource.signer.push(_signer);
        }
    }

    if (!_.isNil(props.friendly)) {
        let src = props.friendly;
        if (!Array.isArray(src)) { src = [src]; }
        resource.friendly = [];

        for (let item of src) {
            let _friendly = {};

            if (!_.isNil(item.id)) {
                _friendly.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _friendly.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.content)) {
                _friendly.content = item.content;
            }

            resource.friendly.push(_friendly);
        }
    }

    if (!_.isNil(props.legal)) {
        let src = props.legal;
        if (!Array.isArray(src)) { src = [src]; }
        resource.legal = [];

        for (let item of src) {
            let _legal = {};

            if (!_.isNil(item.id)) {
                _legal.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _legal.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.content)) {
                _legal.content = item.content;
            }

            resource.legal.push(_legal);
        }
    }

    if (!_.isNil(props.rule)) {
        let src = props.rule;
        if (!Array.isArray(src)) { src = [src]; }
        resource.rule = [];

        for (let item of src) {
            let _rule = {};

            if (!_.isNil(item.id)) {
                _rule.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _rule.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.content)) {
                _rule.content = item.content;
            }

            resource.rule.push(_rule);
        }
    }

    if (!_.isNil(props.legallyBinding)) {
        dt.composite(resource, "legallyBinding", props.legallyBinding);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/Contract"]
    };

    return resource;
}
