import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("InsurancePlan", () => {
    it("should create a simple InsurancePlan", () => {
        const resource = builders.insurancePlan({});
        assert.isOk(resource);
    });
});