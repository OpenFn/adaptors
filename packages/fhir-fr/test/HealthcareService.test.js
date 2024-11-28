import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-healthcare-service", () => {
    it("should create a simple fr-core-healthcare-service", () => {
        const resource = builders.healthcareService("fr-core-healthcare-service", {});
        assert.isOk(resource);
    });
});