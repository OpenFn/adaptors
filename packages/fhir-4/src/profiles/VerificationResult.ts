
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type VerificationResult_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    target?: Reference;
    targetLocation?: string;
    need?: CodeableConcept;
    status?: string;
    statusDate?: string;
    validationType?: CodeableConcept;
    validationProcess?: CodeableConcept;
    frequency?: Timing;
    lastPerformed?: string;
    nextScheduled?: string;
    failureAction?: CodeableConcept;
    primarySource?: BackboneElement;
    attestation?: BackboneElement;
    validator?: BackboneElement;
};

export default function(props: Partial<VerificationResult_Props>) {
    const resource = {
        resourceType: "VerificationResult",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>VerificationResult</b></p></div>"
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

    if (!_.isNil(props.target)) {
        if (!Array.isArray(props.target)) { props.target = [props.target]; }
        resource.target = dt.reference(props.target);
    }

    if (!_.isNil(props.targetLocation)) {
        resource.targetLocation = props.targetLocation;
    }

    if (!_.isNil(props.need)) {
        resource.need = props.need;
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusDate)) {
        resource.statusDate = props.statusDate;
    }

    if (!_.isNil(props.validationType)) {
        resource.validationType = props.validationType;
    }

    if (!_.isNil(props.validationProcess)) {
        resource.validationProcess = props.validationProcess;
    }

    if (!_.isNil(props.frequency)) {
        resource.frequency = props.frequency;
    }

    if (!_.isNil(props.lastPerformed)) {
        resource.lastPerformed = props.lastPerformed;
    }

    if (!_.isNil(props.nextScheduled)) {
        resource.nextScheduled = props.nextScheduled;
    }

    if (!_.isNil(props.failureAction)) {
        resource.failureAction = props.failureAction;
    }

    if (!_.isNil(props.primarySource)) {
        let src = props.primarySource;
        if (!Array.isArray(src)) { src = [src]; }
        resource.primarySource = [];

        for (let item of src) {
            let _primarySource = {};

            if (!_.isNil(item.id)) {
                _primarySource.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _primarySource.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.who)) {
                _primarySource.who = item.who;
            }

            if (!_.isNil(item.type)) {
                _primarySource.type = item.type;
            }

            if (!_.isNil(item.communicationMethod)) {
                _primarySource.communicationMethod = item.communicationMethod;
            }

            if (!_.isNil(item.validationStatus)) {
                _primarySource.validationStatus = item.validationStatus;
            }

            if (!_.isNil(item.validationDate)) {
                _primarySource.validationDate = item.validationDate;
            }

            if (!_.isNil(item.canPushUpdates)) {
                _primarySource.canPushUpdates = item.canPushUpdates;
            }

            if (!_.isNil(item.pushTypeAvailable)) {
                _primarySource.pushTypeAvailable = item.pushTypeAvailable;
            }

            resource.primarySource.push(_primarySource);
        }
    }

    if (!_.isNil(props.attestation)) {
        let src = props.attestation;
        let _attestation = {};

        if (!_.isNil(src.id)) {
            _attestation.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _attestation.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.who)) {
            _attestation.who = src.who;
        }

        if (!_.isNil(src.onBehalfOf)) {
            _attestation.onBehalfOf = src.onBehalfOf;
        }

        if (!_.isNil(src.communicationMethod)) {
            _attestation.communicationMethod = src.communicationMethod;
        }

        if (!_.isNil(src.date)) {
            _attestation.date = src.date;
        }

        if (!_.isNil(src.sourceIdentityCertificate)) {
            _attestation.sourceIdentityCertificate = src.sourceIdentityCertificate;
        }

        if (!_.isNil(src.proxyIdentityCertificate)) {
            _attestation.proxyIdentityCertificate = src.proxyIdentityCertificate;
        }

        if (!_.isNil(src.proxySignature)) {
            _attestation.proxySignature = src.proxySignature;
        }

        if (!_.isNil(src.sourceSignature)) {
            _attestation.sourceSignature = src.sourceSignature;
        }

        resource.attestation = _attestation;
    }

    if (!_.isNil(props.validator)) {
        let src = props.validator;
        if (!Array.isArray(src)) { src = [src]; }
        resource.validator = [];

        for (let item of src) {
            let _validator = {};

            if (!_.isNil(item.id)) {
                _validator.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _validator.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.organization)) {
                _validator.organization = item.organization;
            }

            if (!_.isNil(item.identityCertificate)) {
                _validator.identityCertificate = item.identityCertificate;
            }

            if (!_.isNil(item.attestationSignature)) {
                _validator.attestationSignature = item.attestationSignature;
            }

            resource.validator.push(_validator);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/VerificationResult"]
    };

    return resource;
}
