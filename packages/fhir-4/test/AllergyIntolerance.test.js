import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("AllergyIntolerance", () => {
    it("should create a simple AllergyIntolerance", () => {
        const resource = builders.allergyIntolerance({});
        assert.isOk(resource);
    });
});