import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ResearchStudy", () => {
    it("should create a simple ResearchStudy", () => {
        const resource = builders.researchStudy({});
        assert.isOk(resource);
    });
});