import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ClinicalUseDefinition", () => {
    it("should create a simple ClinicalUseDefinition", () => {
        const resource = builders.clinicalUseDefinition({});
        assert.isOk(resource);
    });
});