
// THIS FILE WAS AUTO-GENERATED
// DO NOT MAKE CHANGES MANUALLY OR THEY WILL BE LOST
// SEE THE README FILE FOR DETAILS

import * as dt from "../datatypes.js";
import _ from "lodash";

export default function(props) {
    const resource = {
        resourceType: "MolecularSequence",

        text: {
            status: "generated",
            div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>MolecularSequence</b></p></div>"
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

    if (!_.isNil(props.type)) {
        resource.type = props.type;
    }

    if (!_.isNil(props.coordinateSystem)) {
        resource.coordinateSystem = props.coordinateSystem;
    }

    if (!_.isNil(props.patient)) {
        resource.patient = dt.reference(props.patient);
    }

    if (!_.isNil(props.specimen)) {
        resource.specimen = dt.reference(props.specimen);
    }

    if (!_.isNil(props.device)) {
        resource.device = dt.reference(props.device);
    }

    if (!_.isNil(props.performer)) {
        resource.performer = dt.reference(props.performer);
    }

    if (!_.isNil(props.quantity)) {
        resource.quantity = props.quantity;
    }

    if (!_.isNil(props.referenceSeq)) {
        let src = props.referenceSeq;
        let _referenceSeq = {};

        if (!_.isNil(src.id)) {
            _referenceSeq.id = src.id;
        }

        if (!_.isNil(src.modifierExtension)) {
            _referenceSeq.modifierExtension = src.modifierExtension;
        }

        if (!_.isNil(src.chromosome)) {
            _referenceSeq.chromosome = src.chromosome;
        }

        if (!_.isNil(src.genomeBuild)) {
            _referenceSeq.genomeBuild = src.genomeBuild;
        }

        if (!_.isNil(src.orientation)) {
            _referenceSeq.orientation = src.orientation;
        }

        if (!_.isNil(src.referenceSeqId)) {
            _referenceSeq.referenceSeqId = src.referenceSeqId;
        }

        if (!_.isNil(src.referenceSeqPointer)) {
            _referenceSeq.referenceSeqPointer = src.referenceSeqPointer;
        }

        if (!_.isNil(src.referenceSeqString)) {
            _referenceSeq.referenceSeqString = src.referenceSeqString;
        }

        if (!_.isNil(src.strand)) {
            _referenceSeq.strand = src.strand;
        }

        if (!_.isNil(src.windowStart)) {
            _referenceSeq.windowStart = src.windowStart;
        }

        if (!_.isNil(src.windowEnd)) {
            _referenceSeq.windowEnd = src.windowEnd;
        }

        resource.referenceSeq = _referenceSeq;
    }

    if (!_.isNil(props.variant)) {
        let src = props.variant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.variant = [];

        for (let item of src) {
            let _variant = {};

            if (!_.isNil(item.id)) {
                _variant.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _variant.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.start)) {
                _variant.start = item.start;
            }

            if (!_.isNil(item.end)) {
                _variant.end = item.end;
            }

            if (!_.isNil(item.observedAllele)) {
                _variant.observedAllele = item.observedAllele;
            }

            if (!_.isNil(item.referenceAllele)) {
                _variant.referenceAllele = item.referenceAllele;
            }

            if (!_.isNil(item.cigar)) {
                _variant.cigar = item.cigar;
            }

            if (!_.isNil(item.variantPointer)) {
                _variant.variantPointer = item.variantPointer;
            }

            resource.variant.push(_variant);
        }
    }

    if (!_.isNil(props.observedSeq)) {
        resource.observedSeq = props.observedSeq;
    }

    if (!_.isNil(props.quality)) {
        let src = props.quality;
        if (!Array.isArray(src)) { src = [src]; }
        resource.quality = [];

        for (let item of src) {
            let _quality = {};

            if (!_.isNil(item.id)) {
                _quality.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _quality.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _quality.type = item.type;
            }

            if (!_.isNil(item.standardSequence)) {
                _quality.standardSequence = item.standardSequence;
            }

            if (!_.isNil(item.start)) {
                _quality.start = item.start;
            }

            if (!_.isNil(item.end)) {
                _quality.end = item.end;
            }

            if (!_.isNil(item.score)) {
                _quality.score = item.score;
            }

            if (!_.isNil(item.method)) {
                _quality.method = item.method;
            }

            if (!_.isNil(item.truthTP)) {
                _quality.truthTP = item.truthTP;
            }

            if (!_.isNil(item.queryTP)) {
                _quality.queryTP = item.queryTP;
            }

            if (!_.isNil(item.truthFN)) {
                _quality.truthFN = item.truthFN;
            }

            if (!_.isNil(item.queryFP)) {
                _quality.queryFP = item.queryFP;
            }

            if (!_.isNil(item.gtFP)) {
                _quality.gtFP = item.gtFP;
            }

            if (!_.isNil(item.precision)) {
                _quality.precision = item.precision;
            }

            if (!_.isNil(item.recall)) {
                _quality.recall = item.recall;
            }

            if (!_.isNil(item.fScore)) {
                _quality.fScore = item.fScore;
            }

            if (!_.isNil(item.roc)) {
                _quality.roc = item.roc;
            }

            resource.quality.push(_quality);
        }
    }

    if (!_.isNil(props.readCoverage)) {
        resource.readCoverage = props.readCoverage;
    }

    if (!_.isNil(props.repository)) {
        let src = props.repository;
        if (!Array.isArray(src)) { src = [src]; }
        resource.repository = [];

        for (let item of src) {
            let _repository = {};

            if (!_.isNil(item.id)) {
                _repository.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _repository.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.type)) {
                _repository.type = item.type;
            }

            if (!_.isNil(item.url)) {
                _repository.url = item.url;
            }

            if (!_.isNil(item.name)) {
                _repository.name = item.name;
            }

            if (!_.isNil(item.datasetId)) {
                _repository.datasetId = item.datasetId;
            }

            if (!_.isNil(item.variantsetId)) {
                _repository.variantsetId = item.variantsetId;
            }

            if (!_.isNil(item.readsetId)) {
                _repository.readsetId = item.readsetId;
            }

            resource.repository.push(_repository);
        }
    }

    if (!_.isNil(props.pointer)) {
        if (!Array.isArray(props.pointer)) { props.pointer = [props.pointer]; }
        resource.pointer = dt.reference(props.pointer);
    }

    if (!_.isNil(props.structureVariant)) {
        let src = props.structureVariant;
        if (!Array.isArray(src)) { src = [src]; }
        resource.structureVariant = [];

        for (let item of src) {
            let _structureVariant = {};

            if (!_.isNil(item.id)) {
                _structureVariant.id = item.id;
            }

            if (!_.isNil(item.modifierExtension)) {
                _structureVariant.modifierExtension = item.modifierExtension;
            }

            if (!_.isNil(item.variantType)) {
                _structureVariant.variantType = item.variantType;
            }

            if (!_.isNil(item.exact)) {
                _structureVariant.exact = item.exact;
            }

            if (!_.isNil(item.length)) {
                _structureVariant.length = item.length;
            }

            if (!_.isNil(item.outer)) {
                _structureVariant.outer = item.outer;
            }

            if (!_.isNil(item.inner)) {
                _structureVariant.inner = item.inner;
            }

            resource.structureVariant.push(_structureVariant);
        }
    }

    resource.meta = {
        profile: ["http://hl7.org/fhir/StructureDefinition/MolecularSequence"]
    };

    return resource;
}
