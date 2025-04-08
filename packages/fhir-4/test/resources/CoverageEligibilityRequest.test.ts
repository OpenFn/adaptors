import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("CoverageEligibilityRequest", () => {
    it("should create a simple CoverageEligibilityRequest", () => {
        const resource = builders.coverageEligibilityRequest({});
        assert.isOk(resource);
    });
});