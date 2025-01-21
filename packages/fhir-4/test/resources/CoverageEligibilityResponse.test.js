import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("CoverageEligibilityResponse", () => {
    it("should create a simple CoverageEligibilityResponse", () => {
        const resource = builders.coverageEligibilityResponse({});
        assert.isOk(resource);
    });
});