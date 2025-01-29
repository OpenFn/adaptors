import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("CoverageEligibilityRequest", () => {
    it("should create a simple CoverageEligibilityRequest", () => {
        const resource = builders.coverageEligibilityRequest({});
        assert.isOk(resource);
    });
});