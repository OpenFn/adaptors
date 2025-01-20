import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ResearchDefinition", () => {
    it("should create a simple ResearchDefinition", () => {
        const resource = builders.researchDefinition({});
        assert.isOk(resource);
    });
});