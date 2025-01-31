import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ResearchDefinition", () => {
    it("should create a simple ResearchDefinition", () => {
        const resource = builders.researchDefinition({});
        assert.isOk(resource);
    });
});