import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("RiskAssessment", () => {
    it("should create a simple RiskAssessment", () => {
        const resource = builders.riskAssessment("RiskAssessment", {});
        assert.isOk(resource);
    });
});