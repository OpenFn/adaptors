import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ExplanationOfBenefit", () => {
    it("should create a simple ExplanationOfBenefit", () => {
        const resource = builders.explanationOfBenefit({});
        assert.isOk(resource);
    });
});