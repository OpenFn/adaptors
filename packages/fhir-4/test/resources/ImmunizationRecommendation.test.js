import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ImmunizationRecommendation", () => {
    it("should create a simple ImmunizationRecommendation", () => {
        const resource = builders.immunizationRecommendation({});
        assert.isOk(resource);
    });
});