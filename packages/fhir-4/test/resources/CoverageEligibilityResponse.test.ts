import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("CoverageEligibilityResponse", () => {
    it("should create a simple CoverageEligibilityResponse", () => {
        const resource = builders.coverageEligibilityResponse({});
        assert.isOk(resource);
    });
});