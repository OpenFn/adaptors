import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ResearchStudy", () => {
    it("should create a simple ResearchStudy", () => {
        const resource = builders.researchStudy({});
        assert.isOk(resource);
    });
});