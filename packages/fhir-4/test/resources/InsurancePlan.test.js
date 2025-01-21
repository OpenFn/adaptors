import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("InsurancePlan", () => {
    it("should create a simple InsurancePlan", () => {
        const resource = builders.insurancePlan({});
        assert.isOk(resource);
    });
});