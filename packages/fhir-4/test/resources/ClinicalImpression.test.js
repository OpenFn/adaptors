import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ClinicalImpression", () => {
    it("should create a simple ClinicalImpression", () => {
        const resource = builders.clinicalImpression({});
        assert.isOk(resource);
    });
});