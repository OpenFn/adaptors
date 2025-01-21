import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("RiskAssessment", () => {
    it("should create a simple RiskAssessment", () => {
        const resource = builders.riskAssessment({});
        assert.isOk(resource);
    });
});