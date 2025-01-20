import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("HealthcareService", () => {
    it("should create a simple HealthcareService", () => {
        const resource = builders.healthcareService({});
        assert.isOk(resource);
    });
});