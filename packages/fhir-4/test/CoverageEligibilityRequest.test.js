import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("CoverageEligibilityRequest", () => {
    it("should create a simple CoverageEligibilityRequest", () => {
        const resource = builders.coverageEligibilityRequest("CoverageEligibilityRequest", {});
        assert.isOk(resource);
    });
});