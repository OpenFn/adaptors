import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("HealthcareService", () => {
    it("should create a simple HealthcareService", () => {
        const resource = builders.healthcareService("HealthcareService", {});
        assert.isOk(resource);
    });
});