import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ImmunizationRecommendation", () => {
    it("should create a simple ImmunizationRecommendation", () => {
        const resource = builders.immunizationRecommendation("ImmunizationRecommendation", {});
        assert.isOk(resource);
    });
});