import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("HealthcareService", () => {
    it("should create a simple HealthcareService", () => {
        const resource = builders.healthcareService({});
        assert.isOk(resource);
    });
});