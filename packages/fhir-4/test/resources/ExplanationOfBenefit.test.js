import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ExplanationOfBenefit", () => {
    it("should create a simple ExplanationOfBenefit", () => {
        const resource = builders.explanationOfBenefit({});
        assert.isOk(resource);
    });
});