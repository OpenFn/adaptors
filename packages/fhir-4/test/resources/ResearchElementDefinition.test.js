import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ResearchElementDefinition", () => {
    it("should create a simple ResearchElementDefinition", () => {
        const resource = builders.researchElementDefinition({});
        assert.isOk(resource);
    });
});