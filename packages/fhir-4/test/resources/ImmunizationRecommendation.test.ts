import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ImmunizationRecommendation", () => {
    it("should create a simple ImmunizationRecommendation", () => {
        const resource = builders.immunizationRecommendation({});
        assert.isOk(resource);
    });
});