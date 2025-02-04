import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("RiskAssessment", () => {
    it("should create a simple RiskAssessment", () => {
        const resource = builders.riskAssessment({});
        assert.isOk(resource);
    });
});