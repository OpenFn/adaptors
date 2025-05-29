import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ResearchElementDefinition", () => {
    it("should create a simple ResearchElementDefinition", () => {
        const resource = builders.researchElementDefinition({});
        assert.isOk(resource);
    });
});