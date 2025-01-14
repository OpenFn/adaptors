import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("CoverageEligibilityResponse", () => {
    it("should create a simple CoverageEligibilityResponse", () => {
        const resource = builders.coverageEligibilityResponse("CoverageEligibilityResponse", {});
        assert.isOk(resource);
    });
});