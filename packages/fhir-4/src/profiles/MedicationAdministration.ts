
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes";
import _ from "lodash";

export type MedicationAdministration_Props = {
    id?: string;
    meta?: Meta;
    implicitRules?: string;
    language?: string;
    text?: Narrative;
    contained?: Resource;
    extension?: Extension;
    modifierExtension?: Extension;
    identifier?: Identifier;
    instantiates?: string;
    partOf?: Reference;
    status?: string;
    statusReason?: CodeableConcept;
    category?: CodeableConcept;
    medication?: CodeableConcept;
    subject?: Reference;
    context?: Reference;
    supportingInformation?: Reference;
    effective?: string;
    performer?: BackboneElement;
    reasonCode?: CodeableConcept;
    reasonReference?: Reference;
    request?: Reference;
    device?: Reference;
    note?: Annotation;
    dosage?: BackboneElement;
    eventHistory?: Reference;
};

export default function(props: Partial<MedicationAdministration_Props>) {
    const resource = {
        resourceType: "MedicationAdministration",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MedicationAdministration</b></p></div>"
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

    if (!_.isNil(props.instantiates)) {
        resource.instantiates = props.instantiates;
    }

    if (!_.isNil(props.partOf)) {
        if (!Array.isArray(props.partOf)) { props.partOf = [props.partOf]; }
        resource.partOf = dt.reference(props.partOf);
    }

    if (!_.isNil(props.status)) {
        resource.status = props.status;
    }

    if (!_.isNil(props.statusReason)) {
        resource.statusReason = props.statusReason;
    }

    if (!_.isNil(props.category)) {
        resource.category = props.category;
    }

    if (!_.isNil(props.medication)) {
        dt.composite(resource, "medication", props.medication);
    }

    if (!_.isNil(props.subject)) {
        resource.subject = dt.reference(props.subject);
    }

    if (!_.isNil(props.context)) {
        resource.context = dt.reference(props.context);
    }

    if (!_.isNil(props.supportingInformation)) {
        if (!Array.isArray(props.supportingInformation)) { props.supportingInformation = [props.supportingInformation]; }
        resource.supportingInformation = dt.reference(props.supportingInformation);
    }

    if (!_.isNil(props.effective)) {
        dt.composite(resource, "effective", props.effective);
    }

    if (!_.isNil(props.performer)) {
        let src = props.performer;
        if (!Array.isArray(src)) { src = [src]; }
        resource.performer = [];

        for (let item of src) {
            let _performer = {};

            if (!_.isNil(item.id)) {
                _performer.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _performer.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.function)) {
                _performer.function = item.function;
            }

            if (!_.isNil(item.actor)) {
                _performer.actor = item.actor;
            }

            resource.performer.push(_performer);
        }
    }

    if (!_.isNil(props.reasonCode)) {
        resource.reasonCode = props.reasonCode;
    }

    if (!_.isNil(props.reasonReference)) {
        if (!Array.isArray(props.reasonReference)) { props.reasonReference = [props.reasonReference]; }
        resource.reasonReference = dt.reference(props.reasonReference);
    }

    if (!_.isNil(props.request)) {
        resource.request = dt.reference(props.request);
    }

    if (!_.isNil(props.device)) {
        if (!Array.isArray(props.device)) { props.device = [props.device]; }
        resource.device = dt.reference(props.device);
    }

    if (!_.isNil(props.note)) {
        resource.note = props.note;
    }

    if (!_.isNil(props.dosage)) {
        let src = props.dosage;
        let _dosage = {};

        if (!_.isNil(src.id)) {
            _dosage.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _dosage.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.text)) {
            _dosage.text = src.text;
        }

        if (!_.isNil(src.site)) {
            _dosage.site = src.site;
        }

        if (!_.isNil(src.route)) {
            _dosage.route = src.route;
        }

        if (!_.isNil(src.method)) {
            _dosage.method = src.method;
        }

        if (!_.isNil(src.dose)) {
            _dosage.dose = src.dose;
        }

        if (!_.isNil(src.rate)) {
            _dosage.rate = src.rate;
        }

        resource.dosage = _dosage;
    }

    if (!_.isNil(props.eventHistory)) {
        if (!Array.isArray(props.eventHistory)) { props.eventHistory = [props.eventHistory]; }
        resource.eventHistory = dt.reference(props.eventHistory);
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MedicationAdministration"]
    };

    return resource;
}
